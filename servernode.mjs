import { createServer } from 'http';
import * as ejs from 'ejs';
import { parse } from 'querystring';
import { readFile } from 'fs'; 
import { getUsersData, getProductosData, getClientesData } from './testmysql.mjs';


const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = parse(body);
      if (formData.usuario === 'admin' && formData.contrasena === '1234') {
        readFile('views/menu.html', 'utf8', (err, str) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred');
          } else {
            console.log('Redireccionando a menu.html');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str);
          }
        });
      } else {
        console.log('Credenciales incorrectas, redireccionando a index.html');
        res.writeHead(302, { 'Location': '/' });
        res.end();
      }
    });
  } else if (req.url === '/cu') {
    getUsersData()
      .then(usuarios => {
        ejs.renderFile('views/catalogousuarios.html', { usuarios }, (err, str) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str);
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An error occurred');
      });
  } else if (req.url === '/cp') {
    getProductosData()
      .then(productos => {
        ejs.renderFile('views/catalogoproductos.html', { productos }, (err, str) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str);
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An error occurred');
      });
  } else if (req.url === '/cc') {
    getClientesData()
      .then(clientes => {
        ejs.renderFile('views/catalogoclientes.html', { clientes }, (err, str) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str);
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An error occurred');
      });
  } else {
    ejs.renderFile('views/index.html', (err, str) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An error occurred');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(str);
      }
    });
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

