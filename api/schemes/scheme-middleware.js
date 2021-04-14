const Schemes = require('./scheme-model');

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

const validateScheme = (req, res, next) => {
  if (!req.body.scheme_name || typeof req.body.scheme_name !== "string") {
    res.status(400).json({message: "invalid scheme_name"});
  } else {
    next();
  }
}

const validateStep = (req, res, next) => {
  const {instructions, step_number} = req.body;

  if (
    !instructions 
    || typeof instructions !== "string" 
    || !step_number 
    || typeof step_number !== "number" 
    || step_number < 1
    ) {
      res.status(400).json({message: "invalid step"});
    }
  else {
      next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
