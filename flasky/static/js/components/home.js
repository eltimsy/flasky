const $ = require ('jquery');

export default function homepage() {
  return Vue.component('home',{
    template:`
      <div>
        <h2>awesome</h2>
        <p>Alsdfkjalsdfjasldkfjasdlf alkdjflaskdjfl</p>
        <div v-for="item of entries"
            :key="item.title"
            class="panel panel-info"
        >
          <div class="panel-heading">
            <h3 class="panel-title">{{ item.title }}</h3>
          </div>
          <div class="panel-body">
            {{ item.text }}
          </div>
        </div>
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