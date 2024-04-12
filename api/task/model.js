// build your `Task` model here
const db = require('../../data/dbConfig')

function find() {
  return db('tasks')
}

function add(task) {
  return db('tasks').insert(task)
  .then(([task_id]) => {
   return db ('tasks').where('task_id', task_id).first()
  })
}

module.exports = {
    find,
    add
  }