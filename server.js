const express = require("express");
const hbs = require("hbs");
var app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
   var log =  `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
          console.log('Unable to append to server.log');
    }
  });
  next();
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req,res,next) => {
  res.render('maintainence.hbs');
  next();
})

app.get('/',(req,res) => {
  // res.send('<h1>Hello express!</h1>');
  res.render('home.hbs', {
    WelcomeMessage: "Welcome to Home Page!",
    currentYear: new Date().getFullYear(),
    pageTitle: 'Title',
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'Title',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send('Error handling request')
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
