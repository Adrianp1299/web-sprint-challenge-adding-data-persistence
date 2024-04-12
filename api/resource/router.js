// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/', (req, res, next) => {
    Resource.find()
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const resource = req.body 
    Resource.add(resource)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'something went wrong in the Resource Router',
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router