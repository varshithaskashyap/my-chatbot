Vue.component("headers", {
	data: function () {
		return {
			module: this.$router.currentRoute.name,
		}
	},


   computed: {
      currentRouteName() {
         return this.$router.currentRoute.name;
      }
   },



	template:
		`
    <div class="main-container">
    <deleteConformation></deleteConformation>
    <modal></modal>
    <notification></notification>
      <div class="row">
         <div class="col-md-auto">
            <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;height: 100vh;">
               <router-link to="/dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
               <i class="fad fa-bars"></i>
               <span class="m-2 fs-4">Dashboard</span>
               </router-link>

               <hr>
               <ul class="nav nav-pills flex-column mb-auto">
                  <li>
                     <router-link to="/dashboard" class="nav-link link-dark"><i class="far fa-tachometer-alt-fast mr-2"></i>Dashboard</router-link>
                  </li> 
                  <li class="nav-item">
                     <router-link to="/pnr" class="nav-link link-dark"> <i class="fal fa-table"></i>Add Patterns</router-link>
                  </li>
                  <li>
                     <router-link to="/transcripts" class="nav-link link-dark"> <i class="far fa-border-all mr-1"></i>View Transcripts</router-link>
                  </li>
               </ul>
               <hr>
               <div class="dropdown">
                  <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2"
                     data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/kushtej.png" alt="" width="32" height="32" class="rounded-circle me-2">
                  <strong>kushtej</strong>
                  </a>
                  <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                     <li><a class="dropdown-item" href="#">Settings</a></li>
                     <li><a class="dropdown-item" href="#">Profile</a></li>
                     <li>
                        <hr class="dropdown-divider">
                     </li>
                     <li><a class="dropdown-item" href="#">Sign out</a></li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="col mt-3">
            <router-view></router-view>
         </div>
      </div>
   </div>
   `,
})
