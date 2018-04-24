/*
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

 */
Vue.component('app-header', {
    template: `
      <div class="wrapper">
        <div class="floater"> 
          <div class="text">Photogram<i class="fas fa-camera"></i></div>
        </div>
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
const Login = Vue.component('registration',{
  template:`
    <div class="container">
      
    </div>
`,
 data:function(){
  return {}
 }
});



const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Photogram Web Application</h1>
        <p class="lead">
You should be able to register for an account on our Photogram web application.
 Once a user has an account, they should be able to login and upload photos to 
 their Photogram feed. Each photo, should have an image and a caption. A user 
 should also be able to "Like" another users posts and also follow a user.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/bhj", component: Home }
    ]
});

// Instantiate our main Vue Instance
let dashboard = new Vue({
    el: "#dashboard",
    router
});