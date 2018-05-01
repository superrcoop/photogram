
Vue.component('dashboard-header', {
    template: `
    <section class="agile_stats">
      <div class="container-fluid pt-5">
        <div class="row pt-lg-5 w3-abbottom">
          <div class="col-lg px-sm-5 px-3">
                <div class="stats_agile mb-5">
              <img :src="photo" alt="Avatar" class="avatar">
              <h3 class="stat-title text-uppercase">{{first_name}}{{last_name}}</h3>
              <p >Date Joined:{{joined_on}}</p>
              <p >Location: {{location}}</p>
            
              <button id="show-modal" @click="logout" > <i class="fas fa-cog"></i> Logout</button>
              <span class="w3-line"></span>
              <p class="mt-3">Donec consequat sapien ut leo cursus rhoncus. Nullam dui mi, vulputate ac metus at, semper varius orci. Nulla accumsan
                ac elit in congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            
            </div>
            <div class="row">
            <div class="counter col-4">
            <i class="far fa-newspaper fa-2x"></i>
                <div class="timer count-title count-number mt-2" data-to="184" data-speed="500"></div>
                <p class="count-text text-capitalize">Posts</p>
              </div>
              <div class="counter col-4">
                <i class="fas fa-users fa-2x"></i>
                <div class="timer count-title count-number mt-2" data-to="500" data-speed="100"></div>
                <p class="count-text text-capitalize">Followers</p>
              </div>

              <div class="counter col-4 ">
                <i class="fas fa-users fa-2x"></i>
                <div class="timer count-title count-number mt-2" data-to="783" data-speed="100"></div>
                <p class="count-text text-capitalize">Following</p>
              </div>

              
            </div>
          </div>
          
        </div>

      </div>

    </section>
    `,
    data:function(){
      return{
        user_name:'',
        first_name:'',
        last_name:'',
        location:'',
        photo:'',
        joined_on:'',
        posts:'',
        followers:'',
        following:''
        
      }
    },
    created: function() {
        let self = this;
        if (localStorage.getItem('photo')){
            self.photo=localStorage.getItem('photo');
        }else{
          self.photo="../images/aan.png"
        };
          self.user_name=localStorage.getItem('username');
          self.location=localStorage.getItem('location');
          self.first_name=localStorage.getItem('firsname');
          self.last_name=localStorage.getItem('lastname');
          self.joined_on=localStorage.getItem('date_joined');
    },
    methods:{
      logout: function(){
        if (localStorage.getItem('jwt_token')!==null){
            let self = this;
            self.token=localStorage.getItem('jwt_token');
            fetch("/api/auth/logout", { 
                method: 'GET',
                headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                    },
                credentials: 'same-origin'
                
                })
                .then(function (response) {

              if (!response.ok) {
          throw Error(response.statusText);

               };
              return response.json();
        })
        .then(function (jsonResponse) {
          if(jsonResponse.errors) {
            self.errors.push(jsonResponse.errors);
          }else{
                       localStorage.clear();
                       self.removeToken();
                         window.location = "/";
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        // Remove token stored in localStorage.
        // Usually you will remove it when a user logs out of your web application
        // or if the token has expired.
        removeToken: function () {
            localStorage.removeItem('jwt_token');
            console.info('Token removed from localStorage.');
            alert('Token removed!');  
            }    
    }
});


Vue.component('dashboard-nav', {
    template: `
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group" role="group" aria-label="First group">
  <router-link class="btn btn-secondary" to="/upload">Upload</router-link>
  <router-link class="btn btn-secondary" to="/timeline">Explore(ALL)</router-link>
  <router-link class="btn btn-secondary" to="/profile">My Posts</router-link>
  <router-link class="btn btn-secondary" to="/following">Following</router-link>
  <router-link class="btn btn-secondary" to="/likes">Liked</router-link>
  </div>
  <div class="input-group">
  <button type="button" class="btn btn-secondary input-group-addon" id="btnGroupAddon2">Search</button>
    <input type="text" class="form-control" placeholder="Search profile,posts,etc.." aria-describedby="btnGroupAddon2">
  </div>
</div>
    `
});



Vue.component('dashboard-footer', {
    template: `
    <footer>
    <div class="serv_bottom py-5">
      <div class="container py-sm-3">
        <hr>
        <h5 class="text-center text-uppercase text-white pt-4"><p>&copy; Photogram 2018. All Rights Reserved </p></h5>
      </div>
    </div>
    </footer>
    `
});

Vue.component('card', {
    template: `
    <div class="card col-lg-3 col-md-6 border-0 mt-md-0 mt-5">
            <img class="card-img-top" src="../images/g3.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">custom menus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
    `
});

const Timeline = Vue.component('timeline',{
  template:`
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
      <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
        <card  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"></card>
        <card></card>

      </div>
        
      </div>
    </section>
`,
 data:function(){
  return {
     posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' },
    ]
  }
 }
});

const Upload = Vue.component('upload', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
        <form id="uploadform"  @submit.prevent="uploadPost" method="POST" enctype="multipart/form-data">
                <label for="photo">Upload photo</label>
                <input class="form-control" id="file"  type="file" name="photo"/>
                <br>
                <br>
                <label class="input-group lead" for="caption">Caption</label>
                <textarea class="form-control" rows="3"  v-model="caption" placeholder="Write a caption..." id="caption" name="caption"></textarea>
                <br><br>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
      </div>

      </div>
    </section>
   `,
    data: function() {
       return {
        errors:[],
        caption:'',
        photo:null
       }
    },methods: {
        uploadPost: function () {
            let self = this;
            this.errors = [];
          if(!this.photo){this.errors.push("Photo required.");}
            let uploadForm = document.getElementById('uploadform');
            let form_data = new FormData(uploadForm);
            fetch("/api/"+localStorage.getItem('id')+"/newpost", { 
            method: 'POST',
            body: form_data,
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
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

const Likes = Vue.component('likes', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
        <card></card>
        <card></card>
      </div>

      </div>
    </section>
   `,
    data: function() {
       return {}
    }
});

const Profile = Vue.component('profile', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
        <card></card>
        <card></card>
        <card></card>
        <card></card>
      </div>
      </div>
    </section>
   `,
    data: function() {
       return {}
    }
});

const Search = Vue.component('search', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
        <card></card>
      </div>
      </div>
    </section>
   `,
    data: function() {
       return {}
    }
});
// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/timeline", component: Timeline },
        { path: "/search", component: Search },
        { path: "/profile", component: Profile },
        { path: "/likes", component: Likes },
        { path: "/upload", component: Upload }
    ]
});

// Instantiate our main Vue Instance
let dashboard = new Vue({
    el: "#photogram",
    router
});