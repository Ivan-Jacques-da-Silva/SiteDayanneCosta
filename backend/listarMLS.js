
const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// IDX API Configuration
const IDX_CONFIG = {
  baseURL: process.env.IDX_BASE_URL || "https://api.idxbroker.com",
  accesskey: process.env.IDX_ACCESS_KEY,
  apiversion: process.env.IDX_API_VERSION || "1.8",
  outputtype: process.env.IDX_OUTPUT_TYPE || "json"
};

// Helper function to get IDX headers
const getIDXHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  "accesskey": IDX_CONFIG.accesskey,
  "outputtype": IDX_CONFIG.outputtype,
  "apiversion": IDX_CONFIG.apiversion
});

// Helper function to format property data
const formatProperty = (property) => ({
  id: property.listingID,
  price: property.listPrice || property.listingPrice || `$${property.price?.toLocaleString()}`,
  address: property.address,
  city: `${property.cityName}, ${property.state} ${property.zipcode}`,
  beds: property.bedrooms?.toString() || "0",
  baths: property.totalBaths?.toString() || property.bathsTotal?.toString() || "0",
  sqft: property.sqFt || property.sqftTotal || "N/A",
  status: property.propStatus || property.listingStatus || "Active",
  image: property.image?.["0"]?.url || property.photos?.[0]?.url || "https://via.placeholder.com/400x300",
  development: property.subdivision || property.subdivisionName || "N/A",
  pricePerSqft: property.sqFt && property.price
    ? `$${Math.floor(property.price / parseInt(property.sqFt.toString().replace(/,/g, "")))}`
    : "N/A",
  yearBuilt: property.yearBuilt || "N/A",
  latitude: property.latitude,
  longitude: property.longitude,
  fullDetailsURL: property.fullDetailsURL || property.detailsURL,
  propertyType: property.propSubType || property.propType || property.propertyType || "N/A",
  remarks: property.remarksConcat || property.remarks || "",
});

// Featured listings endpoint
app.get("/api/listings", async (req, res) => {
  try {
    const response = await axios.get(
      `${IDX_CONFIG.baseURL}/clients/featured`,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.status(404).json({ erro: "Nenhum dado encontrado" });
    }

    const formattedData = Object.values(response.data).map(formatProperty);
    res.json(formattedData);
  } catch (err) {
    console.error("Erro na API featured:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em destaque",
      detalhes: err.response?.data || err.message,
    });
  }
});

