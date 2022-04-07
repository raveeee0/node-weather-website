const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { registerPartial } = require('hbs');
const { partials } = require('handlebars');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

//Define paths for express configuration
const publicDirectoryFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlers engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

//Setup static folder to serve
app.use(express.static(path.join(publicDirectoryFolder)));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Gabriele'
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gabriele' 
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: ''
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.json({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Gabriele',
        errorMessage: 'Help article not found'
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gabriele',
        errorMessage: 'Page not found'
    });
})



app.listen(PORT, () => {
    console.log('Server online on port ' + PORT);
})
