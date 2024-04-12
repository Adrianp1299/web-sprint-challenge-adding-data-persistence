// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

router.get('/', (req, res, next) => {
    Project.find()
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const project = req.body 
    Project.add(project)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'something went wrong in the Project Router',
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router