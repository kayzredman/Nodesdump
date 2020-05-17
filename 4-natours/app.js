const fs = require("fs");
const express = require("express");

const app = express();

//********ADD THE MIDDLE-WARE FROM EXPRESS(this works with the route handlers)*******
//***************************************************************************************
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Read the file from JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)
);

//*****create a function for all All Tours(1)
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
}; //*** End finction (1)***

//****create a function for a specific Tour(2)
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convert the string to a number
  const tour = tours.find((el) => el.id === id);

  //check if the ID is correct or eitherwise
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
}; ////*** End finction (2)***

//****create a function to create a Tour(3)
const createTour = (req, res) => {
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
}; //*** End finction (3)***

//****create a function to update a Tour(4)
const updateTour = (req, res) => {
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
}; //*** End finction (4)***

//****create a function to update a Tour(5)
const deleteTour = (req, res) => {
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
}; //*** End finction (5)***

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Setting up the port to listen
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
