
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
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
    
      
    
}

const tempOverview = fs.readFileSync('./1-node-farm/starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./1-node-farm/starter/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./1-node-farm/starter/templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./1-node-farm/starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    
   //parsing Variables from URL 
   const { query, pathname } = url.parse(req.url, true);
   
   // Overview Page
   if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html'}); 
    
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
       
    
    // Product Page
   }else if (pathname === '/products'){
    res.writeHead(200, { 'Content-type': 'text/html'});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
       
    // API
   }else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json'});
    res.end(data);
    
    // NOT FOUND
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
    