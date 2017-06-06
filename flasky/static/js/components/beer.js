export default function getbeer() {
  return Vue.component('beerfun',{
    template:`
      <div>
        <form method=get v-on:submit.prevent="beernow">
          <h3>Name of Beer: </h3>
          <input type=text size=30 name=title v-model="beername">
          <br><br>
          <input type="submit" class="btn btn-danger" value="Get BEER">
        </form>
        <div v-if="beer">
          <ul>
            <li v-for="item in beer">
              <img :src="item.labels.icon" />
              {{ item.description }}
            </li>
          </ul>
        </div>
      </div>`,
    data: function (){
      return {
        beername: '',
        beer: '',
      }
    },
    methods: {
      beernow: function() {
        $.ajax({
          url: 'http://127.0.0.1:5000/beer',
          type: 'GET',
          data: {beer: this.beername},
        }).done(data => {
          var parsing = JSON.parse(data)
          console.log(parsing.data)
          this.beer = (parsing.data);
        })
      }
    }
  })
}