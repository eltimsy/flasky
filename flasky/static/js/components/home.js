const $ = require ('jquery');

export default function homepage() {
  return Vue.component('home',{
    template:`
      <div>
        <h2>ALl your POSTS!</h2>
        <p>Read them dumb posts!</p>
        <div v-for="item of entries"
            :key="item.title"
            class="panel panel-info"
        >
          <div class="panel-heading">
            <h3 class="panel-title">{{ item.title }}</h3>
          </div>
          <div class="panel-body">
            {{ item.text }}
            <hr><button type="button" class="btn btn-danger" v-on:click="deletepost(item.text)">Delete</button>
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
      },
      deletepost: function(text) {
        $.ajax({
          url:'http://127.0.0.1:5000/delete',
          type: 'DELETE',
          data: {entry: text},
          success: function(data) {
            window.location.reload();
          }
        })
      }
    },
    mounted: function() {
      this.fetchData()
    }
  })
}