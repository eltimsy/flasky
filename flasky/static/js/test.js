function stuff(number) {
  return number * 10
}

window.onload = function () {
  Vue.component('test-test', {
    template: '<div>test test test</div>'
  });

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      message2: stuff,
      number: 5,
      see: false,
      list: ["happy",2,3,4,5],
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
