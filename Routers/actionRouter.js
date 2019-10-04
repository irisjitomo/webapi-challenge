const express = require('express');
const actionDataBase = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDataBase
    .get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({ message: "failure "})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    actionDataBase
    .get(id)
    .then(action => {
        if (action) {
            res.json(action)
        } else {
            res.status(404).json({ message: "could not find ID"})
        }
    })
    .catch(() => {
        res.status(500).json({ message: "failure "})
    })
})

router.post('/', (req, res) => {
    const action = req.body
    if (!action.project_id || !action.description || !action.notes || action.description > 128) {
        res.status(400).json({ error : "please provide all the needed values (project_id, description, and notes)"})
    } else {
        actionDataBase
        .insert(action)
        .then(added => {
            res.status(200).json(added)
        })
        .catch(() => {
            res.status(500).json({ message: "failure "})
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    actionDataBase
    .remove(id)
    .then(action => {
        if (action) {
            res.json(action)
        } else {
            res.status(404).json({ message: "could not find ID"})
        }
    })
    .catch(() => {
        res.status(500).json({ message: "error getting data"})
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const update = req.body
    if (!update.project_id || !update.description || !update.notes) {
        res.status(400).json({ error : "please provide all the needed values (project_id, description, and notes)"})
    } else {
        actionDataBase
        .update(id, update)
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