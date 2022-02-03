module.exports = {
  async get(req, res) {
    const id = req.params.id;

    try {
      const [car, accessories] = await Promise.all([
        req.storage.getCarById(id),
        req.accessory.getAllAccessories(),
      ]);

      const existingIds = car.accessories.map(a => a.id.toString());
      const availableAcc = accessories.filter(a => existingIds.includes(a.id.toString()) == false);

      res.render('attachAccessory', { title: 'Attach Accessory', car, accessories: availableAcc });
    } catch (error) {
      res.redirect('404');
    }
  },
  async post(req, res) {
    const carId = req.params.id;
    const accessoryId = req.body.accessory;

    try {
      await req.storage.attachAccessory(carId, accessoryId);

      res.redirect('/');
    } catch (e) {
      console.log('Error attaching accessory');
      console.log(e.message);
      res.redirect('/attach' + carId);
    }
  }
}