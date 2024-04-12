// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

router.get('/', (req, res, next) => {
    Project.find()
    .then(resource => {
        res.status(200).json(resource.map((project) => {
            if (project.project_completed === 0){
                return {
                    ...project, project_completed: false
                }
            } else {
                return {
                    ...project, project_completed: true
                }
            }
        }))
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const project = req.body 
    Project.add(project)
        .then(project => {
            if (project.project_completed===0) {
                res.status(201).json( 
                    {
                        'project_id': project.project_id,
                        'project_name': project.project_name,
                        'project_description': project.project_description,
                        'project_completed': false
                    }
                )
            } else {
                res.status(201).json( 
                    {
                        'project_id': project.project_id,
                        'project_name': project.project_name,
                        'project_description': project.project_description,
                        'project_completed': true
                    }
                )
            }
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