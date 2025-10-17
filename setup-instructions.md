# Instruções de Setup - Site Dayanne Costa

## Análise de Compatibilidade ✅

### Backend (Node.js + Express + Prisma)
- **Windows**: ✅ Totalmente compatível
- **VPS Linux**: ✅ Totalmente compatível
- **Banco de dados**: PostgreSQL (compatível com ambos)

### Frontend (React + Vite)
- **Windows**: ✅ Totalmente compatível
- **VPS Linux**: ✅ Totalmente compatível

## Pré-requisitos

### Para Windows (Desenvolvimento Local)
1. **Node.js** (versão 18 ou superior)
2. **PostgreSQL** (versão 12 ou superior)
3. **Git** (opcional, mas recomendado)

### Para VPS (Produção)
1. **Node.js** (versão 18 ou superior)
2. **PostgreSQL** (versão 12 ou superior)
3. **PM2** (para gerenciamento de processos)
4. **Nginx** (como proxy reverso)

## Setup no Windows (Desenvolvimento)

### 1. Instalar PostgreSQL
```bash
# Baixar e instalar PostgreSQL do site oficial
# Configurar usuário: postgres, senha: admin
# Porta padrão: 5432
```

### 2. Criar banco de dados
```sql
-- Conectar ao PostgreSQL e executar:
CREATE DATABASE real_estate_db;
```

### 3. Instalar dependências
```bash
# Na raiz do projeto
npm install

# No diretório Backend
cd Backend
npm install
```

### 4. Configurar banco de dados
```bash
# No diretório Backend
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Executar o projeto
```bash
# Terminal 1 - Backend (na pasta Backend)
npm run dev

# Terminal 2 - Frontend (na raiz do projeto)
npm run dev
```

## Setup no VPS (Produção)

### 1. Atualizar sistema e instalar dependências
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget gnupg2 software-properties-common

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx
```

### 2. Configurar PostgreSQL
```bash
sudo -u postgres psql
CREATE DATABASE real_estate_db;
CREATE USER postgres WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE real_estate_db TO postgres;
\q
```

### 3. Configurar arquivo .env para produção
```bash
# Editar Backend/.env
DATABASE_URL="postgresql://postgres:sua_senha_segura@localhost:5432/real_estate_db"
NODE_ENV=production
PORT=5000
JWT_SECRET="sua_chave_jwt_super_segura_aqui"
```

### 4. Build e deploy
```bash
# Fazer upload dos arquivos para o VPS
# Instalar dependências
npm install --production
cd Backend && npm install --production

# Configurar banco
npx prisma generate
npx prisma db push
npx prisma db seed

# Build do frontend
npm run build

# Iniciar com PM2
pm2 start Backend/server.js --name "dayanne-backend"
pm2 startup
pm2 save
```

### 5. Configurar Nginx
```nginx
# /etc/nginx/sites-available/dayanne-costa
server {
    listen 80;
    server_name seu_dominio.com;

    # Frontend (arquivos estáticos)
    location / {
        root /caminho/para/projeto/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        proxy_pass http://localhost:5000;
    }
}
```

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/dayanne-costa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Portas Utilizadas
- **Frontend**: 3000 (desenvolvimento) / 80,443 (produção)
- **Backend**: 5000
- **PostgreSQL**: 5432

## Variáveis de Ambiente Importantes

### Backend (.env)
- `DATABASE_URL`: String de conexão PostgreSQL
- `JWT_SECRET`: Chave secreta para tokens JWT
- `NODE_ENV`: development/production
- `PORT`: Porta do servidor (5000)
- `SMTP_*`: Configurações de email

### Frontend (.env)
- `VITE_API_URL`: URL da API backend
- `VITE_GOOGLE_MAPS_API_KEY`: Chave da API do Google Maps

## Comandos Úteis

### Desenvolvimento
```bash
# Rodar ambos (frontend + backend)
npm run dev

# Apenas backend
npm run backend

# Build para produção
npm run build
```

### Produção (PM2)
```bash
# Ver status
pm2 status

# Logs
pm2 logs dayanne-backend

# Restart
pm2 restart dayanne-backend

# Stop
pm2 stop dayanne-backend
```

## Troubleshooting

### Erro de conexão com banco
1. Verificar se PostgreSQL está rodando
2. Verificar credenciais no .env
3. Verificar se o banco existe

### Erro de CORS
1. Verificar CORS_ORIGIN no .env do backend
2. Verificar configuração em Backend/config/cors.js

### Erro de upload de arquivos
1. Verificar permissões da pasta uploads/
2. Verificar MAX_FILE_SIZE no .env