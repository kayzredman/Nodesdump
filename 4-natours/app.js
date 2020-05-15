const fs = require('fs');
const express = require('express');

const app = express();

//ADD THE MIDDLE-WARE FROM EXPRESS(this works with the POST handler)
app.use(express.json());

// //request and response from server
// app.get('/', (req, res) => {
//    res.status(200).json({message: 'Hello from the server side!!', app: 'Natours'}); 
// });

// //send request to server
// app.post('/', (req, res) => {
//    res.send('You can post to this endpoint...!'); 
// });

//Read the file from JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

//Building the API route handler for GET
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
      status: 'success', 
      results: tours.length,
      data: {
          tours
        } 
    });
});

//Building the API route handler for POST
app.post('/api/v1/tours', (req, res) => {
   //console.log(req.body);
   
   //request for the new ID
   const newId = tours[tours.length -1].id + 1;
   const newTour = Object.assign({ id: newId }, req.body);
   
   //Push data into DB
   tours.push(newTour);
   
   fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
       res.status(201).json({
           status: 'success',
           data: {
               tour: newTour
           }
       });
   }
   );
      
});


// Setting up the port to listen
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});