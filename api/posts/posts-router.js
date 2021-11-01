// implement your posts router here
const router = require('express').Router()
const posts = require('./posts-model')

// #### 1 [GET] /api/posts
router.get('/', (req, res) => {
    posts
        .find()
        .then((postsRecieved) => {
            // if (!postsRecieved) return res.status(404).json({ Message: "No Posts Found" })
            res.status(200).json(postsRecieved)
        })
        .catch(() => {
            res.status(500).json({ message: "The posts information could not be retrieved" })
        })
})


// #### 2 [GET] /api/posts/:id
router.get('/:id', async (req, res) => {
    try {
        const specifiedPost = await posts.findById(req.params.id)
        if (!specifiedPost) return res.status(404).json({ message: "The post with the specified ID does not exist" })
        res.status(200).json(specifiedPost)
    } catch {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
})

//wtf
// #### 3 [POST] /api/posts
router.post("/", async (req, res) => {
    console.log(req.body, "req.body")
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        try {
            const addPost = await posts.insert(req.body)
            console.log(addPost);
            //res.send(201).json({ data: addPost });
        } catch {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        }
    }
})


// #### 4 [PUT] /api/posts/:id
router.put('/:id', async (req, res) => {
    let id = req.params.id
    const postToBeUpdated = await posts.findById(id)
    if (!postToBeUpdated) return res.status(404).json({ message: "The post with the specified ID does not exist" })

    posts
        .update(id, req.body)
        .then((updated) => {
            console.log(updated);
            if (!updated.title && !updated.content) {
                return res.status(400).json({ message: "Please provide title and contents for the post" })
            }
            res.status(200).json({ data: updated })
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be modified" })
        })
})
// router.put(`/:id`, async (req, res) => {
//     const id = req.params.id;
//     if (!req.body.title && !req.body.content) {
//         res
//             .status(400)
//             .send({ message: "Please provide title and contents for the post" });
//     } else {
//         await posts
//             .update(id, req.body)
//             .then((postDesired) => {
//                 return (postDesired === undefined || postDesired === null)
//                     ? res.status(404).send({
//                         message: "The user with the specified ID does not exist",
//                     })
//                     : res.status(200).send(postDesired);
//             })
//             .catch(() => {
//                 res.status(500).json({ message: "The post information could not be modified" });
//             });
//     }
// });

// #### 5 [DELETE] /api/posts/:id
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const postToBeDeleted = await posts.findById(id)
        if (postToBeDeleted) {
            await posts.remove(id) // don't forget the await keyword
            res.status(200).json(postToBeDeleted)
        }
        if (!postToBeDeleted) return res.status(404).json({ message: "The post with the specified ID does not exist" })
    } catch {
        res.status(500).json({ message: "The post could not be removed" })
    }
})


// #### 6 [GET] /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
    try {
        const specifiedPost = await posts.findById(req.params.id)
        if (!specifiedPost) return res.status(404).json({ message: "The post with the specified ID does not exist" })
        const specifiedComment = await posts.findPostComments(req.params.id)
        res.status(200).json(specifiedComment)
    } catch {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})

module.exports = router

// {
//     title: "The post title", // String, required
//     contents: "The post contents", // String, required
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }