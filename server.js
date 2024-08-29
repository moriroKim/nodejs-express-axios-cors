// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.text());
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    })
);

let data = { message: '여러분 화이팅!' };

app.options('/', (req, res) => {
    return res.status(204).end();
});

app.get('/', (req, res) => {
    console.log(req.body);
    return res.status(200).send(data);
});

app.post('/', (req, res) => {
    console.log('POST 요청 수신', req.body);
    data.message = req.body;
    return res.status(200).send(`받은 POST 데이터: ${req.body}`);
});

app.put('/', (req, res) => {
    console.log('PUT 요청 수신: ', req.body);
    data = { message: req.body };
    return res.status(200).send(data);
});

app.delete('/', (req, res) => {
    console.log('DELETE 요청 수신', req.body);
    data = {};
    return res.status(200).send('데이터가 삭제되었다');
});

// const server = express.createServer((req, res) => {
//     if (req.method === 'OPTIONS') {
//         res.writeHead(204, headers);
//         res.end();
//         return;
//     }

//     if (req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
//         res.end(JSON.stringify(data));
//     }

//     if (req.method === 'POST') {
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk.toString();
//         });

//         req.on('end', () => {
//             data.message = body;
//             res.writeHead(200, headers);
//             res.end(`받은 POST 데이터: ${body}`);
//         });
//     }

//     if (req.method === 'PUT') {
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk.toString();
//         });

//         req.on('end', () => {
//             data.message = body;
//             res.writeHead(200, headers);
//             res.end(`업데이트된 데이터: ${body}`);
//         });
//     }

//     if (req.method === 'DELETE') {
//         data = {};
//         res.writeHead(200, headers);
//         res.end('데이터가 삭제되었습니다.');
//     }
// });

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000/ 에서 실행 중입니다.');
});
