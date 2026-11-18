const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end("Method Not Allowed");
  }

  // Health check
  if (url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("ok");
  }

  // Serve the page for every other route
  fs.readFile(INDEX, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Failed to load index.html");
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Embedy running on port ${PORT}`);
});
