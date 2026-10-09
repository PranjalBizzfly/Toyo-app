import http from "node:http";
import fs from "node:fs";
const out = process.argv[2];
http.createServer((req, res) => {
  let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => { fs.appendFileSync(out, b + "\n"); res.writeHead(200, { "Content-Type": "application/json" }); res.end('{"ok":true}'); });
}).listen(3199, () => console.log("mock on 3199"));
