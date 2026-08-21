// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):

import http from "node:http";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Olá, Mundo!");
  }

  if (req.method === "GET" && req.url === "/sobre") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end("<h1>Sobre</h1>");
  }

  if (req.method === "GET" && req.url.startsWith("/saudacao/")) {
    const nome = req.url.substring("/saudacao/".length);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(`Olá, ${nome}!`);
  }

  if (req.method === "POST" && req.url === "/echo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    return req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(body);
    });
  }

  if (req.method === "PUT" && req.url.startsWith("/itens/")) {
    const id = req.url.substring("/itens/".length);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(`Item ${id} atualizado`);
  }

  if (req.method === "DELETE" && req.url.startsWith("/itens/")) {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "PATCH" && req.url === "/config") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Configuração atualizada");
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
