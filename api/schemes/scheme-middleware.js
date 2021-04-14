const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const {scheme_id} = req.params;
  Schemes.getSchemesById(scheme_id)
    .then(scheme => {
      if(scheme) {
        next();
      }
      else {
        res.status(404).json({message: `scheme with scheme_id ${scheme_id} not found`})
      }
    })
    .catch(err => next(err));
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if (!req.body.scheme_name || typeof req.body.scheme_name !== "string") {
    res.status(400).json({message: "invalid scheme_name"});
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
