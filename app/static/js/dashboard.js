
Vue.component('dashboard-settings-modal', {
    template: `
    <div id="tokenModal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Generated Token</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Your Generated JSON Web Token is:</p>
                    <figure class="highlight"><span class="jwt-token">{{ token }}</span></figure>
                    <p>This token was generated with the secret "<strong>some-secret</strong>" and the following payload
                        data:</p>
                    <pre>
                <code>
    {
      'sub': '12345',
      'name': 'John Doe'
    }</code>
                </pre>
                    <p><span class="badge badge-danger">Note:</span> Usually the generation of a JWT will be done when a
                        user either registers a new account on your web application or when they login.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data:function(){
      return{
        token:''
      }
    }
});

Vue.component('dashboard-header', {
    template: `
    <section class="agile_stats">
      <div class="container-fluid pt-5">
        <div class="row pt-lg-5 w3-abbottom">
          <div class="col-lg px-sm-5 px-3">
            <div class="col-md-3 pull-left ">
                  <img src="../images/Avatar.png" class="img-fluid" alt="image" />
                </div>
                <div class="stats_agile mb-5">
              <img src="../images/aan.png" alt="Avatar" class="avatar">
              <h3 class="stat-title text-uppercase">Jodn Doe</h3>
              <button id="show-modal" @click="<function>" data-toggle="modal" data-target="#tokenModal"> <i class="fas fa-cog"></i></button>
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
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
      </div>
        
      </div>
    </section>
`,
 data:function(){
  return {}
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
        
      </div>

      </div>
    </section>
   `,
    data: function() {
       return {
        errors:[]
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
    router,
    data:{
      result:'Jwt result will appear here.',
    },
    methods: {
        
        // Remove token stored in localStorage.
        // Usually you will remove it when a user logs out of your web application
        // or if the token has expired.
        removeToken: function () {
            localStorage.removeItem('token');
            console.info('Token removed from localStorage.');
            alert('Token removed!');    
        },
        getSecure: function () {
            let self = this;
            fetch('/api/secure', {
                'headers': {
                    // Try it with the `Basic` schema and you will see it gives an error message.
                    // 'Authorization': 'Basic ' + localStorage.getItem('token')

                    // JWT requires the Authorization schema to be `Bearer` instead of `Basic`
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let alert = document.querySelector('.alert');
                    alert.classList.remove('alert-info', 'alert-danger');
                    alert.classList.add('alert-success');

                    let result = response.data;
                    // successful response
                    self.result = `Congrats! You have now made a successful request with a JSON Web Token. Name is: ${result.user.name}.`;
                })
                .catch(function (error) {
                    let alert = document.querySelector('.alert');
                    alert.classList.remove('alert-info');
                    alert.classList.add('alert-danger');

                    // unsuccessful response (ie. there was an error)
                    self.result = `There was an error. ${error.description}`;
                })
        }
    }
});