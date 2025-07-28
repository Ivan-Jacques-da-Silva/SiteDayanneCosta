// Arquivo para listar tudo que vem da API IDX Broker (versão 1.8 ou superior)

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const IDX_CONFIG = {
  baseURL: process.env.IDX_BASE_URL || "https://api.idxbroker.com",
  accesskey: process.env.IDX_ACCESS_KEY,
  apiversion: process.env.IDX_API_VERSION || "1.8",
  outputtype: process.env.IDX_OUTPUT_TYPE || "json"
};

const getIDXHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  "accesskey": IDX_CONFIG.accesskey,
  "outputtype": IDX_CONFIG.outputtype,
  "apiversion": IDX_CONFIG.apiversion,
  "Accept": "application/json"
});

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

// 1) Featured listings
app.get("/api/listings", async (req, res) => {
  try {
    const response = await axios.get(
      `${IDX_CONFIG.baseURL}/clients/featured`,
      { headers: getIDXHeaders() }
    );

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


// 2) New developments
app.get("/api/new-developments-dinamico", async (req, res) => {
  try {
    const { min = 0, cidade = "", bairro = "", ano = 2015 } = req.query;

    const params = new URLSearchParams();
    params.append("searchType", "listings");             // ← plural!
    params.append("listingStatus", "Active");
    if (min > 0) params.append("pt_minlistprice", min);
    if (cidade) params.append("city", cidade);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      params.toString(),                                 // ← .toString()
      { headers: getIDXHeaders() }
    );
    if (!response.data) return res.json([]);

    const properties = Object.values(response.data)
      .filter(p => {
        const addr = p.address?.toLowerCase() || "";
        const sub = p.subdivision?.toLowerCase() || "";
        const year = parseInt(p.yearBuilt) || 0;
        const isNew = p.newConstruction === "Yes" || p.newConstruction === true;
        return (
          (bairro ? addr.includes(bairro.toLowerCase()) || sub.includes(bairro.toLowerCase()) : true)
          && (year >= ano || isNew)
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


// 3) Single Family Homes
app.get("/api/single-family-homes", async (req, res) => {
  try {
    const { min = 0, cidade = "" } = req.query;

    const params = new URLSearchParams();
    params.append("searchType", "listings");             // ← plural
    params.append("listingStatus", "Active");
    params.append("propertySubTypeAdditional", "Single Family Residence");
    if (min > 0) params.append("pt_minlistprice", min);
    if (cidade) params.append("city", cidade);

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      params.toString(),                                // ← .toString()
      { headers: getIDXHeaders() }
    );
    if (!response.data) return res.json([]);

    const properties = Object.values(response.data)
      .map(p => ({ ...formatProperty(p), propertyType: "Single Family Home" }));

    res.json(properties);
  } catch (err) {
    console.error("Erro na API single family homes:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar casas unifamiliares",
      detalhes: err.response?.data || err.message,
    });
  }
});


// 4) Luxury Condos
app.get("/api/luxury-condos", async (req, res) => {
  try {
    const { min = 1000000 } = req.query;
    const luxuryAreas = [/* ...lista... */];

    const params = new URLSearchParams();
    params.append("searchType", "listings");             // ← plural
    params.append("listingStatus", "Active");
    params.append("propertySubType", "Condominium");
    params.append("pt_minlistprice", min);
    params.append("city", "Miami");

    const response = await axios.post(
      `${IDX_CONFIG.baseURL}/clients/search`,
      params.toString(),                                // ← .toString()
      { headers: getIDXHeaders() }
    );
    if (!response.data) return res.json([]);

    const properties = Object.values(response.data)
      .filter(p => {
        const price = p.listPrice || p.price || 0;
        const city = p.cityName?.toLowerCase() || "";
        const addr = p.address?.toLowerCase() || "";
        const sub = p.subdivision?.toLowerCase() || "";
        const isLuxuryLoc = luxuryAreas.some(area => city.includes(area) || addr.includes(area) || sub.includes(area));
        return isLuxuryLoc || price >= 1500000;
      })
      .map(p => ({ ...formatProperty(p), propertyType: "Luxury Condo" }))
      .sort((a, b) => parseInt(b.price.replace(/[$,]/g, "")) - parseInt(a.price.replace(/[$,]/g, "")));

    res.json(properties);
  } catch (err) {
    console.error("Erro na API luxury condos:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar condomínios de luxo",
      detalhes: err.response?.data || err.message,
    });
  }
});


app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({
    erro: "Erro interno do servidor",
    detalhes: err.message
  });
});

app.listen(PORT, "localhost", () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
