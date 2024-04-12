// build your `Task` model here
const db = require('../../data/dbConfig')

async function find() {
 return db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    )
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