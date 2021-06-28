require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const blogArticle = require('./models/blog_models')
const blogArticleRouter = require('./routes/blog_routes')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('db connected..')
    })
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    blogArticle.find({}).sort({ published: 'desc' })
        .then((articles) => {
            res.render('blog_views/index', { articles: articles })
        })
        .catch(err => console.log(err))
})

app.use('/', blogArticleRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT)