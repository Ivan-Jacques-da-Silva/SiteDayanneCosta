const express = require('express');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();
const app = express();
const PORT = 5055;

app.get('/api/propriedades', async (req, res) => {
  try {
    const body = {
      limit: 50,
      offset: 0
    };
    const response = await axios.get(
      'https://api.idxbroker.com/clients/featured/listings?limit=50&offset=0',
      {
        headers: {
          'accesskey': process.env.IDX_ACCESS_KEY,
          'apiversion': '1.8',
          'outputtype': 'json'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Erro na API:', err?.response?.data || err.message);
    res.status(err.response?.status || 500).json({ erro: true, mensagem: err.message });
  }
});

// Rota usando API pública (BASE_URL2)
app.get('/api/imoveis', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.IDX_BASE_URL2}/clients/featured/listings`,
      {
        headers: {
          accesskey: process.env.IDX_ACCESS_KEY,
          apiversion: process.env.IDX_API_VERSION,
          outputtype: process.env.IDX_OUTPUT_TYPE,
        },
        params: {
          limit: 50,
          offset: 0,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Erro IDX:', {
      status: err?.response?.status,
      data: err?.response?.data,
    });
    res
      .status(err.response?.status || 500)
      .json({ erro: true, mensagem: 'Erro na API IDX Broker' });
  }
});

// Exemplo de rota que usa a outra base (caso precise no futuro)
app.get('/api/test-middleware', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.IDX_BASE_URL}/alguma-rota-middleware`, // ajusta aqui se precisar
      {
        headers: {
          accesskey: process.env.IDX_ACCESS_KEY,
          apiversion: process.env.IDX_API_VERSION,
          outputtype: process.env.IDX_OUTPUT_TYPE,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Erro Middleware:', err?.response?.data || err.message);
    res.status(500).json({ erro: true, mensagem: 'Erro middleware IDX' });
  }
});

app.listen(PORT, () => console.log(`✅ API rodando em http://localhost:${PORT}/api/propriedades`));
