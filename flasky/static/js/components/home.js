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
            <hr>
            <button type="button" class="btn btn-danger" v-on:click="deletepost(item.text)">Delete</button>
            <button type="button" class="btn btn-danger" v-on:click="editpost(item.text)">Edit</button>
            <form v-if="isActive === item.text" method=put class=edit-entry v-on:submit.prevent="editsomething(item.text)">
              <br><textarea name=text rows=3 cols=40 v-model="text"></textarea><br>
              <input type=submit value=Edit>
            </form>
          </div>
        </div>
        <h2>All your beers!</h2>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Beer Name</th>
              <th>Label</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of beers"
                :key="item.name"
            >
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td><img :src="item.url" /></td>
              <td>{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>`,
    data: function(){
      return {
        entries: null,
        beers: null,
        isActive: false,
        text: '',
      }
    },
    methods: {
      fetchData: function() {
        $.ajax({
          url: 'http://127.0.0.1:5000/showentries'
        }).done(data => {
          const information = JSON.parse(data);
          this.entries = information[0];
          this.beers = information[1];
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
      },
      editpost: function(text) {
        this.isActive = text;
      },
      editsomething: function(text) {
        $.ajax({
          url:'http://127.0.0.1:5000/edit',
          type: 'PUT',
          data: {entry: text, change: this.text},
          success: function(data) {
            window.location.reload();
          }
        })
      },
    },
    mounted: function() {
      this.fetchData()
    }
  })
}