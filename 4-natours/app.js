const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

//(1) ADD THE MIDDLE-WARE FROM EXPRESS(this works with the route handlers)*******
//***************************************************************************************
app.use(morgan("dev"));

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

// (2) ROUTE HANDLERS
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
}; //*** End function (1)***

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
}; ////*** End function (2)***

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
}; //*** End function (3)***

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
}; //*** End function (4)***

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
}; //*** End function (5)***

// FUNCTION FOR THE USER ROUTES
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!!",
  });
};

const createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!!",
  });
};

//*** (3) ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUsers);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//*** (4.) START Server -- Setting up the port to listen
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
