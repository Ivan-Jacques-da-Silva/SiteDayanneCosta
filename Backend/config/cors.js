const corsConfig = {
  // Endereços permitidos para desenvolvimento e produção
  allowedOrigins: [
    // VS Code / Desenvolvimento local (localhost)
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5000",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:8080",

    // Replit development (0.0.0.0)
    "http://0.0.0.0:3000",
    "http://0.0.0.0:5173",
    "http://0.0.0.0:5174",
    "http://0.0.0.0:5000",
    "http://0.0.0.0:8080",

    // Replit production
    "https://*.replit.dev",
    "https://*.replit.co",

    // Produção
    "https://site.dayannecosta.com",
    "https://dayannecosta.com",
    "https://www.dayannecosta.com",
    "https://api.dayannecosta.com",
  ],

  // Configurações do CORS
  corsOptions: {
    origin: function (origin, callback) {
      // Permitir requisições sem origin (aplicações mobile, Postman, etc.)
      if (!origin) return callback(null, true);

      // Em ambiente de desenvolvimento, permitir todas as origens
      if (process.env.NODE_ENV === "development") {
        return callback(null, true);
      }

      // Verificar se a origin está na lista permitida
      const isAllowed = corsConfig.allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin.includes("*")) {
          // Suporte para wildcards
          const regex = new RegExp(allowedOrigin.replace(/\*/g, ".*"));
          return regex.test(origin);
        }
        return allowedOrigin === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cache-Control",
      "X-File-Name",
    ],
    exposedHeaders: ["X-Total-Count"],
    optionsSuccessStatus: 200, // Para suporte a browsers legados
    maxAge: 86400, // Cache preflight por 24 horas
  },
};

// Função helper para adicionar origins dinamicamente
corsConfig.addOrigin = (origin) => {
  if (!corsConfig.allowedOrigins.includes(origin)) {
    corsConfig.allowedOrigins.push(origin);
    console.log(`✅ Added new CORS origin: ${origin}`);
  }
};

// Função helper para remover origins
corsConfig.removeOrigin = (origin) => {
  const index = corsConfig.allowedOrigins.indexOf(origin);
  if (index > -1) {
    corsConfig.allowedOrigins.splice(index, 1);
    console.log(`❌ Removed CORS origin: ${origin}`);
  }
};

// Log das origins permitidas no startup
corsConfig.logAllowedOrigins = () => {
  console.log("🌐 CORS - Origins permitidas:");
  corsConfig.allowedOrigins.forEach((origin) => {
    console.log(`   - ${origin}`);
  });
};

module.exports = corsConfig;
