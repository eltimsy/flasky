window.onload = function () {
  Vue.component('nav-link', {
    props: ['url'],
    template: `<li role="presentation">
                <a href={{ url.link }}> {{ url.text }} </a>
              </li>`
  });

  var app2 = new Vue({
    el: '#app2',
    data: {
      isActive: false,
      urls: [
        { link: '/', text: 'Home' },
        { link: '/vuefun', text: 'Vue Page'},
        { link: '/', text: 'Other'},
      ],
    },
    methods: {
      activateItem: function(item) {
        console.log(item)
        this.isActive = item;
      },
    }
  });
}
