/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = homepage;
function homepage() {
  return Vue.component('home',{
    template:`
      <div>
        <h2>awesome</h2>
        <p>Alsdfkjalsdfjasldkfjasdlf alkdjflaskdjfl</p>
      </div>`,
  })
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = vueFun;
function vueFun() {
  return Vue.component('vuefun',{
    template:`
      <div>
      {{ this.$parent.message }} <br />
      <span v-bind:title="this.$parent.message2(10)">
        Hover your mouse over me for a few seconds to see my dynamically bound title!
      </span>
      <p v-if="this.$parent.see">{{ this.$parent.value }}</p>
      <ul class="list-group">
        <li v-for="item of this.$parent.list"
            :key="item"
            class="list-group-item"
            v-bind:class="{ active: isActive == item}"
            v-on:click="activateItem(item)"
        >
          {{ item }}
        </li>
      </ul>
      <p>{{ this.$parent.number }}</p>
      <button v-on:click="this.$parent.addnum">Add One</button>
      <input v-model="this.$parent.value">
      <button v-on:click="this.$parent.seeit">Toggle Value</button>
      <ul class="list-group">
        <test-test v-for="item in this.$parent.food" v-bind:stuff="item" :key="item.id"></test-test>
      </ul>
    </div>`,
    data: function (){
      return {
        isActive: false,
      }
    },
    methods: {
      activateItem: function(item) {
        this.isActive = item;
      },
    }
  })
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_vue_fun__ = __webpack_require__(1);



function stuff(number) {
  return number * 10
}
const home = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__components_home__["a" /* default */])();
const vuefun = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__components_vue_fun__["a" /* default */])();

const routes = [
  { path: '/', component: home },
  { path: '/vuefun', component: vuefun }
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
    }
  });
}


/***/ })
/******/ ]);