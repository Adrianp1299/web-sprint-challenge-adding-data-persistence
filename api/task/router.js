// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', (req, res, next) => {
    Task.find()
    .then(resource => {
        res.status(200).json(resource.map((task) => {
            if (task.task_completed === 0){
                return {
                    ...task, task_completed: false
                }
            } else {
                return {
                    ...task, task_completed: true
                }
            }
        }))
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const task = req.body 
    Task.add(task)
        .then(task => {
            if (task.task_completed===0) {
                res.status(201).json( 
                    {
                        'task_id': task.task_id,
                        'task_description': task.task_description,
                        'task_notes': task.task_notes,
                        'task_completed': false,
                        'project_id': task.project_id
                    }
                )
            } else {
                res.status(201).json( 
                    {
                        'task_id': task.task_id,
                        'task_description': task.task_description,
                        'task_notes': task.task_notes,
                        'task_completed': true,
                        'project_id': task.project_id
                    }
                )
            }
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