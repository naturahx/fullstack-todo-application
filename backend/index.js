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

  if (method === 'GET' && parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (method === 'POST' && parsedUrl.pathname === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { title, description } = JSON.parse(body);
      data.push({ title, description });
      res.writeHead(200, { 'Content-Type': 'text/plain' });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
  }
});

server.listen(3000)