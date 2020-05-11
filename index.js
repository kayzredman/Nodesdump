
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

const server = http.createServer((req, res) => {
   res.end('Hello from the server!!!'); 
});

server.listen(8000, '127.0.0.1', () => {
   console.log('listening to requests on port 8000'); 
});
    