
const fs = require('fs');
const http = require('http');
const url = require('url');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ********  FILES *****************
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//BLOCKING: SYNCHRONOUS WAY!!!!

// const txtIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
// console.log(txtIn);
// const  textOut = 'This is what we know about the avocado: ${txtIn}.\nCreated on ${Date.now}';

// fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
// console.log('file written');

//NON-BLOCKING: ASYNCHRONOUS WAY

// fs.readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', (err, data1) => {
//    fs.readFile(`./1-node-farm/starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//       console.log(data2);
//       fs.readFile('./1-node-farm/starter/txt/append.txt', 'utf-8', (err, data3) => {
//         console.log(data3);
//       }); 
//    }); 
// });
// console.log('Will read file');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// *********  SERVER **************
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const data = fs.readFileSync('./1-node-farm/starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
   const pathName = req.url;
   
   if (pathName === '/' || pathName === '/overview') {
       res.end('This is the Overview Page!');
   }else if (pathName === '/products'){
       res.end('You have reached the Products Page!');
   }else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json'});
    res.end(data);
    } else {
       res.writeHead(404, {
           'Content-type': 'text/html',
           'NodesSysMsg': 'hello-nodejs'
       });
       res.end('<h1>Blimey!..Page not found</h1>');
   }
      
});

server.listen(8000, '127.0.0.1', () => {
   console.log('listening to requests on port 8000'); 
});
    