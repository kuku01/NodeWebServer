/* jshint esversion: 6 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now} ${request.method} ${request.path}`;
  console.log(log);
  fs.appendFile('server.log', log+ '\n', (error) => {
    if (error) {
      console.log("unable to print error");
    }
  });
  next();//
});

app.use((request,response,next) => {
response.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, response) => {
    // response.send("<h1>Hello world</h1>");
    response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, response) => {
    // response.send("Coming from page");
    // response.render('about.hbs');
    response.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});


app.get('/bad',(req,resposne) => {
    resposne.send({
        errorMessage: 'unable to handel request'
    });
});
app.listen(3000);
