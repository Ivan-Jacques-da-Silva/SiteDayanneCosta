// Arquivo para listar tudo que vem da API IDX Broker (versão 1.8 ou superior)

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

const IDX_CONFIG = {
  baseURL: process.env.IDX_BASE_URL || "https://api.idxbroker.com",
  accesskey: process.env.IDX_ACCESS_KEY,
  apiversion: process.env.IDX_API_VERSION || "1.8",
  outputtype: process.env.IDX_OUTPUT_TYPE || "json",
};

const getIDXHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  accesskey: IDX_CONFIG.accesskey,
  outputtype: IDX_CONFIG.outputtype,
  apiversion: IDX_CONFIG.apiversion,
});

const formatProperty = (property) => {
  if (!property) return null;

  return {
    id: property.listingID,
    price:
      property.listPrice ||
      property.listingPrice ||
      `$${property.price?.toLocaleString()}`,
    address: property.address,
    city: `${property.cityName}, ${property.state} ${property.zipcode}`,
    beds: property.bedrooms?.toString() || "0",
    baths:
      property.totalBaths?.toString() || property.bathsTotal?.toString() || "0",
    sqft: property.sqFt || property.sqftTotal || "N/A",
    status: property.propStatus || property.listingStatus || "Active",
    image:
      property.image?.["0"]?.url ||
      property.photos?.[0]?.url ||
      "https://via.placeholder.com/400x300",
    development: property.subdivision || property.subdivisionName || "N/A",
    pricePerSqft:
      property.sqFt && property.price
        ? `$${Math.floor(property.price / parseInt(property.sqFt.toString().replace(/,/g, "")))}`
        : "N/A",
    yearBuilt: property.yearBuilt || "N/A",
    latitude: property.latitude,
    longitude: property.longitude,
    fullDetailsURL: property.fullDetailsURL || property.detailsURL,
    propertyType:
      property.propSubType ||
      property.propType ||
      property.propertyType ||
      "N/A",
    remarks: property.remarksConcat || property.remarks || "",
  };
};

