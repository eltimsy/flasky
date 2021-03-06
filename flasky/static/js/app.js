import homepage from './components/home';
import vueFun from './components/vue_fun';
import getmatch from './components/match_maker';
import addEntry from './components/addentry';
import googlemap from './components/map';
import getbeer from './components/beer';

function stuff(number) {
  return number * 10
}
const home = homepage();
const vuefun = vueFun();
const addentry = addEntry();
const map = googlemap();
const beer = getbeer();
const matchMaker = getmatch();

const routes = [
  { path: '/', component: home },
  { path: '/vuefun', component: vuefun },
  { path: '/addentry', component: addentry },
  { path: '/mapfun', component: map},
  { path: '/beer', component: beer},
  { path: '/matchmaker', component: matchMaker}
]

window.onload = function () {
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

  var App = window.App = new Vue({
    router,
    el: '#app',
    data: {
      isActive: false,
      login: true,
      register: false,
      homeActive: false,
      mapActive: false,
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
      value: '123123',
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
      switchLogin: function() {
        this.register = false;
        this.login = true;
      },
      switchRegister: function() {
        this.register = true;
        this.login = false;
      },
    }
  });
}
