const $ = require ('jquery');

export default function homepage() {
  return Vue.component('home',{
    template:`
      <div>
        <h2>awesome</h2>
        <p>Alsdfkjalsdfjasldkfjasdlf alkdjflaskdjfl</p>
        <ul class="list-group">
          <li v-for="item of entries"
              :key="item.title"
              class="list-group-item"
          >
            <h3>{{ item.title }}</h3><hr>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>`,
    data: function(){
      return {
          entries: null,
      }
    },
    methods: {
      fetchData: function() {
        $.ajax({
          url: 'http://127.0.0.1:5000/showentries'
        }).done(data => {
          this.entries = JSON.parse(data);
        })
      }
    },
    mounted: function() {
      this.fetchData()
    }
  })
}