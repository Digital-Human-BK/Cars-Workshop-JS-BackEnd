module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await req.storage.getCarById(id);

    res.locals = {
      title: `Edit | ${car.name}`,
      car
    }
    if (car) {
      res.render('edit');
    } else {
      res.redirect('/404');
    }
  },
  async post(req, res) {
    const id = req.params.id;

    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl || undefined,
      price: Number(req.body.price)
    }
    
    try {
      await req.storage.updateCarById(id, car);
      res.redirect('/');
    } catch (error) {
      console.log(error.message);
      res.redirect('/404');
    }
  }
}