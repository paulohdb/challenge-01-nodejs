# API using NodeJS

This is an API using NodeJs, applying all the content from the first module of NodeJs Formation from Rocketseat.

## Contents:
- HTTP Fundamentals
- Request
- Response
- Headers
- Status Code
- Params

## How the API works?

It is a task creator, you can create a task with title and description.

The task consists with a bunch of data, as:

- Id - Id for each task.
- title - Title of task.
- description - Detailed description of each task.
- completedAt - Conclusion date when it's completed. At First, it's started null
- createdAt - Creation date of the task.
- updatedAt - Update date when it has changed.

### GET/tasks

The GET method show up all the tasks available in the db.

```json
    {
      "id": "1",
      "title": "Create Posts Example",
      "description": "This is a example of a Post method from my API using NodeJS",
      "completedAt": null,
      "createdAt": "2024-08-10T22:49:55.350Z",
      "updatedAt": "2024-08-10T22:49:55.350Z"
    }
```

### POST/tasks

The POST method, create a new task in the db

```json
    {
      "title": "Create Posts Example",
      "description": "This is a example of a Post method from my API using NodeJS",
    }
```

### PUT/tasks/:id

The PUT method, can change the title or description, or both.

```json
{
    "title":"Changing the Title",
    "description":"Task to change the title of a task"
}

{
    "id": "1",
    *"title": "Changing the Title"*,
    *"description": "Task to change the title of a task"*,
    "completedAt": "null",
    "createdAt": "2024-08-10T22:49:55.350Z",
    "updatedAt": "2024-08-10T22:59:28.178Z"
}
```

### PATCH/tasks/:id/complete

The PATCH method, change the "completedAt" field, from null to the Date it has been completed.

```json
{
  "id": "1",
  "title": "Changing the Title",
  "description": "Task to change the title of a task",
  *"completedAt": "2024-08-10T23:01:49.775Z"*,
  "createdAt": "2024-08-10T22:49:55.350Z",
  "updatedAt": "2024-08-10T22:59:28.178Z"
}
```

### DELETE/tasks/:id 

The DELETE method, delete the task from the db using the id.

