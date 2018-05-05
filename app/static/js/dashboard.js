
Vue.component('dashboard-header', {
    template: `
    <section class="agile_stats">
      <div class="container-fluid pt-5">
        <div class="row pt-lg-5 w3-abbottom">
          <div class="col-lg px-sm-5 px-3">
                <div class="stats_agile mb-5">
              <img :src="photo" alt="Avatar" class="avatar">
              <h3 class="stat-title text-uppercase">@{{user_name}}</h3>
              <p >Date Joined:{{joined_on}}</p>
              <p >Location: {{location}}</p>
            
              <button id="show-modal" @click="logout" > <i class="fas fa-cog"></i> Logout</button>
              <span class="w3-line"></span>
              <p class="mt-3">Bio: Donec consequat sapien ut leo cursus rhoncus. Nullam dui mi, vulputate ac metus at, semper varius orci. Nulla accumsan
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
        errors:[],
        messages:[],
        user_name:'',
        first_name:'',
        last_name:'',
        location:'',
        photo:'',
        joined_on:'',
        posts:'',
        followers:'',
        following:'',
        bio:''
        
      }
    },
    created: function() {
        let self = this;
        if (localStorage.getItem('photo')){
            self.photo=localStorage.getItem('photo');
        }else{
          self.photo="https://img00.deviantart.net/6093/i/2013/104/8/6/the_legend_of_aang__aang_portrait_by_dejakob-d61o0wy.png"
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
                         window.location = "/";
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }    
    }
});


Vue.component('dashboard-nav', {
    template: `
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group" role="group" aria-label="First group">
  <router-link class="btn btn-secondary" to="/upload">Upload</router-link>
  <router-link class="btn btn-secondary" to="/">Explore(ALL)</router-link>
  <router-link class="btn btn-secondary" to="/profile">My Posts</router-link>
  <router-link class="btn btn-secondary" to="/following">Following</router-link>
  <router-link class="btn btn-secondary" to="/likes">Liked</router-link>
  </div>
  <div class="input-group">
  <router-link class="btn btn-secondary" to="/search">Search</router-link>
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
   
          <a href="#">
                <div class="col-lg-4">
                    <div class="card">
                        <img :src="photo" alt="photo">
                        <p><i class="fa fa-calendar"></i> Posted on {{date_post}} by @{{username}}</p>
                        <p><i class="fa fa-tags"></i> Tags: <a href=""><span class="badge badge-info">Bootstrap</span></a> <a href=""><span class="badge badge-info">Web</span></a> <a href=""><span class="badge badge-info">CSS</span></a> <a href=""><span class="badge badge-info">HTML</span></a></p>
        
                        <p>{{caption}}</p>
                        <p><i class="far fa-thumbs-up"></i>{{likes}}</p>
                    </div>
                </div>
            </a>
    `,props:['id','username','likes','date_post','tags','caption',"photo"]
});

const Timeline = Vue.component('timeline',{
  template:`
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <card  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title" 
  v-bind:caption="post.caption"
  v-bind:likes="post.likes"
  v-bind:date_post="post.date_post"
  v-bind:photo="post.photo"
  v-bind:username="post.username"></card>

        
      </div>
    </section>
`,
 data:function(){
  return {
     posts: [
      { id: 1, title: 'My journey with Vue',caption:'It is so easy',likes:58,date_post:'Feb 2018',photo:'https://vuejs.org/images/logo.png' ,username:'__me__'},
      { id: 2, title: 'Blogging with Vue',caption:'-No caption-',likes:79,date_post:'Apr 2018',photo:'https://www.hover.com/blog/wp-content/uploads/2014/04/blog-button.png' ,username:'__me__'},
      { id: 3, title: 'Why Vue is so fun',caption:'You just plug and go',likes:79,date_post:'Mar 2018',photo:'https://react-etc.net/files/2015-11/danguu.jpg' ,username:'__me__'} 
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
     <p class="alert alert-success" role="alert" v-if="messages.length">
    <ul>
      <li v-for="message in messages">{{ message }}</li>
    </ul>
  </p>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
        <form id="uploadForm"  @submit.prevent="uploadPost" method="POST" enctype="multipart/form-data">
                <label class="input-group lead" for="photo">Upload photo</label>
                <input  v-on:change="onSelectedFile" class="form-control" id="file"  type="file" accept="image/*" :name="photo"/>
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
        messages:[],
        caption:'',
        photo:null
       }
    },methods: {
      onSelectedFile: function(event){
        let self=this;
        self.photo=event.target.files[0]
      },
      
        uploadPost: function () {
            let self = this;
            self.errors = [];
          if(!self.photo){self.errors.push("Photo required.");}

        let form_data = new FormData();
        form_data.append('photo',self.photo,self.photo.name);
        form_data.append('caption',self.caption);
            fetch("/api/posts/new", { 
            method: 'POST',
            body: form_data,
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
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
            if(jsonResponse.messages) {
            self.messages.push(jsonResponse.messages);
          }
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
        <div class="justify-content-center">
        <card  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title" 
  v-bind:caption="post.caption"
  v-bind:likes="post.likes"
  v-bind:date_post="post.date_post"
  v-bind:photo="post.photo"
  v-bind:username="post.username"></card>
      </div>

      </div>
    </section>
   `,
    data: function() {
       return {
         posts: [
      { id: 1, title: 'My journey with Vue',caption:'It is so easy',likes:58,date_post:'Feb 2018',photo:'https://vuejs.org/images/logo.png' ,username:'__me__'}
      ]
       }
    }
});

const Following = Vue.component('following', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="justify-content-center">
        <card  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title" 
  v-bind:caption="post.caption"
  v-bind:likes="post.likes"
  v-bind:date_post="post.date_post"
  v-bind:photo="post.photo"
  v-bind:username="post.username"></card>
      </div>

      </div>
    </section>
   `,
    data: function() {
       return {
         posts: [
      { id: 1, title: 'My journey with Vue',caption:'It is so easy',likes:58,date_post:'Feb 2018',photo:'https://vuejs.org/images/logo.png' ,username:'__me__'}
      ]
       }
    }
});

const Profile = Vue.component('profile', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="justify-content-center">
        <card  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title" 
  v-bind:caption="post.caption"
  v-bind:likes="post.likes"
  v-bind:date_post="post.date_post"
  v-bind:photo="post.photo"
  v-bind:username="post.username"></card>
      </div>
      </div>
    </section>
   `,
    data: function() {
       return {
         posts: [
      { id: 1, title: 'My journey with Vue',caption:'It is so easy',likes:58,date_post:'Feb 2018',photo:'https://vuejs.org/images/logo.png' ,username:'__me__'},
      { id: 3, title: 'Why Vue is so fun',caption:'You just plug and go',likes:79,date_post:'Mar 2018',photo:'https://react-etc.net/files/2015-11/danguu.jpg' ,username:'__me__'} 
    ]
       }
    }
});

const Search = Vue.component('search', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
      <h2>Search profile and/or posts</h2>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
         <p class="alert alert-success" role="alert" v-if="messages.length">
    <ul>
      <li v-for="message in messages">{{ message }}</li>
    </ul>
  </p>
        
            <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="search.." />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </span>
                </div>
           
  </div>
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
        { path: "/", component: Timeline },
        { path: "/search", component: Search },
        { path: "/profile", component: Profile },
        { path: "/likes", component: Likes },
        { path: "/upload", component: Upload },
        { path: "/following", component: Following}
    ]
});

// Instantiate our main Vue Instance
let dashboard = new Vue({
    el: "#photogram",
    router
});