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
  "apiversion": IDX_CONFIG.apiversion
});

app.get("/api/listar-tudo", async (req, res) => {
  try {
    const response = await axios.get(
      `${IDX_CONFIG.baseURL}/clients/featured`,
      { headers: getIDXHeaders() }
    );

    res.json({ sucesso: true, total: Object.keys(response.data).length, data: response.data });
  } catch (err) {
    res.status(err.response?.status || 500).json({
      sucesso: false,
      erro: "Falha ao buscar todos os dados da API",
      detalhes: err.response?.data || err.message
    });
  }
});

app.listen(PORT, "localhost", () => {
  console.log(`🟢 Servidor executando em http://localhost:${PORT}`);
});
