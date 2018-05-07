
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

               }
              return response.json();
        })
        .then(function (jsonResponse) {
          if(jsonResponse.errors) {
            self.errors.push(jsonResponse.errors);
          }else{
                       localStorage.clear();
                         window.location = "/";
                    }
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
   
                <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                <div class="card card-inverse card-info">
                    <a href=""><img class="card-img-top" src="http://2018.cedesc.com.br/assets/uploads/thumb-default.png"></a>
                    <div class="card-block">
                        <figure class="profile profile-inline">
                            <img src="http://success-at-work.com/wp-content/uploads/2015/04/free-stock-photos.gif" class="profile-avatar" alt="">
                        </figure>
                        <h4 class="card-title">@{{username}}</h4>
                        <p><i class="fa fa-tags"></i> Tags: <a href=""><span class="badge badge-info">#waves</span></a> <a href=""><span class="badge badge-info">#CSS</span></a> <a href=""><span class="badge badge-info">#Vue.js</span></a></p>
        
                        <div class="card-text">
                            {{caption}}
                        </div>
                    </div>
                    <div class="card-footer">
                        <small>Posted: {{date_post}}</small>
                        <p v-if="isLiked">
    <button @click="unlike" class="float-right far fa-thumbs-down">{{likes}}</button>
    </p>
     <p v-else>
    <a @click=like" class="float-right far fa-thumbs-up"> {{likes}}</a>
    </p>
    <p v-if="this.username===this.user">
    <button @click="delete_post" class="fas fa-trash-alt float-right"></button>
    </p>
                    </div>
                </div>
            </div>
    `,props:['id','username','likes','date_post','tags','caption',"photo","liked"],
    data:function(){
      return {
        isLiked:this.liked,
        user:localStorage.getItem('username'),
        post_id:this.id
      }
    }
    ,methods:{
      delete_post:function(){
        let self= this;
                var payload = {
                post_id: self.id,
              username:self.username
              };

              var data = new FormData();
            data.append( "json", JSON.stringify( payload ) );
            console.log(payload,data);
                fetch("/api/posts/delete", { 
                    method: 'POST',
                    body:payload,
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
                      console.log(jsonResponse);
                      console.log("Deleted");
                    }
                 })
               .catch(function (error) {
                        console.log(error);
                    });
      },
            like:function(){
                let self= this;
                var payload = {
                post_id: this.id,
              username:this.username
              };

              var data = new FormData();
            data.append( "json", JSON.stringify( payload ) );
            console.log(payload,data);
                fetch("/api/posts/like", { 
                    method: 'POST',
                    body:payload,
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
                      
                     
                      self.likes+=1;
                      console.log("Posts Liked");
                    }
                 })
               .catch(function (error) {
                        console.log(error);
                    });
            },unlike:function(){
                let self= this;
                var payload = {
                post_id: this.id,
              username:this.username
              };

              var data = new FormData();
            data.append( "json", JSON.stringify( payload ) );
            console.log(payload,data);
                fetch("/api/posts/unlike", { 
                    method: 'POST',
                    body:payload,
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
                self.likes-=1;
                console.log("Unliked");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
    }
});

const Timeline = Vue.component('timeline',{
  template:`
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
      <div class="row">
        <card  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title" 
  v-bind:caption="post.caption"
  v-bind:liked="post.liked"
  v-bind:likes="post.likes"
  v-bind:date_post="post.date_post"
  v-bind:photo="post.photo"
  v-bind:username="post.username"></card>
</div>
        
      </div>
    </section>
`,
 data:function(){
  return {
     posts: []
  }
 },
 created: function () {
            let self = this;
            if(localStorage.getItem('jwt_token')!==null){
                fetch("/api/posts/all", { 
                method: 'GET',
                headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
                        'X-CSRFToken': token
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
                    self.posts=jsonResponse.posts;
                    console.log(self.posts);
                  }
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                <input ref="fileInput" style="display:none" v-on:change="onSelectedFile" class="form-control" id="file"  type="file" accept="image/*" :name="photo"/>
                <br>
                <a class="btn btn-secondary" @click="$refs.fileInput.click()">Select file</a>
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
            let form_data = new FormData();

          if(self.photo){form_data.append('photo',self.photo);}
        
        
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
  v-bind:liked="post.liked"
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
      { id: 1, title: 'My journey with Vue',caption:'It is so easy',liked:false,likes:58,date_post:'Feb 2018',photo:'https://vuejs.org/images/logo.png' ,username:'__me__'}
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
      { id: 1, title: 'My journey with Vue',caption:'It is so easy',liked:false,likes:58,date_post:'Feb 2018',photo:'https://vuejs.org/images/logo.png' ,username:'__me__'}
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
       return {
        errors:[],
        messages:[]
       }
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