const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req,res) => {
    //get all projects from db
    db('projects')
    .then(projects => {
        res.status(200).json(projects.map(project => {
            return {
              id: project.id,
              name: project.name,
              description: project.project_description,
              completed: `${project.completed === 1 ? 'true' : 'false'}`
            }
        }))
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.post('/api/projects', (req, res) => {
    if(!req.body){
        return res.status(400).json({message: "You need to add something to your project...."})
    } else(
        db('projects').insert(req.body)
    )
    .then(ids => {
        const id = ids[0];
    
        db('projects')
          .where({ id })
          .first()
        .then(project => {
          res.status(201).json({
              message: "success",
              id: project.id, 
              name:project.name, 
              description: project.project_description, 
              completed: `${project.completed === 1 ? 'true' : 'false'}`
            });
        });
    })
    .catch(error => {
        res.status(500).json(error);
    });
})

server.get('/api/resources', (req,res) => {
    //get all projects from db
    db('resources')
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.post('/api/resources', (req, res) => {
    if(!req.body){
        return res.status(400).json({message: "You need to add a resource...."})
    } else(
        db('resources').insert(req.body)
    )
    .then(ids => {
        const id = ids[0];
    
        db('resources')
          .where({ id })
          .first()
        .then(resource => {
            res.status(201).json({message: "success", resource});
        });
    })
    .catch(error => {
        res.status(500).json(error);
    });
})

server.get('/api/projects/tasks', (req,res) => {
    db("tasks as t")
        .join('projects as p', 'p.id', 't.project_id')
        .select('t.id', 'p.name', 't.description', 't.notes', 't.completed')

    .then(tasks => {res.status(200).json(tasks.map(task => {
        return {
          id: task.id,
          project_name: task.name,
        //   project_description: task.project_description,
          description: task.description,
          notes: task.notes,
          completed: `${task.completed === 1 ? 'true' : 'false'}`
        }
    }))})
    .catch(error => {
        res.status(500).json(error);
    });
})

server.post('/api/projects/tasks', (req,res) => {
    if(!req.body){
        return res.status(400).json({message: "You need to add a resource...."})
    } else(
        db('tasks').insert(req.body)
    )
    .then(ids => {
        const id = ids[0];
        db('tasks')
          .where({ id })
          .first()
        .then(task => {
            res.status(201).json({message: "success", task});
        });
    })
    .catch(error => {
        res.status(500).json(error);
    });
})

module.exports = server;