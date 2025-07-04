const path = require('path');
const express = require('express');
const cors =require('cors');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;



// Define paths to Express configuration.
const publicDirectoryPath = path.join(__dirname, '../public'); //Using path.join to switch between folders.
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
 

app.use(cors()); // cors permission

// Setup handlebars engine and views
app.set('view engine', 'hbs'); //handlebars set up.
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// app.com.
// app.com/help.
// app.com/about.

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Damian-Jude'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Damian-Jude' 
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        description: 'your help',
        title: 'Help',
        name: 'Damian-Jude'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please provide a search term!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if(error){
           return res.send({error});
        }
        
        setTimeout(()=> { 
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

                // console.log(forecastData);
        }) }, 5000);
        
       
    });

    

     
          

        
});

app.get('/products', (req, res)=>{
    
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term.'
        });

        return;
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404 help',
        name: 'Damian-Jude',
        errorMessage: 'Help article not found.'
    });
});


app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Damian-Jude',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, ()=>{
    // window.alert(port)
    console.log('Server is up on port' + port)
});