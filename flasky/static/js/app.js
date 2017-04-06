import superfun from './test';

function stuff(number) {
  return number * 10
}

const test = { template: '<test-component></test-component>'}
const test2 = { template: '<p>asdflasdfjkalsdjf</p>'}

const routes = [
  { path: '/test', component: test },
  { path: '/test2', component: test2 }
]

window.onload = function () {
  superfun();
  const router = new VueRouter({
    routes
  })

  Vue.component('test-test', {
    props: ['stuff'],
    template: `<li class="list-group-item justify-content-between">
                {{ stuff.item }}
                <span class="badge badge-default badge-pill">{{ stuff.number }}</span>
              </li>`
  });

  var app = new Vue({
    router,
    el: '#app',
    data: {
      isActive: false,
      homeActive: false,
      vueActive: true,
      message: 'Hello Vue!',
      message2: stuff,
      number: 5,
      see: false,
      list: [
        "happy",
        "crazy man",
        "more things to talk",
        "I dunno",
        "whateves",
      ],
      food: [
        { item: 'lamb', number: 5},
        { item: 'steak', number: 10},
        { item: 'oyster', number: 100},
      ],
      value: '',
    },
    methods: {
      addnum: function () {
        this.number += 1
      },
      seeit: function () {
        if(this.see) {
          this.see = false
        } else {
          this.see = true
        }
      },
      activateItem: function(item) {
        this.isActive = item;
      },
    }
  });
}
