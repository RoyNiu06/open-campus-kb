import http from "node:http";
import worker from "../worker/open-campus-worker.mjs";

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8788);

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

const server = http.createServer(async (req, res) => {
  try {
    const body = await readBody(req);
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) headers.set(key, value.join(", "));
      else if (value != null) headers.set(key, value);
    }

    const request = new Request(`http://${host}:${port}${req.url}`, {
      method: req.method,
      headers,
      body: body && body.length ? body : undefined
    });

    const response = await worker.fetch(request, {});
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const responseBody = Buffer.from(await response.arrayBuffer());
    res.end(responseBody);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end(`Local preview error: ${error?.stack || error}`);
  }
});

server.listen(port, host, () => {
  console.log(`OpenCampusKB local preview ready at http://${host}:${port}`);
});
