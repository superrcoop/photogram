
Vue.component('app-header', {
    template: `
        <div class="container">
          <div class="flux">Photogram </div>
        </div>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
      <div class="footer">
        <p>&copy; Photogram 2018. All Rights Reserved </p>
      </div>
    </footer>
    `
});
const Register = Vue.component('registration',{
  template:`
      <form action="#" method="post">
      <h2>Join Photogram today</h2>
      <div class="agile_ihj">
        <div class="agileinfo">
          <input type="text" name="name" placeholder="First Name" required="">
        </div>
        <div class="agileinfo">
          <input type="text" name="name" placeholder="Last Name" required="">
        </div>
        <div class="agileinfo">
          <input type="text" name="username" placeholder="Username" required="">
        </div>
        <div class="agileinfo">
          <input type="email" name="email" placeholder="Email" required="">
        </div>
        <div class="agileinfo">
          <input type="Password" name="password" placeholder="Password" required="">
        </div>
        <div class="agileinfo">
          <input type="password" name="password" placeholder="Confirm Password" required="">
        </div>
        <div class="agileinfo">
          <input type="text" name="location" placeholder="Location" required="">
        </div>
        <div id="drop">
        Upload Profile Photo

        <a>Browse</a>
        <input type="file" name="upl"  />
      </div>

      <ul>
        <!-- The file uploads will be shown here -->
      </ul>
        <div class="agile_par">
          <p>Already had an Account please <router-link to="/login">Login</router-link></p>
        </div>
        <div class="w3l_but">
          <button type="submit">REGISTER</button>
        </div>
      </form>
      
      <div class="clear"></div>
`,
 data:function(){
  return {}
 }
});

const Login = Vue.component('login',{
  template:`
      <form action="#" method="post">
      <h2>Log in to Photogram</h2>
      <div class="agile_ihj">
        <div class="agileinfo">
          <input type="text" name="name" placeholder="First Name" required="">
        </div>
        <div class="agileinfo">
          <input type="Password" name="password" placeholder="Password" required="">
        </div>
        <div class="agile_par">
          <p>Dont have an Account? <router-link class="nav-link" to="/">Register Now</router-link></p>
        </div>
        <div class="w3l_but">
          <button type="submit">LOGIN</button>
        </div>
      </form>
      
      <div class="clear"></div>
`,
 data:function(){
  return {}
 }
});


// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Register },
        { path: "/login", component : Login}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});