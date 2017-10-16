

const express = require('express');

const hbs = require('hbs');

var app = express();

const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

/*app.use((req,res,next) => {
    res.render('maintenance.hbs');
    });
    */

app.use(express.static(__dirname + '/public'));

app.use(
    (req,res, next) =>
    {
        var now = new Date().toString();
        console.log(now + ' ' + req.method + ' ' + req.url);
        fs.appendFile('server.log',now + '\n', (error) => 
    {
        if(error){
console.log('error');
        }
    });
next();
    }
);


hbs.registerHelper('getCurrentYear', () =>
{
return new Date().getFullYear()
});

hbs.registerHelper('screanIt',(text) =>
{
return text.toUpperCase()
});
app.get('/', (request,response) => {

    //response.send('<h1>Hello Express!<hi>');
    response.render('home.hbs', {
        pageTitle: 'HomePage',
        message: 'Welcome to HomePage'
      });
});
app.get('/about', (request,response) => {
          response.render('about.hbs', {
        pageTitle: 'AboutPage',
        message: 'Welcome to AboutPage'
      });   });

    app.get('/bad', (request,response) => {
        
        response.send({
            error: 'error',
           
        });
    
        });

app.listen(port , () =>
{
    console.log('Server is up on port' + port);
});
