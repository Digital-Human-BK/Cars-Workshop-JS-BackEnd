module.exports = {
  registerGet(req, res) {
    res.render('register', { title: 'Register Page' });
  },
  async registerPost(req, res) {
    if(req.body.username == '' || req.body.password == ''){
      return res.redirect('/register');
    }

    if(req.body.password != req.body.repeatPassword){
      return res.redirect('/register');
    }
    try {
      await req.auth.register(req.body.username, req.body.password);
      res.redirect('/');
    } catch (error) {
      console.log(error.message)
      res.redirect('/register');
    }
    
  },
  loginGet(req, res) {
    res.render('login', { title: 'Login Page' });
  },
  loginPost(req, res) {
    console.log(req.body);
    res.redirect('/');
  },
  logoutGet(req, res) {

  }
}