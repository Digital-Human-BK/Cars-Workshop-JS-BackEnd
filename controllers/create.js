module.exports = {
  get(req, res) {
    res.locals = {
      title: 'Create Listing'
    }
    res.render('create');
  },
  async post(req, res) {
    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl || undefined,
      price: Number(req.body.price)
    }
    try {
      await req.storage.createCar(car);
      res.redirect('/');
    } catch (error) {
      console.log('Error creating record. Name field reqired');
      res.redirect('/');
    }
  }
};