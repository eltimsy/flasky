export default function getmatch() {
  return Vue.component('matchfun',{
    template:`
      <div>
        <form method=get v-on:submit.prevent="matchnow">
          <h3>Write down name of people: </h3>
          <input type=text size=30 name=title v-model="man">
          <br><br>
          <input type=text size=30 name=title v-model="woman">
          <br><br>
          <input type="submit" class="btn btn-danger" value="Get Match">
        </form>
      </div>`,
    data: function (){
      return {
        man: '',
        woman: '',
      }
    },
    methods: {
      matchnow: function() {
        $.ajax({
          url: 'http://flasky:5000/match',
          type: 'GET',
          data: {man: this.man, woman: this.woman},
        }).done(data => {
          var parsing = JSON.parse(data)
          console.log(parsing.data)
        })
      }
    }
  })
}