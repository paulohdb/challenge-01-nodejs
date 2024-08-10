import { Database } from "./database.js";
import { randomUUID } from "node:crypto"
import { BuildRoutePath } from "./utils/route-path-builder.js";

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: BuildRoutePath('/tasks'),
    handler: (req, res) => {
     const { search } = req.query

     const task = database.select('tasks', {
      title: search,
      description: search,
     })

     return res.end(JSON.stringify(task))
    }
  },
  {
    method: 'POST',
    path: BuildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }))
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'description is required' }))
      }

      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      database.insert('tasks', task)
      
      return res.writeHead(201).end()
    }
  },

  {
    method: 'PUT',
    path: BuildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'Title or Description are required!'})
        )
      }

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end('Id not Found!')
      }
      
      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updatedAt: new Date(),
      })

      return res.writeHead(204).end()
    }
  },

  {
    method: 'PATCH',
    path: BuildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end('Id not Found!')
      }

      const isTaskOk = !!task.completedAt

      const completedAt = isTaskOk ? null : new Date()

      database.update('tasks', id, { completedAt })

      return res.writeHead(204).end()
    }
  },

  {
    method: 'DELETE',
    path: BuildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id }) 

      if (!task) {
        return res.writeHead(404).end('Id not Found!')
      }

      database.delete('tasks', id) 

      return res.writeHead(204).end()
    }
  },
]