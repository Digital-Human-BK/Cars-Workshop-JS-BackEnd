// [x] init  and configue express app
// [x] init templating lib
// [x] create home controller 
// [x] bind routing  
// [x] create layout 
// --> create data service
// [x] read all
// [x] read one by Id
// [x] create
// [x] edit
// [x] delete
// [x] search
// --> implrement controllers
// [x] home(catalog)
// [x] about
// [x] details
// [x] create
// [x] delete
// [x] edit
// [x] improved home (search)

const express = require('express');
const hbs = require('express-handlebars');
const carsService = require('./services/cars');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const create = require('./controllers/create');
const del = require('./controllers/delete');
const edit = require('./controllers/edit');
const { notFound } = require('./controllers/notFound');

const app = express();

app.engine('.hbs', hbs.create({
  extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(carsService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);

app.route('/create')
  .get(create.get)
  .post(create.post);

app.route('/delete/:id')
  .get(del.get)
  .post(del.post);

app.route('/edit/:id')
  .get(edit.get)
  .post(edit.post);

app.all('*', notFound);

app.listen(3000, () => console.log('Server listen on port 3000'));