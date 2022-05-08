const {getById, getByName} = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;
  console.log(Object.keys(req.body).includes('budget'));
  console.log(req.body.budget);
  
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  // if (isNaN(1 + budget)) {
    // res.status(400).json({message: 'budget of account must be a number'})
  // } else
  
  if (!name || !Object.keys(req.body).includes('budget')) {
    console.log('name', name);
    res.status(400).json({message: `name and budget are required`})
  } else
  // if (!budget) {
  //   console.log('budget', budget);
  //   res.status(400).json({message: `name and budget are required`})
  // } else
  if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({message: 'name of account must be between 3 and 100'})
  } else
  if (!budget || !parseInt(budget))  {
    res.status(400).json({message: 'budget of account must be a number'})
  } else
  if (budget < 0 || budget > 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'})
  } else {
    req.body.name = req.body.name.trim();
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const accountWithName = await getByName(req.body.name);
  if (accountWithName.length > 0) {
    res.status(400).json({message: "that name is taken"})
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const accountWithId = await getById(req.params.id);
  if (accountWithId.length === 0) {
    res.status(404).json({message: "account not found"})
  } else {
    next()
  }
  // DO YOUR MAGIC
}
