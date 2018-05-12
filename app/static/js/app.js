
Vue.component('app-header', {
    template: `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand">Photogram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore<span class="sr-only">(current)</span></router-link>
          </li>
           <li class="nav-item active">
            <router-link class="nav-link" to="/users/0">Profile<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
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
          <input type="text" name="firstname" id="fname" placeholder="First Name" >
        </div>
        <div class="agileinfo">
          <input type="text" name="lastname" id="lname" placeholder="Last Name">
        </div>
        <div class="agileinfo">
          <input type="text" name="username" id="username" placeholder="Username" >
        </div>
        <div class="agileinfo">
          <input type="email" name="email" id="email" placeholder="Email" >
        </div>
        <div class="agileinfo">
          <input type="password" name="password" id="password" placeholder="password" >
        </div>
        <div class="agileinfo">
          <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" >
        </div>
        <div class="agileinfo">
          <input type="text" name="location"  id="location" placeholder="Location" >
        </div>
        <div class="agileinfo">
          <input type="textarea" name="biography" id="biography" placeholder="Biography" >
        </div>
         <div class="agileinfo">
          <input type="file" name="profile_photo" id="profile_photo" placeholder="Photo" >
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

`,data:function(){
  return {
    errors:[],
  }
},
  methods: {
    
        registerform: function(){
            let registerform = document.getElementById('registerform');
            let form_data = new FormData(registerform);
            fetch("/api/users/register", { 
                method: 'POST', 
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
              console.log(jsonResponse)
                if(jsonResponse.errors){
                    self.errors = jsonResponse.errors;
                }
                else{
                    
                }
                
                
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
          <input type="text" name="username" id="username" placeholder="Username" >
        </div>
       <div class="agileinfo">
          <input type="Password" name="password" id="plain_password" placeholder="Password" >
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
  }
 },
  methods: {
      loginform: function(){
          let loginform = document.getElementById('loginform');
          let form_data = new FormData(loginform);
          fetch("/api/auth/login", { 
              method: 'POST', 
              body: form_data,
              headers: {
                  'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
          .then(function (response) {
              return response.json();
          })
          .then(function (jsonResponse) {
              if(jsonResponse.errors){
                  self.errors = jsonResponse.errors;
              }
              else{
                  localStorage.setItem('token', jsonResponse.response["0"].token);
                  localStorage.setItem('userid',jsonResponse.response["0"].userid);
                  alert("User login successful");
                  self.$router.push({path:`/users/${localStorage.getItem('userid')}`})
              }
              
              
          })
          .catch(function (error) {
              console.log(error);
          });
      }
    }
});

const Logout= Vue.component('logout',{
  template:`
          <div>
          <p> Are you sure you want to logout?</p>
          <button v-on:click="logout()">Logout</button>
          </div>
  `,
  data:function(){
    return {
      message:'',
    }
  },methods:{
      logout:function(){
        fetch("/api/auth/logout", { 
          method: 'GET', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            console.log(jsonResponse);
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            self.$router.push('/');
            
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    }
});

const Explorer=Vue.component('explore',{
  template:`
  <div>
    <div v-for="post in posts">
      <div>
        <p>{{post.username}}</p>
      </div>
      <div id="likebutton">
          <button v-on:click="tolike(post.post_id)">Like</button>
      </div>
    </div>
  </div>
  
  `,created:function(){
      let self=this;
      fetch("/api/posts", { 
          method: 'GET', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            self.posts=jsonResponse.response.posts;
            console.log(self.posts);
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  data:function(){
    return {
      posts:[]
    }
  },methods:{
    tolike:function(postid){
      let self=this
      fetch("/api/posts/"+postid+"/tolike", { 
          method: 'GET', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if (jsonResponse.response==true){
              self.unlike(postid);
            }
            else{
              self.like(postid);
              
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    
    like(postid){
      fetch("/api/posts/"+postid+"/like", { 
          method: 'POST', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            console.log(jsonResponse.response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    unlike(postid){
      fetch("/api/posts/"+postid+"/unlike", { 
          method: 'POST', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            console.log(jsonResponse);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
  }
});

const UserProfile=Vue.component('userprofile',{
  template:`
  <div>Users
  <div>
    <button v-on:click="tofollow(userinfo.userid)"><span id="followbutton" v-if="following==true">Follow</span>
    <span id="unfollowbutton" v-else>Unfollow</span></button>
  </div>
  </div>
  `,
  created:function(){
      let self=this;
      fetch("/api/"+this.$route.params.user_id+"/newpost", { 
          method: 'GET', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            self.posts=jsonResponse.response.userposts;
            self.userinfo=jsonResponse.response.userinfo;
            self.numposts=jsonResponse.response.numposts;
            self.numfollowers=jsonResponse.response.followers;
            self.following=jsonResponse.response.following;
            console.log(jsonResponse);
            console.log(self.userinfo);
        })
        .catch(function (error) {
            console.log(error);
        });
    
  },
  data:function(){
    return{
    userinfo:{},
    userposts:[],
    numposts:0,
    numfollowers:0,
    following:'',
    }
  },
  methods:{
    tofollow:function(userid){
      let self=this
      fetch("/api/users/"+userid+"/tofollow", { 
          method: 'GET', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if (jsonResponse.response==true){
              self.unfollow(userid);
            }
            else{
              self.follow(userid);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    
    follow(userid){
      fetch("/api/users/"+userid+"/follow", { 
          method: 'POST', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if(document.getElementById('followbutton')){
              document.getElementById("followbutton").innerHTML="Unfollow"; 
            }
            else{
              document.getElementById("unfollowbutton").innerHTML="Unfollow";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    unfollow(userid){
      fetch("/api/users/"+userid+"/unfollow", { 
          method: 'POST', 
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if(document.getElementById('followbutton')){
              document.getElementById("followbutton").innerHTML="Follow"; 
            }
            else{
              document.getElementById("unfollowbutton").innerHTML="Follow";
            }
            console.log(jsonResponse);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
  }
})

const Addpost=Vue.component('addpost',{
  template:`<form id="postform"  @submit.prevent="uploadPost" method="POST" enctype="multipart/form-data">
                <input class="form-control-file" type="file"  name="photo"/>
                <br>
                <br>
                <label for="desc">Caption:</label>
                <br>
                <textarea class="form-control" rows="3" id="caption" name="caption"></textarea>
                <br><br>
                <button class="btn btn-primary" type="submit">Upload</button>
            </form>`,
  data:function(){
    return{
      messages:[],
      errors:[]
      
    }
  },
  methods:{
    addpost:function(){
      let self=this;
      let postform = document.getElementById('postform');
      let form_data = new FormData(postform);
      fetch("/api/"+localStorage.getItem('userid')+"/newpost", { 
          method: 'POST',
          body: form_data,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if(jsonResponse.response){
              self.messages=jsonResponse.response;
            }else{
              self.errors=jsonResponse.errors;
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
})
// Define Routes
const router = new VueRouter({
    routes: [
    { path:"/", component: Home },
    { path:"/login", component: Login },
    { path:"/register", component : Register},
    { path:"/explore",component:Explorer},
    { path:"/users/:user_id",component:UserProfile},
    { path:"/postnew", component:Addpost},
    { path:"/logout",component:Logout}]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});