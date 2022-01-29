const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
  try {
    const file = await fs.readFile(filePath);
    return JSON.parse(file);
  } catch (error) {
    console.error('Database read error');
    console.log(error);
    process.exit(1);
  }

}

async function write(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Database write error');
    console.log(error);
    process.exit(1);
  }
}

async function getAll(query) {
  const data = await read();

  let cars =  Object
    .entries(data)
    .map(([id, value]) => Object.assign({}, value, { id }));

  if(query.search) {
    cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
  }
  if(query.from) {
    cars = cars.filter(c => c.price >= Number(query.from));
  }
  if(query.to) {
    cars = cars.filter(c => c.price <= Number(query.to));
  }

  return cars;  
}

async function getCarById(id) {
  const data = await read();
  const car = data[id];

  if (car) {
    return Object.assign({}, { id }, car);
  } else {
    return undefined;
  }
}

async function createCar(car) {
  const cars = await read();

  let id;

  do {
    id = nextId();
  } while (cars.hasOwnProperty(id));

  cars[id] = car;

  await write(cars);  
}

function nextId() {
  return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

module.exports = () => (req, res, next) => {
  req.storage = {
    getAll,
    getCarById,
    createCar
  }
  next();
}

