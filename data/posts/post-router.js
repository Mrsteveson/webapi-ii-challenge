const express = require('express');
// posts === db. like we established it yesterday.
const Posts = require('../db.js');
const router = express.Router();


// Get. **Postman Tested: working**
// Written without async.
router.get('/', (req, res) => {
    Posts
    .find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ message: "The posts information could not be retrieved."})
    })
})

// Get by ID. **Postman Tested: working**
// Written without async.
// if(x.length > 0)'s truthy-ness is what is going to determine what I get returned on the tests.**
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Posts
    .findById(id)
    .then(posts => {
        if(posts.length > 0) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be retrieved."})
    })
})

// Post. **Postman Tested: working**
// Written without async. returns the entire new object instead of just ID#(thanks to line 65).
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the user."})
    }

    Posts
    .insert({ title, contents })
    .then(response => {
        return Posts.findById(response.id)
    })
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({ message: "There was an error while saving the post to the database."})
    })
})

// Put. **Postman Tested: working**
// Written without async
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Posts
    .remove(id)
    .then((id) => {
        if(id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The user could not be removed."})
    })
})

// Put. **Postman Tested: working**
// Written without async
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    if(!title || !contents) {
        console.log('test');
        res.status(400).send({ message: "Please provide title and contents for the post."})
    }

    Posts
    .update(id, { title, contents })
    .then(update =>{
        // console.log(update);
        if(update) {
            return
        } else {
            res.status(404).send({ message: "The post with the specified ID does not exist."})
        }
    })
    .then(response => {
        // console.log(id);
        return Posts.findById(id)
    })
    .then(response => {
        res.status(200).send({ data: response[0] })
    })
    .catch(err => {
        // console.log(err);
        res.status(500).send({ message: "The post information could not be modified."})
    })
})


// export---*-S-*----
module.exports = router;