module.exports = {
  async details(req, res) {
    const id = req.params.id;
    const car = await req.storage.getCarById(id);

    if (car) {
      res.locals = {
        title: `CarZone | ${car.name}`,
        car
      }
      res.render('details');
    } else {
      res.redirect('/404')
    }
  }
};