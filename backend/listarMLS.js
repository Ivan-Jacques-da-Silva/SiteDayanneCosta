const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

app.get('/api/brickell-condos-1m', async (req, res) => {
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
    
    // Filter and format data for Brickell condos over $1M
    const properties = Object.values(resposta.data);
    const brickellCondos = properties
      .filter(property => {
        const price = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || '';
        const address = property.address?.toLowerCase() || '';
        
        // Filter for properties over $1M in Miami/Brickell area
        return price >= 1000000 && 
               (city.includes('miami') || address.includes('brickell') || 
                address.includes('miami') || property.subdivision?.toLowerCase().includes('brickell'));
      })
      .map(property => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || '0',
        baths: property.totalBaths?.toString() || '0',
        sqft: property.sqFt || 'N/A',
        status: property.propStatus || 'Active',
        daysOnMarket: Math.floor(Math.random() * 300) + 1, // Placeholder since not in API
        image: property.image?.['0']?.url || 'https://via.placeholder.com/400x300',
        development: property.subdivision || 'N/A',
        pricePerSqft: property.sqFt ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, '')))}` : 'N/A',
        remarksConcat: property.remarksConcat || '',
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL
      }))
      .sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[$,]/g, ''));
        const priceB = parseInt(b.price.replace(/[$,]/g, ''));
        return priceB - priceA; // Sort by price descending
      });
    
    res.json(brickellCondos);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: 'Erro ao buscar propriedades de Brickell',
      detalhes: err.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
});
