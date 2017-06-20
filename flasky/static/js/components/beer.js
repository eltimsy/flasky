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
          <div v-for="item in beer">
            <img :src="item.labels.icon" /> <strong>{{ beername }}</strong>
            <br>
            {{ item.description }}
          </div>
          <hr>
          <form method=post v-on:submit.prevent="addbeer">
            <input class="btn btn-primary" type=submit value=Add>
          </form>
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
      },
      addbeer: function() {
        $.post('http://127.0.0.1:5000/addbeer',{
          'name': this.beername, 'url': this.beer[0].labels.icon
        }).done(data => {
          console.log('done')
        })
      }
    }
  })
}