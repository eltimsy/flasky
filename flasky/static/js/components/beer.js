export default function getbeer() {
  return Vue.component('beerfun',{
    template:`
      <div>
        <form method=get v-on:submit.prevent="beernow">
          <br><br>
          <input type="submit" class="btn btn-danger" value="Get BEER">
        </form>
        <div v-if="beer">
          {{ beer[0].id }}
        </div>
      </div>`,
    data: function (){
      return {
        beer: '',
      }
    },
    methods: {
      beernow: function() {
        $.ajax({
          url: 'http://127.0.0.1:5000/beer',
          type: 'GET',
          data: {},
        }).done(data => {
          var parsing = JSON.parse(data)
          this.beer = (parsing.data);
        })
      }
    }
  })
}