const $ = require ('jquery');

export default function addEntry() {
  return Vue.component('addentry',{
    template:`
      <div>
        <h2>Add Entry</h2>
        <p>Write something awesome</p>
        <form method=post class=add-entry>
          <dl>
            <dt>Title:
            <dd><input type=text size=30 name=title>
            <dt>Text:
            <dd><textarea name=text rows=5 cols=40></textarea>
            <dd><input type=submit value=Share>
          </dl>
        </form>
      </div>`,
    data: function(){
      return {
          entries: null,
      }
    },
    methods: {
      addsomething: function() {
        $.ajax({
          url: 'http://127.0.0.1:5000/showentries'
        }).done(data => {
          this.entries = JSON.parse(data);
        })
      }
    },
  })
}