// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', (req, res, next) => {
    Task.find()
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const task = req.body 
    Task.add(task)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'something went wrong in the Task Router',
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router