const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.get('/api/listings', async (req, res) => {
  try {
    const resposta = await axios.get(
      'https://api.idxbroker.com/clients/featured',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accesskey: 'E2zacX5HZjIrbp1SeiZ0i@',
          outputtype: 'json',
          apiversion: '1.2'
        }
      }
    );
    res.json(resposta.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: 'Erro ao buscar IDX',
      detalhes: err.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
