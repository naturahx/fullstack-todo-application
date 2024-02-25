import http from 'http'
import url from 'url'
import querystring from 'querystring'

let data = [
  {
    id: 1,
    title: "XYII",
    description: "PEISNIS"
  },
  {
    id: 2,
    title: "X14444444445YII",
    description: "PEI123111111111111111111111111SNIS"
  },
  {
    id: 3,
    title: "XY31231II",
    description: "PEISNI123123123"
  },
];

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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

    req.on('end', () => {
      const { title, description } = JSON.parse(body);
      const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      data.push({ id, title, description });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    });
  } else if (method === 'DELETE' && parsedUrl.pathname === '/') {
    const { id } = parsedUrl.query;
    data = data.filter(item => item.id !== parseInt(id));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
} else if (method === 'PUT' && parsedUrl.pathname === '/') {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { id, title, description } = JSON.parse(body);
    data = data.map(item => (item.id === parseInt(id) ? { id, title, description } : item));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  });
} else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000)