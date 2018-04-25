
Vue.component('side-nav', {
    template: `
    <aside class="sidebar-left">
                <div class="container">
                    <div class="flux">Photogram </div>
                </div>
                <ul class="sidebar-menu">
                    <li class="treeview active">
                        <a href="index.html">
                            <i class="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a href="about.html">
                            <i class="fas fa-info"></i>
                            <span>Upload</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a href="services.html">
                            <i class="fab fa-servicestack"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a href="portfolio.html">
                            <i class="fab fa-buromobelexperte"></i>
                            <span>Search</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a href="portfolio.html">
                            <i class="fab fa-buromobelexperte"></i>
                            <span>Likes</span>
                        </a>
                    </li>
                </ul>
                <button type="button" class="btn btn-info btn-lg btn-block mt-5 w3ls-btn p-1 text-uppercase font-weight-bold" data-toggle="modal"
                    aria-pressed="false" data-target="#exampleModal">
                    Logout
                </button>
            </aside>
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

Vue.component('card', {
    template: `
    <div class="card col-lg-3 col-md-6 border-0 mt-md-0 mt-5">
            <img class="card-img-top" src="images/a2.jpg " alt="Card image cap ">
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
        <div class="py-lg-5 py-3 bg-pricemain text-center">
          <h3 class="agile-title text-uppercase">about us</h3>
          <span class="w3-line"></span>
        </div>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
          <div class="card col-lg-3 col-md-6 border-0">
            <div class="card-body bg-light">
              <div class="card-img-top pt-3">
                <h5 class=" card-title">day trading</h5>
              </div>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top" src="images/a1.png" alt="Card image cap">
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 ">
            <img class="card-img-top " src="images/a3.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">user friendly</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 text-right">
            <div class="card-body bg-light">
              <h5 class="card-title  pt-3">annual bonus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top " src="images/a4.png " alt="Card image cap ">
          </div>
        </div>
      </div>
    </section>
`,
 data:function(){
  return {}
 }
});



const Likes = Vue.component('Likes', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="py-lg-5 py-3 bg-pricemain text-center">
          <h3 class="agile-title text-uppercase">about us</h3>
          <span class="w3-line"></span>
        </div>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
          <div class="card col-lg-3 col-md-6 border-0">
            <div class="card-body bg-light">
              <div class="card-img-top pt-3">
                <h5 class=" card-title">day trading</h5>
              </div>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top" src="images/a1.png" alt="Card image cap">
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-md-0 mt-5">
            <img class="card-img-top" src="images/a2.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">custom menus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 ">
            <img class="card-img-top " src="images/a3.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">user friendly</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 text-right">
            <div class="card-body bg-light">
              <h5 class="card-title  pt-3">annual bonus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top " src="images/a4.png " alt="Card image cap ">
          </div>
        </div>
      </div>
    </section>
   `,
    data: function() {
       return {}
    }
});

const Profile = Vue.component('Profile', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="py-lg-5 py-3 bg-pricemain text-center">
          <h3 class="agile-title text-uppercase">about us</h3>
          <span class="w3-line"></span>
        </div>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
          <div class="card col-lg-3 col-md-6 border-0">
            <div class="card-body bg-light">
              <div class="card-img-top pt-3">
                <h5 class=" card-title">day trading</h5>
              </div>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top" src="images/a1.png" alt="Card image cap">
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-md-0 mt-5">
            <img class="card-img-top" src="images/a2.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">custom menus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 ">
            <img class="card-img-top " src="images/a3.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">user friendly</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 text-right">
            <div class="card-body bg-light">
              <h5 class="card-title  pt-3">annual bonus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top " src="images/a4.png " alt="Card image cap ">
          </div>
        </div>
      </div>
    </section>
   `,
    data: function() {
       return {}
    }
});

const Search = Vue.component('Search', {
   template: `
    <section class="wthree-row py-sm-5 py-3">
      <div class="container py-md-5">
        <div class="py-lg-5 py-3 bg-pricemain text-center">
          <h3 class="agile-title text-uppercase">about us</h3>
          <span class="w3-line"></span>
        </div>
        <div class="row py-lg-5 pt-md-5 pt-3 d-flex justify-content-center">
          <div class="card col-lg-3 col-md-6 border-0">
            <div class="card-body bg-light">
              <div class="card-img-top pt-3">
                <h5 class=" card-title">day trading</h5>
              </div>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top" src="images/a1.png" alt="Card image cap">
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-md-0 mt-5">
            <img class="card-img-top" src="images/a2.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">custom menus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 ">
            <img class="card-img-top " src="images/a3.jpg " alt="Card image cap ">
            <div class="card-body bg-light text-center">
              <h5 class="card-title ">user friendly</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
              <a href="#ab-bot" class="btn scroll">View More</a>
            </div>
          </div>
          <div class="card col-lg-3 col-md-6 border-0 mt-lg-0 mt-5 text-right">
            <div class="card-body bg-light">
              <h5 class="card-title  pt-3">annual bonus</h5>
              <p class="card-text mb-3 ">Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos.</p>
            </div>
            <img class="card-img-top " src="images/a4.png " alt="Card image cap ">
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
        { path: "/", component: Timeline }
        { path: "/search", component: Timeline }
        { path: "/Profile", component: Timeline }
        { path: "/", component: Timeline }
    ]
});

// Instantiate our main Vue Instance
let dashboard = new Vue({
    el: "#dashboard",
    router
});