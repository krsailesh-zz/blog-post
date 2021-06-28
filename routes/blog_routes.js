const express = require('express')
const blogArticle = require('../models/blog_models')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('blog_views/new', { article: new blogArticle() })
})

router.post('/new', (req, res) => {
    const article = new blogArticle({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published,
        body: req.body.body
    })

    article.save()
        .then(() => {
            res.redirect(`/${article.slug}`)
        })
        .catch(err => console.log(err))
})

router.get('/edit/:id', async (req, res) => {
    const article = await blogArticle.findById(req.params.id)
    res.render('blog_views/edit', { article: article })
})

router.get('/:slug', (req, res) => {
    blogArticle.findOne({ slug: req.params.slug })
        .then((article) => {
            res.render('blog_views/show', { article: article })
        })
        .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
    blogArticle.findByIdAndUpdate(req.params.id, req.body)
        .then((article) => {
            article.title = req.body.title
            article.description = req.body.description
            article.published = req.body.published
            article.body = req.body.body
            
            res.redirect(`/${article.slug}`)
        })
        .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    blogArticle.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

module.exports = router
