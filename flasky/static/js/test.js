function stuff(number) {
  return number * 10
}

window.onload = function () {
  Vue.component('test-test', {
    props: ['stuff'],
    template: `<li class="list-group-item justify-content-between">
                {{ stuff.item }}
                <span class="badge badge-default badge-pill">{{ stuff.number }}</span>
              </li>`
  });

  var app = new Vue({
    el: '#app',
    data: {
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
    }
  });
}
