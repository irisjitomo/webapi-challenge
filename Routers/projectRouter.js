const express = require('express');
const projectDataBase = require('../data/helpers/projectModel');
const actionDataBase = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectDataBase
    .get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({ message: "failure "})
    })
})

router.get('/:id', (req, res) => {
    projectDataBase
    .get(req.params.id)
    .then(project => {
        if (project) {
            res.json(project)
        } else {
            res.status(404).json({ message: "could not find ID"})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'failure'})
    })
})

router.get('/actions/:project_id', (req, res) => {
    actionDataBase
    .get(req.params.actions)
    .then(project => {
        if (project) {
            res.json(project)
        } else {
            res.status(404).json({ message: "could not find project ID"})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'failure'})
    })
})

router.post('/', (req, res) => {
    const project = req.body
    if (!project.name || !project.description) {
        res.status(400).json({ error: "please provide name and description of project"})
    } else {
        projectDataBase
        .insert(project)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ message: "failure"})
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    projectDataBase
    .remove(id)
    .then(project => {
        if (project) {
            res.json(project)
        } else {
            res.status(404).json({ error: "could not find ID"})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'failure' })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    if (!updates.name || !updates.description) {
        res.status(400).json({ error: "please provide name and description of project"})
    } else {
        projectDataBase
        .update(id, updates)
        .then(changes => {
            if (changes) {
                res.status(200).json(changes)
            } else {
                res.status(404).json({ message: "could not find ID"})
            }
        })
        .catch(() => {
            res.status(500).json({ message: "could not save changes"})
        })
    }
})


module.exports = router;