// Endpoint principal - listar tudo com o máximo de dados possível
app.get("/api/listar-tudo", async (req, res) => {
  try {
    console.log("🔍 Buscando dados completos da API IDX...");

    // Fazer múltiplas requisições para obter o máximo de dados
    const endpoints = [
      `${IDX_CONFIG.baseURL}/clients/featured`,
      `${IDX_CONFIG.baseURL}/clients/sold`,
      `${IDX_CONFIG.baseURL}/clients/active`,
      `${IDX_CONFIG.baseURL}/clients/listingsearch`,
    ];

    let allData = {};
    let totalProperties = 0;
    let successfulRequests = 0;
    let errors = [];

    // Tentar cada endpoint
    for (const endpoint of endpoints) {
      try {
        console.log(`📡 Fazendo requisição para: ${endpoint}`);
        const response = await axios.get(endpoint, {
          headers: getIDXHeaders(),
        });

        if (response.data && typeof response.data === 'object') {
          const endpointName = endpoint.split('/').pop();
          allData[endpointName] = response.data;

          const count = Object.keys(response.data).length;
          totalProperties += count;
          successfulRequests++;

          console.log(`✅ ${endpointName}: ${count} propriedades encontradas`);
        }
      } catch (endpointErr) {
        const endpointName = endpoint.split('/').pop();
        console.log(`❌ Erro no endpoint ${endpointName}:`, endpointErr.response?.status || endpointErr.message);
        errors.push({
          endpoint: endpointName,
          erro: endpointErr.response?.data || endpointErr.message,
          status: endpointErr.response?.status
        });
      }
    }

    // Se não conseguiu nenhum dado, tentar busca alternativa
    if (totalProperties === 0) {
      console.log("🔄 Tentando busca alternativa com search...");
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('pt_status', 'Active');

        const searchResponse = await axios.post(
          `${IDX_CONFIG.baseURL}/clients/search`,
          searchParams,
          { headers: getIDXHeaders() }
        );

        if (searchResponse.data) {
          allData['search'] = searchResponse.data;
          totalProperties = Object.keys(searchResponse.data).length;
          successfulRequests++;
          console.log(`✅ Search alternativa: ${totalProperties} propriedades encontradas`);
        }
      } catch (searchErr) {
        errors.push({
          endpoint: 'search',
          erro: searchErr.response?.data || searchErr.message,
          status: searchErr.response?.status
        });
      }
    }

    console.log(`📊 Total de propriedades coletadas: ${totalProperties}`);
    console.log(`📈 Requisições bem-sucedidas: ${successfulRequests}`);

    res.json({
      sucesso: true,
      totalPropriedades: totalProperties,
      requisicoesBemsucedidas: successfulRequests,
      endpoints: Object.keys(allData),
      data: allData,
      erros: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
      configuracao: {
        baseURL: IDX_CONFIG.baseURL,
        apiversion: IDX_CONFIG.apiversion,
        outputtype: IDX_CONFIG.outputtype
      }
    });

  } catch (err) {
    console.error("❌ Erro geral na API listar-tudo:", err);
    res.status(err.response?.status || 500).json({
      sucesso: false,
      erro: "Falha ao buscar todos os dados da API",
      detalhes: err.response?.data || err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Featured listings - formatado para o frontend
app.get("/api/listings", async (req, res) => {
  try {
    const response = await axios.get(`${IDX_CONFIG.baseURL}/clients/featured`, {
      headers: getIDXHeaders(),
    });

    if (!response.data) {
      return res.json([]);
    }

    const formattedData = Object.values(response.data)
      .map(formatProperty)
      .filter((property) => property !== null);

    res.json(formattedData);
  } catch (err) {
    console.error("Erro na API featured:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em destaque",
      detalhes: err.response?.data || err.message,
    });
  }
});

// New developments - condominios de 1 milhão para cima que são novos
app.get("/api/new-developments-dinamico", async (req, res) => {
  try {
    const { min = 1000000, cidade = "", bairro = "", ano = 2015 } = req.query;

    const response = await axios.get(`${IDX_CONFIG.baseURL}/clients/featured`, {
      headers: getIDXHeaders(),
    });

    if (!response.data) return res.json([]);

    const properties = Object.values(response.data)
      .filter((p) => {
        if (!p) return false;

        const addr = p.address?.toLowerCase() || "";
        const sub = p.subdivision?.toLowerCase() || "";
        const year = parseInt(p.yearBuilt) || 0;
        const price = parseInt(p.listPrice) || parseInt(p.price) || 0;
        const cityName = p.cityName?.toLowerCase() || "";
        const propSubType = p.propSubType?.toLowerCase() || "";
        const propType = p.propType?.toLowerCase() || "";

        // Verificar se é condomínio
        const isCondo = propSubType.includes("condo") ||
          propType.includes("condo") ||
          propSubType.includes("condominium") ||
          propType.includes("condominium");

        // Verificar se é novo (ano >= 2015 ou new construction)
        const isNew = year >= parseInt(ano) ||
          p.newConstruction === "Yes" ||
          p.newConstruction === true;

        // Filtros de preço, localização
        const meetsPrice = price >= parseInt(min);
        const meetsCity = cidade ? cityName.includes(cidade.toLowerCase()) : true;
        const meetsNeighborhood = bairro ?
          (addr.includes(bairro.toLowerCase()) || sub.includes(bairro.toLowerCase())) : true;

        return isCondo && isNew && meetsPrice && meetsCity && meetsNeighborhood;
      })
      .map(formatProperty)
      .filter((property) => property !== null)
      .sort((a, b) => parseInt(b.yearBuilt) - parseInt(a.yearBuilt));

    console.log(`New Developments encontrados: ${properties.length}`);
    res.json(properties);
  } catch (err) {
    console.error("Erro na API new developments:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar novos empreendimentos",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Single Family Homes - usando propertySubTypeAdditional e propSubType
app.get("/api/single-family-homes", async (req, res) => {
  try {
    const { min = 0, cidade = "" } = req.query;

    const response = await axios.get(`${IDX_CONFIG.baseURL}/clients/featured`, {
      headers: getIDXHeaders(),
    });

    if (!response.data) return res.json([]);

    const properties = Object.values(response.data)
      .filter((p) => {
        if (!p) return false;

        const propSubType = p.propSubType || "";
        const propType = p.propType?.toLowerCase() || "";
        const price = parseInt(p.listPrice) || parseInt(p.price) || 0;
        const cityName = p.cityName?.toLowerCase() || "";

        // Verificar se é Single Family Residence usando as variáveis específicas
        let isSingleFamily = false;

        // Verificar propertySubTypeAdditional (array)
        if (p.propertySubTypeAdditional && Array.isArray(p.propertySubTypeAdditional)) {
          isSingleFamily = p.propertySubTypeAdditional.some(subType =>
            subType === "Single Family Residence"
          );
        }

        // Verificar propSubType (string)
        if (!isSingleFamily && propSubType === "Single Family Residence") {
          isSingleFamily = true;
        }

        // Fallback para outros formatos conhecidos
        if (!isSingleFamily) {
          const propSubTypeLower = propSubType.toLowerCase();
          isSingleFamily =
            propSubTypeLower.includes("single family") ||
            propType.includes("single family") ||
            propSubTypeLower.includes("sfr") ||
            propType.includes("residential");
        }

        const meetsPrice = min > 0 ? price >= parseInt(min) : true;
        const meetsCity = cidade ? cityName.includes(cidade.toLowerCase()) : true;

        console.log("🏠 Propriedade analisada:", {
          id: p.listingID,
          propSubType: propSubType,
          propertySubTypeAdditional: p.propertySubTypeAdditional,
          isSingleFamily: isSingleFamily,
          price: price,
          city: cityName
        });

        return isSingleFamily && meetsPrice && meetsCity;
      })
      .map((p) => {
        const formatted = formatProperty(p);
        return formatted
          ? { ...formatted, propertyType: "Single Family Home" }
          : null;
      })
      .filter((property) => property !== null);

    console.log(`✅ Single Family Homes encontradas: ${properties.length}`);
    res.json(properties);
  } catch (err) {
    console.error("❌ Erro na API single family homes:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar casas unifamiliares",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Luxury Condos - bairros de luxo e caros
app.get("/api/luxury-condos", async (req, res) => {
  try {
    const { min = 1500000 } = req.query; // Aumentei o mínimo para ser mais luxuoso

    const response = await axios.get(`${IDX_CONFIG.baseURL}/clients/featured`, {
      headers: getIDXHeaders(),
    });

    if (!response.data) return res.json([]);

    const luxuryAreas = [
      "brickell",
      "bal harbour",
      "fisher island",
      "key biscayne",
      "coconut grove",
      "coral gables",
      "south beach",
      "sunny isles",
      "aventura",
      "bay harbor",
      "venetian islands",
      "star island",
      "hibiscus island",
      "palm island",
      "downtown miami",
      "edgewater",
      "pinecrest",
      "palmetto bay",
      "doral"
    ];

    const properties = Object.values(response.data)
      .filter((p) => {
        if (!p) return false;

        const price = parseInt(p.listPrice) || parseInt(p.price) || 0;
        const propSubType = p.propSubType?.toLowerCase() || "";
        const propType = p.propType?.toLowerCase() || "";
        const city = p.cityName?.toLowerCase() || "";
        const addr = p.address?.toLowerCase() || "";
        const sub = p.subdivision?.toLowerCase() || "";

        // Verificar se é condomínio
        const isCondo =
          propSubType.includes("condo") ||
          propType.includes("condo") ||
          propSubType.includes("condominium") ||
          propType.includes("condominium");

        // Verificar se está em área de luxo
        const isLuxuryLocation = luxuryAreas.some(
          (area) =>
            city.includes(area) || addr.includes(area) || sub.includes(area),
        );

        // Condição: deve ser condo E (estar em área de luxo OU ter preço alto)
        return isCondo && (isLuxuryLocation || price >= parseInt(min));
      })
      .map((p) => {
        const formatted = formatProperty(p);
        return formatted
          ? { ...formatted, propertyType: "Luxury Condo" }
          : null;
      })
      .filter((property) => property !== null)
      .sort((a, b) => {
        const priceA = parseInt(a.price.toString().replace(/[$,]/g, "")) || 0;
        const priceB = parseInt(b.price.toString().replace(/[$,]/g, "")) || 0;
        return priceB - priceA;
      });

    console.log(`Luxury Condos encontrados: ${properties.length}`);
    res.json(properties);
  } catch (err) {
    console.error("Erro na API luxury condos:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar condomínios de luxo",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Endpoint de busca avançada sem limitações
app.get("/api/busca-completa", async (req, res) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      accesskey: process.env.IDX_ACCESS_KEY,
      outputtype: process.env.IDX_OUTPUT_TYPE,
      apiversion: process.env.IDX_API_VERSION
    };
    // 1. obter campos de busca
    const sf = await axios.get(
      `${process.env.IDX_BASE_URL}/mls/getSearchfields`,
      { headers }
    );
    // 2. pegar valores de um campo básico (ex: city)
    const sfv = await axios.get(
      `${process.env.IDX_BASE_URL}/mls/getSearchfieldvalues?field=city`,
      { headers }
    );
    // 3. montar busca ativa (exemplo City = primeiro valor)
    const city = sfv.data.values?.[0]?.value;
    const body = {
      search: { pt: { status: "Active" }, ...(city && { city }) },
      pagination: { limit: 10, page: 1 }
    };
    const result = await axios.post(
      `${process.env.IDX_BASE_URL}/search/listings`,
      body,
      { headers }
    );

    res.json({ searchfields: sf.data, sampleCity: city, listings: result.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: true, message: "Failed to fetch MLS data" });
  }
});

app.get("/api/mls/property-types", async (req, res) => {
  try {
    const response = await axios.get(
      `${IDX_CONFIG.baseURL}/mls/getPropertytypes`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: IDX_CONFIG.accesskey,
          outputtype: IDX_CONFIG.outputtype
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    res.status(500).json({ error: true, message: "Failed to fetch property types" });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({
    erro: "Erro interno do servidor",
    detalhes: err.message,
  });
});

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
app.listen(PORT, "localhost", () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
