// 0. If using a module system, call Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/',redirect: '/dashboard' },

  { path: '/dashboard',name:"dashboard", component: dashboard },
  { path: '/pnr',name:"pnr", component: PNR },
  { path: '/viewtranscripts',name:"transcripts", component: Bar },

  // { path: '/add/new', component: addPNR },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  // mode: 'history',
  hash: false,

  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
});

new Vue({
    el: '#app',
    router,
    template: `<headers></headers>`,
})
