
Vue.component('app-header', {
    template: `
        <div class="container">
          <div class="flux"><router-link class="flux" to="/">Photogram</router-link></div>
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
  <div class="agile_ihj">
      <form id="registerform" @submit.prevent="registerform" method="POST" enctype="multipart/form-data" novalidate="true">
      <h2>Join Photogram today</h2>
      <p class="alert alert-danger" role="alert" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

      
        <div class="agileinfo">
          <input type="text" name="first_name" v-model="first_name" id="fname" placeholder="First Name" >
        </div>
        <div class="agileinfo">
          <input type="text" name="last_name" v-model="last_name" id="lname" placeholder="Last Name">
        </div>
        <div class="agileinfo">
          <input type="text" name="username" v-model="username" id="username" placeholder="Username" >
        </div>
        <div class="agileinfo">
          <input type="email" name="email" v-model="email" id="email" placeholder="Email" >
        </div>
        <div class="agileinfo">
          <input type="Password" name="plain_password" v-model="plain_password" id="plain_password" placeholder="Password" >
        </div>
        <div class="agileinfo">
          <input type="password" name="conf_password" v-model="conf_password" id="conf_password" placeholder="Confirm Password" >
        </div>
        <div class="agileinfo">
          <input type="text" name="location" v-model="location" id="location" placeholder="Location" >
        </div>
        <div class="agile_par">
          <p>Already had an Account please <router-link to="/login">Login</router-link></p>
        </div>
        <div class="w3l_but">
          <button type="submit">REGISTER</button>
        </div>
      </form>
      
      <div class="clear"></div>
    </div>

`,
  data: function(){
    return{
      errors:[],
      username:null,
      first_name:null,
      last_name:null,
      email:null,
      plain_password:null,
      conf_password:null,
      location:null
    }
  },
  methods: {
    checkForm:function(e) {
      if(this.first_name && this.last_name && this.location && this.email && this.plain_password && this.conf_password){return true;} 
      this.errors = [];
      if(!this.first_name){this.errors.push("First name required.");}
      if(!this.last_name){this.errors.push("Last name required.");}
      if(!this.email){this.errors.push("Email required.");}
      if(!this.plain_password){this.errors.push("Password required.");}
      if(!this.conf_password){this.errors.push("Confirm your password");}
      if(!this.location){this.errors.push("Location required.");}
      e.preventDefault();
    },
    registerform:function(e) {
      e.preventDefault();
      this.errors = [];
      let self=this;
      
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
          if(jsonResponse.errors) {
            console.log(jsonResponse.errors);
            self.errors.push(jsonResponse.errors);
          }else{

          console.log(jsonResponse.data);
           console.log(jsonResponse.message); 
          self.$router.push('/login');
          };
          
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
});

const Home = Vue.component('home',{
  template:`
      
      <div class="agile_ihj">
        <div class="w3l_but">
          <router-link class="w3l_but" to="/login"><button>Login</button></router-link>
        </div>
        <div class="agile_par">
          <h2>or</h2>
        </div>
        <div class="w3l_but">
          <router-link class="w3l_but" to="/register"><button>Register Now</button></router-link>
        </div>
      
      <div class="clear"></div>
      </div>

`,
  data: function(){
    return{
    }
  }
});

const Login = Vue.component('login',{
  template:`
  <div class="agile_ihj">
      <form id="loginform" @submit.prevent="loginform" method="POST" enctype="multipart/form-data" >
      <h2>Log in to Photogram</h2>
      <p v-if="errors.length">
    <p class="alert alert-danger" role="alert" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
  <p class="alert alert-success" role="alert" v-if="messages.length">
    <ul>
      <li v-for="message in messages">{{ message }}</li>
    </ul>
  </p>
      
       <div class="agileinfo">
          <input type="text" name="username" v-model="username" id="username" placeholder="Username" >
        </div>
       <div class="agileinfo">
          <input type="Password" name="plain_password" v-model="plain_password" id="plain_password" placeholder="Password" >
        </div>
        <div class="agile_par">
          <p>Dont have an Account? <router-link class="nav-link" to="/register">Register Now</router-link></p>
        </div>
        <div class="w3l_but">
          <button type="submit">LOGIN</button>
        </div>
      </form>
      
      <div class="clear"></div>
      </div>
`,
 data:function(){
  return {
    errors:[],
    messages:[],
    username:'',
    plain_password:''
  }
 },
  methods: {
    loginform:function(e) {
      e.preventDefault();
      this.errors = [];
      if(!this.username){this.errors.push("Name required.");}
      if(!this.plain_password){this.errors.push("Password required.");}
      let self=this;
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
          if(jsonResponse.errors) {
            self.errors.push(jsonResponse.errors);
          }else{
          console.log(jsonResponse);
          let token = jsonResponse.data.user_credentials[5];
          let username=jsonResponse.data.user_credentials[0];
          let location=jsonResponse.data.user_credentials[3];
          let firstname=jsonResponse.data.user_credentials[1];
          let lastname=jsonResponse.data.user_credentials[2];
          let joined_on=jsonResponse.data.user_credentials[4];
          let id=jsonResponse.data.user_credentials[6];
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('username',username);
          localStorage.setItem('location',location);
          localStorage.setItem('firstname',firstname);
          localStorage.setItem('lastname',lastname);
          localStorage.setItem('date_joined',joined_on);
          localStorage.setItem('id',id);
          window.location = "/dashboard";
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
    { path: "/", component: Home },
        { path: "/register", component: Register },
        { path: "/login", component : Login}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router,
    data: {
      token:''
    }
});