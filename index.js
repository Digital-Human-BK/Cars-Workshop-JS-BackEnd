// TO DO LIST
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
// v1.1
// [x] accessory read
// [x] accessory create
// [x] accessory attach
// --> implrement controllers
// [x] home(catalog)
// [x] about
// [x] details
// [x] create
// [x] edit
// [x] delete
// [x] improved home (search)
// v1.1
// [x] create accessory
// [x] attach accessory to car
// [x] update details to include accessory
// --> database
// [x] add database connection
// [x] create Car model
// [x] upgrade car service to use Car model
// [x] add validation rules to Car model
//  v1.1
// [x] create Accessory model

//imports
// -- third party modules
const express = require('express');
const hbs = require('express-handlebars');

// -- local modules
const initDb = require('./models/index');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');

// --- actions
const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const create = require('./controllers/create');
const del = require('./controllers/delete');
const edit = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attachAccessory = require('./controllers/attachAccessory');
const { notFound } = require('./controllers/notFound');

start();

//app config
async function start() {
  await initDb();

  const app = express();

  app.engine('.hbs', hbs.create({
    extname: '.hbs'
  }).engine);
  app.set('view engine', '.hbs');

  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('static'));


  // data service
  app.use(carsService());
  app.use(accessoryService());

  //route controllers
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

  app.route('/accessory')
    .get(accessory.get)
    .post(accessory.post);

  app.route('/attach/:id')
    .get(attachAccessory.get)
    .post(attachAccessory.post);

  app.all('*', notFound);

  app.listen(3000, () => console.log('Server listen on port 3000'));
}