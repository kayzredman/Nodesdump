const fs = require("fs");
const express = require("express");

const app = express();

//ADD THE MIDDLE-WARE FROM EXPRESS(this works with the POST handler)
app.use(express.json());

//Read the file from JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)
);

//Building the API route handler for GET
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

//Building the API route handler for an ID(specific tour)
app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convert the string to a number
  const tour = tours.find((el) => el.id === id);

  //check if the ID is correct or eitherwise
  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

//Building the API route handler for POST
app.post("/api/v1/tours", (req, res) => {
  //console.log(req.body);

  //request for the new ID
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  //Push data into DB
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//Building the API route handler for a PATCHING(UPDATE)
app.patch("/api/v1/tours/:id", (req, res) => {
  //check for the existence of the tour ID
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
});

//Building the API route handler for a delete(UPDATE)
app.delete("/api/v1/tours/:id", (req, res) => {
  //check for the existence of the tour ID
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Setting up the port to listen
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
