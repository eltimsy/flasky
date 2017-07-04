const $ = require ('jquery');

export default function addEntry() {
  return Vue.component('addentry',{
    template:`
      <div>
        <h2>Add Entry</h2>
        <p>Write something awesome</p>
        <div class="alert alert-success" v-if="success">Success you have posted something....!</div>
        <form method=post class=add-entry v-on:submit.prevent="addsomething">
          <h3>Title:</h3>
          <input type=text size=30 name=title v-model="title">
          <h3>Text:</h3>
          <textarea name=text rows=5 cols=40 v-model="text"></textarea><br>
          <input type=submit value=Share>
        </form>
      </div>`,
    data: function(){
      return {
        title: '',
        text: '',
        success: false,
      }
    },
    methods: {
      addsomething: function() {
        this.success = false
        $.post('http://flasky:5000/add',{
          'title': this.title, 'text': this.text
        }).done(data => {
          this.success = true
        })
      }
    },
  })
}