
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
      <form id="registerform" @submit.prevent="registerform" method="POST" enctype="multipart/form-data">
      <h2>Join Photogram today</h2>
      <div class="agile_ihj">
        <div class="agileinfo">
          <input type="text" name="fname" placeholder="First Name" required="">
        </div>
        <div class="agileinfo">
          <input type="text" name="lname" placeholder="Last Name" required="">
        </div>
        <div class="agileinfo">
          <input type="text" name="username" placeholder="Username" required="">
        </div>
        <div class="agileinfo">
          <input type="email" name="email" placeholder="Email" required="">
        </div>
        <div class="agileinfo">
          <input type="Password" name="plain_password" placeholder="Password" required="">
        </div>
        <div class="agileinfo">
          <input type="password" name="conf_password" placeholder="Confirm Password" required="">
        </div>
        <div class="agileinfo">
          <input type="text" name="location" placeholder="Location" required="">
        </div>
</div>
        <div class="agile_par">
          <p>Already had an Account please <router-link to="/login">Login</router-link></p>
        </div>
        <div class="w3l_but">
          <button type="submit">REGISTER</button>
        </div>
      </form>
      
      <div class="clear"></div>

`,
  data: function(){
    return{
      errors:[],
      username:'',
      fname:'',
      lname:'',
      email:'',
      plain_password:'',
      conf_password:'',
      location:''
    }
  },
  methods: {
    uploadform:function(e) {
      e.preventDefault();
      this.errors = [];
      if(!this.fname){this.errors.push("First name required.");}
      if(!this.lname){this.errors.push("Last name required.");}
      if(!this.email){this.errors.push("Email required.");}
      if(!this.plain_password){this.errors.push("Password required.");}
      if(!this.conf_password){this.errors.push("Confirm your password");}
      if(!this.location){this.errors.push("Location required.");}
      
      let uploadForm = document.getElementById('registerform');
      let form_data = new FormData(uploadForm);
      fetch('/api/users/register', {
        method: 'POST',
        body: form_data,
        headers: { 
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
        .then(function (response) {
          if (!response.ok) {
    throw Error(response.statusText);
  }
     return response.json();
        })
        .then(function (jsonResponse) {
          if(jsonResponse.error) {
            this.errors.push(jsonResponse.error);
          }else{
            alert("Successfully Registered");

          console.log(jsonResponse);
          }
          
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
});

const Login = Vue.component('login',{
  template:`
      <form id="loginform" @submit.prevent="loginform" method="POST" enctype="multipart/form-data" >
      <h2>Log in to Photogram</h2>
      <div class="agile_ihj">
        <div class="agileinfo">
          <input type="text" name="username" placeholder="Username" required="">
        </div>
        <div class="agileinfo">
          <input type="Password" name="password" placeholder="Password" required="">
        </div>
        <div class="agile_par">
          <p>Dont have an Account? <router-link class="nav-link" to="/register">Register Now</router-link></p>
        </div>
        <div class="w3l_but">
          <button type="submit">LOGIN</button>
        </div>
      </form>
      
      <div class="clear"></div>
`,
 data:function(){
  return {
    errors:[],
    username:'',
    password:''
  }
 },
  methods: {
    loginform:function(e) {
      e.preventDefault();
      this.errors = [];
      if(!this.username){this.errors.push("Name required.");}
      if(!this.password){this.errors.push("Password required.");}
      
      let loginForm = document.getElementById('loginform');
      let form_data = new FormData(loginForm);
      fetch('/api/auth/login', {
        method: 'POST',
        body: form_data,
        headers: { 
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
        .then(function (response) {
          if (!response.ok) {
    throw Error(response.statusText);
  }
     return response.json();
        })
        .then(function (jsonResponse) {
          if(jsonResponse.error) {
            this.errors.push(jsonResponse.error);
          }else{
            alert("Successfully uploaded");

          console.log(jsonResponse);
          }
          
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
});


// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Register },
        { path: "/api/auth/login", component : Login}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});