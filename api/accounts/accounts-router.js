const router = require('express').Router();
const { getAll, getById, create, updateById, deleteById } = require('./accounts-model');
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  getAll()
  .then(accounts => res.status(200).json(accounts))
  .catch((err) => next(err))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  getById(req.params.id)
  .then(account => res.status(200).json(account[0]))
  .catch((err) => next(err))
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  create(req.body)
  .then(newAccount => res.status(201).json({name: newAccount[0].name, budget: newAccount[0].budget}))
  .catch((err) => next(err))
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  updateById(req.params.id, req.body)
  .then(user => res.status(200).json({name: user[0].name, budget: user[0].budget}))
  .catch((err) => next(err))
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  deleteById(req.params.id)
  .then(user => res.status(200).json(user))
  .catch((err) => next(err))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  console.error(err);
  res.status(500).json({message: "Failed to perform the requested operation"})
})

module.exports = router;
