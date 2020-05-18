const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);

//*****create a function for all All Tours(1)
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
}; //*** End function (1)***

//****create a function for a specific Tour(2)
exports.getTour = (req, res) => {
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
}; ////*** End function (2)***

//****create a function to create a Tour(3)
exports.createTour = (req, res) => {
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
}; //*** End function (3)***

//****create a function to update a Tour(4)
exports.updateTour = (req, res) => {
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
}; //*** End function (4)***

//****create a function to update a Tour(5)
exports.deleteTour = (req, res) => {
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
}; //*** End function (5)***
