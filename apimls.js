// server_idx.js — API de teste no navegador (Node 18+)
import express from "express";

const app = express();
const PORTA = 5055;

// Chave que você passou
const TOKEN = "E2zacX5HZjIrbp1SeiZ0i@";
const BASE = "https://api.idxbroker.com";

async function chamarIDX(caminho, parametros = {}) {
  const qs = new URLSearchParams(parametros);
  const url = `${BASE}${caminho}${qs.toString() ? "?" + qs.toString() : ""}`;

  const r = await fetch(url, {
    method: "GET",
    headers: { accesskey: TOKEN, outputtype: "json" }
  });

  const texto = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status} – ${texto.slice(0, 300)}`);

  try { return JSON.parse(texto); } catch { return texto; }
}

// Visão geral: components + methods + featured
app.get("/api/idx/visao", async (req, res) => {
  try {
    const [componentes, metodos, featured] = await Promise.all([
      chamarIDX("/clients/listcomponents"),
      chamarIDX("/clients/listmethods"),
      chamarIDX("/clients/featured", { count: req.query.count || 25 })
    ]);

    res.json({
      componentes,
      metodos_amostra: Array.isArray(metodos) ? metodos.slice(0, 10) : metodos,
      featured_total: Array.isArray(featured) ? featured.length : (featured?.results?.length || 0),
      featured_exemplo: Array.isArray(featured) ? featured.slice(0, 3) : (featured?.results || []).slice(0, 3)
    });
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});

// Proxy genérico: /api/idx/:componente/:metodo?qualquer=param
app.get("/api/idx/:componente/:metodo", async (req, res) => {
  try {
    const { componente, metodo } = req.params;
    const parametros = { ...req.query };
    const dados = await chamarIDX(`/${componente}/${metodo}`, parametros);
    res.json(dados);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor IDX rodando em http://localhost:${PORTA}`);
});
