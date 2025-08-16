const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.chaeckId = (req, res, next, val) => {
  console.log(`tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      staus: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

//2-route handlers
exports.getAllTours = (req, res) => {
  console.log(req.reqTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.reqTime,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIdx = tours.findIndex((el) => el.id === id);
  if (tourIdx === -1) {
    return res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  tours[tourIdx] = { ...tours[tourIdx], ...req.body };
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: { tour: tours[tourIdx] },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIdx = tours.findIndex((el) => el.id === id);
  if (tourIdx === -1) {
    return res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  tours.splice(tourIdx, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      res.status(204).json({ status: 'success', data: null });
    }
  );
};
