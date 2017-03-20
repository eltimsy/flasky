

const test = { template: '<p>abc</p>'}
const test2 = { template: '<p>123</p>' }

const routes = [
  { path: '/test', component: test },
  { path: '/test2', component: test2 }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')


Vue.use(VueRouter)