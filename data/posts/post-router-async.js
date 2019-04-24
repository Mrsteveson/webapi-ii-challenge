// Broke out these two methods of writing into different files so it was a disaster to read.
const express = require('express');
// posts === db. like we established it yesterday.
const Posts = require('../db.js');
const router = express.Router();

// Get. **Postman Tested: working**
// written with async/await, like guided lecture.
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The posts information could not be retrieved"})
    }
});

// Get by ID. **Postman Tested: working**
// written with async/await, like guided lecture.
// if(x.length > 0)'s truthy-ness is what is going to determine what I get returned on the tests.**
router.get('/:id', async (req, res) => {
    try {
        const posts = await Posts.findById(req.params.id);
        
        if(posts.length > 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The post information could not be retrieved"})
    }
});

// Post. **Postman Tested: working**
// written with async/await, like guided lecture.
router.post('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        const { title, contents } = req.body;

        if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post."})
        }

        Posts
        .insert({ title, contents })
        .then(post => {
            res.status(201).json(posts)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error while saving the post to the database."})
    }
});

// Delete. **Postman Tested: working**
// written with async/await, like guided lecture.
router.delete('/:id', async (req, res) => {
    try {
        const posts = await Posts.remove(req.params.id);

        if(posts > 0) {
            res.status(200).json({ message: "Post has been nuked."})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The post could not be removed."})
    }
});

// Put. **Postman Tested: working**
// written with async/await, like guided lecture.
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const post = req.body;
    if(id){
        try {
            if(!post) {
                res.status(400).json({ message: "Please provide title and contents for the post."})
            }

            await Posts.update(id, post)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({ message: "The post information could not be modified"})
            })  
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "The post information is busted."})
        }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
})

// export---*-S-*----
module.exports = router;