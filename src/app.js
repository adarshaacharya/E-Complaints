// E-Complaints
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const compression = require('compression')
const MongoStore = require('connect-mongo')(session)

const app = express()
// prevent stack traces on production
app.set('env', process.env.NODE_ENV)

// Middleware to Handle Post request
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(compression())

// Define paths for views and public dir
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../views')

// Set path for views and public directory
app.set('views', viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))

// Ejs Engine
app.set('viewengine', 'ejs')

// connecting db
mongoose
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database successfully...'))
  .catch((err) => console.log('Failed to connect to database', err))

// Express session middleware
app.use(
  session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// Express flash message middleware
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error') // login passport.js msg
  next()
})

// passport config
require('../middleware/passport.js')(passport)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// setting global variable for every view as middleware function to check whether user is logged in or not
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// Routes
const homeRouter = require('../routes/index')

app.use(homeRouter)

const complaintRouter = require('../routes/complaints')

app.use(complaintRouter)

const feedbackRouter = require('../routes/feedback')

app.use('/feedback', feedbackRouter)

const userRouter = require('../routes/users')

app.use('/users', userRouter)

const adminRouter = require('../routes/admin')

app.use('/admin', adminRouter)

const staffRouter = require('../routes/staff')

app.use('/staff', staffRouter)

const errorRouter = require('../routes/404')

app.use(errorRouter)

// Host and port
const hostname = 'localhost'
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