// New Developments endpoint - using search with filters
app.get("/api/new-developments-dinamico", async (req, res) => {
  try {
    const { min = 0, cidade = "", bairro = "", ano = 2015 } = req.query;

    // Use search endpoint for better filtering
    const searchParams = new URLSearchParams();
    if (min > 0) searchParams.append('pt_minlistprice', min);
    if (cidade) searchParams.append('city', cidade);
    if (ano) searchParams.append('pt_minyearbuilt', ano);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data)
      .filter((property) => {
        const address = property.address?.toLowerCase() || "";
        const subdivision = property.subdivision?.toLowerCase() || "";
        const yearBuilt = parseInt(property.yearBuilt) || 0;
        const newConstruction = property.newConstruction === "Yes" || property.newConstruction === true;

        return (
          (bairro ? address.includes(bairro.toLowerCase()) || subdivision.includes(bairro.toLowerCase()) : true) &&
          (yearBuilt >= parseInt(ano) || newConstruction)
        );
      })
      .map(formatProperty)
      .sort((a, b) => parseInt(b.yearBuilt) - parseInt(a.yearBuilt));

    res.json(properties);
  } catch (err) {
    console.error("Erro na API new developments:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar novos empreendimentos",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Single Family Homes endpoint
app.get("/api/single-family-homes", async (req, res) => {
  try {
    const { min = 0, cidade = "" } = req.query;

    const searchParams = new URLSearchParams();
    searchParams.append('pt_propertytype', 'SFR'); // Single Family Residence
    if (min > 0) searchParams.append('pt_minlistprice', min);
    if (cidade) searchParams.append('city', cidade);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data)
      .filter((property) => {
        const propSubType = property.propSubType?.toLowerCase() || "";
        const propType = property.propType?.toLowerCase() || "";
        
        return (
          propSubType.includes("single family") ||
          propType.includes("single family") ||
          propSubType.includes("sfr") ||
          propType.includes("residential")
        );
      })
      .map((property) => ({
        ...formatProperty(property),
        propertyType: "Single Family Home",
      }));

    res.json(properties);
  } catch (err) {
    console.error("Erro na API single family homes:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar casas unifamiliares",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Luxury Condos endpoint
app.get("/api/luxury-condos", async (req, res) => {
  try {
    const { min = 1000000 } = req.query;

    const searchParams = new URLSearchParams();
    searchParams.append('pt_propertytype', 'CC'); // Condominium
    searchParams.append('pt_minlistprice', min);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    // Luxury neighborhoods and areas in Miami
    const luxuryAreas = [
      "brickell", "bal harbour", "fisher island", "key biscayne", 
      "coconut grove", "coral gables", "south beach", "sunny isles",
      "aventura", "bay harbor", "venetian islands", "star island",
      "hibiscus island", "palm island", "downtown miami", "edgewater"
    ];

    const properties = Object.values(response.data)
      .filter((property) => {
        const price = property.listPrice || property.price || 0;
        const propSubType = property.propSubType?.toLowerCase() || "";
        const propType = property.propType?.toLowerCase() || "";
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";
        const subdivision = property.subdivision?.toLowerCase() || "";

        // Check if it's a condo
        const isCondo = propSubType.includes("condo") || 
                        propType.includes("condo") ||
                        propSubType.includes("condominium") ||
                        propType.includes("condominium");

        // Check if it's in a luxury area
        const isLuxuryLocation = luxuryAreas.some(area => 
          city.includes(area) || 
          address.includes(area) || 
          subdivision.includes(area)
        );

        return isCondo && (isLuxuryLocation || price >= 1500000);
      })
      .map((property) => ({
        ...formatProperty(property),
        propertyType: "Luxury Condo",
      }))
      .sort((a, b) => {
        const priceA = parseInt(a.price.toString().replace(/[$,]/g, "")) || 0;
        const priceB = parseInt(b.price.toString().replace(/[$,]/g, "")) || 0;
        return priceB - priceA;
      });

    res.json(properties);
  } catch (err) {
    console.error("Erro na API luxury condos:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar condomínios de luxo",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Brickell condos over $1M
app.get("/api/brickell-condos-1m", async (req, res) => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('pt_propertytype', 'CC');
    searchParams.append('pt_minlistprice', '1000000');
    searchParams.append('city', 'Miami');

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data)
      .filter((property) => {
        const address = property.address?.toLowerCase() || "";
        const subdivision = property.subdivision?.toLowerCase() || "";
        const city = property.cityName?.toLowerCase() || "";

        return (
          address.includes("brickell") || 
          subdivision.includes("brickell") ||
          city.includes("brickell")
        );
      })
      .map(formatProperty)
      .sort((a, b) => {
        const priceA = parseInt(a.price.toString().replace(/[$,]/g, "")) || 0;
        const priceB = parseInt(b.price.toString().replace(/[$,]/g, "")) || 0;
        return priceB - priceA;
      });

    res.json(properties);
  } catch (err) {
    console.error("Erro na API Brickell condos:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar condomínios em Brickell",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Neighborhood endpoints
app.get("/api/brickell", async (req, res) => {
  try {
    const { min = 0 } = req.query;

    const searchParams = new URLSearchParams();
    searchParams.append('city', 'Miami');
    if (min > 0) searchParams.append('pt_minlistprice', min);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data)
      .filter((property) => {
        const address = property.address?.toLowerCase() || "";
        const subdivision = property.subdivision?.toLowerCase() || "";

        return address.includes("brickell") || subdivision.includes("brickell");
      })
      .map(formatProperty);

    res.json(properties);
  } catch (err) {
    console.error("Erro na API Brickell:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em Brickell",
      detalhes: err.response?.data || err.message,
    });
  }
});

app.get("/api/edgewater", async (req, res) => {
  try {
    const { min = 0 } = req.query;

    const searchParams = new URLSearchParams();
    searchParams.append('city', 'Miami');
    if (min > 0) searchParams.append('pt_minlistprice', min);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data)
      .filter((property) => {
        const address = property.address?.toLowerCase() || "";
        const city = property.cityName?.toLowerCase() || "";

        return address.includes("edgewater") || city.includes("edgewater");
      })
      .map(formatProperty);

    res.json(properties);
  } catch (err) {
    console.error("Erro na API Edgewater:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em Edgewater",
      detalhes: err.response?.data || err.message,
    });
  }
});

app.get("/api/coconut-grove", async (req, res) => {
  try {
    const { min = 0 } = req.query;

    const searchParams = new URLSearchParams();
    searchParams.append('city', 'Coconut Grove');
    if (min > 0) searchParams.append('pt_minlistprice', min);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data).map(formatProperty);
    res.json(properties);
  } catch (err) {
    console.error("Erro na API Coconut Grove:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em Coconut Grove",
      detalhes: err.response?.data || err.message,
    });
  }
});

app.get("/api/the-roads", async (req, res) => {
  try {
    const { min = 0 } = req.query;

    const searchParams = new URLSearchParams();
    searchParams.append('city', 'Coral Gables');
    if (min > 0) searchParams.append('pt_minlistprice', min);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      searchParams,
      { headers: getIDXHeaders() }
    );

    if (!response.data) {
      return res.json([]);
    }

    const properties = Object.values(response.data)
      .filter((property) => {
        const address = property.address?.toLowerCase() || "";
        const subdivision = property.subdivision?.toLowerCase() || "";

        return address.includes("roads") || subdivision.includes("roads");
      })
      .map(formatProperty);

    res.json(properties);
  } catch (err) {
    console.error("Erro na API The Roads:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em The Roads",
      detalhes: err.response?.data || err.message,
    });
  }
});

// General listing endpoint
app.get("/api/listageral", async (req, res) => {
  try {
    const response = await axios.get(
      `${IDX_CONFIG.baseURL}/clients/featured`,
      { headers: getIDXHeaders() }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Erro na API lista geral:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar listagem geral",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Specific developments endpoint
app.get("/api/empreendimentos", async (req, res) => {
  try {
    const empreendimentos = [
      "cipriani", "mandarin", "viceroy", "the well", "ritz-carlton",
      "st. regis", "four seasons", "armani casa", "porsche design"
    ];

    let resultados = [];

    for (const nome of empreendimentos) {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('subdivision', nome);

        const response = await axios.post(
          `${IDX_CONFIG.baseURL}/clients/search`,
          searchParams,
          { headers: getIDXHeaders() }
        );

        if (response.data) {
          const dados = Object.values(response.data)
            .map((p) => ({
              id: p.listingID,
              empreendimento: nome,
              price: p.listPrice || p.listingPrice || `$${p.price?.toLocaleString()}`,
              address: p.address,
              development: p.subdivision || "N/A",
              city: `${p.cityName}, ${p.state} ${p.zipcode}`,
              image: p.image?.["0"]?.url || p.photos?.[0]?.url || "https://via.placeholder.com/400x300",
              fullDetailsURL: p.fullDetailsURL || p.detailsURL,
            }));

          resultados.push(...dados);
        }
      } catch (searchErr) {
        console.log(`Erro ao buscar empreendimento ${nome}:`, searchErr.message);
      }
    }

    res.json(resultados);
  } catch (err) {
    console.error("Erro na API empreendimentos:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar empreendimentos",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Bal Harbour developments
app.get("/api/empreendimentos-balharbour", async (req, res) => {
  try {
    const ItemSearch = [
      "Oceana Bal Harbour",
      "Ritz-Carlton Bal Harbour", 
      "Bal Harbour 101",
      "St Regis Bal Harbour",
      "Residences by Armani/Casa"
    ];

    const resultado = [];

    for (const item of ItemSearch) {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('subdivision', item);
        searchParams.append('city', 'Bal Harbour');

        const response = await axios.post(
          `${IDX_CONFIG.baseURL}/clients/search`,
          searchParams,
          { headers: getIDXHeaders() }
        );

        if (response.data) {
          const properties = Object.values(response.data);
          if (properties.length > 0) {
            const match = properties[0];
            resultado.push({
              id: match.listingID,
              title: item,
              price: match.listPrice || match.listingPrice || `$${match.price?.toLocaleString()}` || "N/A",
              address: match.address,
              development: match.subdivision || "N/A",
              city: `${match.cityName}, ${match.state} ${match.zipcode}`,
              image: match.image?.["0"]?.url || match.photos?.[0]?.url || "https://via.placeholder.com/400x300",
              fullDetailsURL: match.fullDetailsURL || match.detailsURL,
            });
          }
        }
      } catch (searchErr) {
        console.log(`Erro ao buscar ${item}:`, searchErr.message);
      }
    }

    res.json(resultado);
  } catch (err) {
    console.error("Erro na API Bal Harbour:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar empreendimentos de Bal Harbour",
      detalhes: err.response?.data || err.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({
    erro: "Erro interno do servidor",
    detalhes: err.message
  });
});


// Uso maquina local
app.listen(PORT, 'localhost', () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});