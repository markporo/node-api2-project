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


module.exports = router