import http from 'http';
import url from 'url';

const data = [
  {
    "title": "XYII",
    "description": "PEISNIS"
  },
  {
    "title": "X14444444445YII",
    "description": "PEI123111111111111111111111111SNIS"
  },
  {
    "title": "XY31231II",
    "description": "PEISNI123123123"
  },
];

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (method === 'GET' && parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (method === 'POST' && parsedUrl.pathname === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { title, description } = JSON.parse(body);
      data.push({ title, description });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    });
  } else if (method === 'GET' && parsedUrl.pathname === '/posts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
