const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/api/listings", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );
    res.json(resposta.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar IDX",
      detalhes: err.response?.data || err.message,
    });
  }
});

app.get("/api/brickell-condos-1m", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    // Filter and format data for Brickell condos over $1M
    const properties = Object.values(resposta.data);
    const brickellCondos = properties
      .filter((property) => {
        const price = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";

        // Filter for properties over $1M in Miami/Brickell area
        return (
          price >= 1000000 &&
          (city.includes("miami") ||
            address.includes("brickell") ||
            address.includes("miami") ||
            property.subdivision?.toLowerCase().includes("brickell"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        daysOnMarket: Math.floor(Math.random() * 300) + 1, // Placeholder since not in API
        image:
          property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        remarksConcat: property.remarksConcat || "",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
      }))
      .sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[$,]/g, ""));
        const priceB = parseInt(b.price.replace(/[$,]/g, ""));
        return priceB - priceA; // Sort by price descending
      });

    res.json(brickellCondos);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades de Brickell",
      detalhes: err.response?.data || err.message,
    });
  }
});

app.get("/api/new-developments-dinamico", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 0);
    const cidade = (req.query.cidade || "").toLowerCase();
    const bairro = (req.query.bairro || "").toLowerCase();
    const ano = parseInt(req.query.ano || 0);

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";
        const subdiv = property.subdivision?.toLowerCase() || "";
        const anoConstrucao = parseInt(property.yearBuilt) || 0;

        return (
          preco >= min &&
          (cidade ? city.includes(cidade) : true) &&
          (bairro
            ? address.includes(bairro) || subdiv.includes(bairro)
            : true) &&
          (ano ? anoConstrucao >= ano : true)
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image:
          property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades",
      detalhes: err.response?.data || err.message,
    });
  }
});

// app.listen(PORT, "localhost", () => {
//   console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
// });

app.get("/api/single-family-homes", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 0);
    const cidade = (req.query.cidade || "").toLowerCase();
    const propertyType = (req.query.propertyType || "").toLowerCase();

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";
        const propType = property.propType?.toLowerCase() || "";

        return (
          preco >= min &&
          (cidade ? city.includes(cidade) : true) &&
          // Filter for single family homes (assuming propType contains relevant info)
          (propType.includes("single") || 
           propType.includes("house") || 
           propType.includes("residential") ||
           !propType.includes("condo") && !propType.includes("apartment"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image:
          property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
        propertyType: "Single Family Home"
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar single family homes",
      detalhes: err.response?.data || err.message,
    });
  }
});

// API route for Brickell properties
app.get("/api/brickell", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 0);

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";

        return (
          preco >= min &&
          (city.includes("miami") || city.includes("brickell") || 
           address.includes("brickell") || address.includes("miami"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image: property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
        propertyType: property.propType || "N/A"
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em Brickell",
      detalhes: err.response?.data || err.message,
    });
  }
});

// API route for Edgewater properties
app.get("/api/edgewater", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 0);

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";

        return (
          preco >= min &&
          (city.includes("edgewater") || address.includes("edgewater") ||
           city.includes("miami") && address.includes("edgewater"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image: property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
        propertyType: property.propType || "N/A"
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em Edgewater",
      detalhes: err.response?.data || err.message,
    });
  }
});

// API route for Coconut Grove properties
app.get("/api/coconut-grove", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 0);

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";

        return (
          preco >= min &&
          (city.includes("coconut grove") || address.includes("coconut grove") ||
           city.includes("grove") || address.includes("grove"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image: property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
        propertyType: property.propType || "N/A"
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em Coconut Grove",
      detalhes: err.response?.data || err.message,
    });
  }
});

// API route for The Roads properties
app.get("/api/the-roads", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 0);

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const city = property.cityName?.toLowerCase() || "";
        const address = property.address?.toLowerCase() || "";

        return (
          preco >= min &&
          (city.includes("the roads") || address.includes("the roads") ||
           city.includes("roads") || address.includes("roads") ||
           city.includes("coral gables") || address.includes("coral gables"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image: property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
        propertyType: property.propType || "N/A"
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar propriedades em The Roads",
      detalhes: err.response?.data || err.message,
    });
  }
});

// API route for Luxury Condos
app.get("/api/luxury-condos", async (req, res) => {
  try {
    const resposta = await axios.get(
      "https://api.idxbroker.com/clients/featured",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accesskey: "E2zacX5HZjIrbp1SeiZ0i@",
          outputtype: "json",
          apiversion: "1.2",
        },
      },
    );

    const min = parseInt(req.query.min || 1000000); // Default minimum for luxury condos

    const propriedades = Object.values(resposta.data)
      .filter((property) => {
        const preco = property.rntLsePrice || 0;
        const propType = property.propType?.toLowerCase() || "";

        return (
          preco >= min &&
          (propType.includes("condo") || propType.includes("condominium") ||
           propType.includes("apartment"))
        );
      })
      .map((property) => ({
        id: property.listingID,
        price: `$${property.rntLsePrice?.toLocaleString()}`,
        address: property.address,
        city: `${property.cityName}, FL ${property.zipcode}`,
        beds: property.bedrooms?.toString() || "0",
        baths: property.totalBaths?.toString() || "0",
        sqft: property.sqFt || "N/A",
        status: property.propStatus || "Active",
        image: property.image?.["0"]?.url || "https://via.placeholder.com/400x300",
        development: property.subdivision || "N/A",
        pricePerSqft: property.sqFt
          ? `$${Math.floor(property.rntLsePrice / parseInt(property.sqFt.replace(/,/g, "")))}`
          : "N/A",
        yearBuilt: property.yearBuilt || "N/A",
        latitude: property.latitude,
        longitude: property.longitude,
        fullDetailsURL: property.fullDetailsURL,
        propertyType: "Luxury Condo"
      }));

    res.json(propriedades);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      erro: "Erro ao buscar luxury condos",
      detalhes: err.response?.data || err.message,
    });
  }
});



// Uso no servidor
// app.listen(PORT, () => {
//   console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
// });

// Uso maquina local
app.listen(PORT, 'localhost', () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});