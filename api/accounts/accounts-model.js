const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id});
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts').insert(account)
  .then(newId => db('accounts').where({id: newId}))
  
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where({id}).update(account)
  .then(() => db('accounts').where({id}))
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id})
  .then( (account) => {
    return db('accounts').where({id}).del()
    .then(() => account)
  })
}

const getByName = name => {
  // DO YOUR MAGIC
  return db('accounts').where({name});
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
