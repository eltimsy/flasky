export default function googlemap() {
  return Vue.component('mapfun',{
    template:`
      <div id="Gmap">
        <form method=get v-on:submit.prevent="showmap">
          <h3>Address: </h3>
          <input type=text size=30 name=title v-model="address">
          <h3>City:</h3>
          <input type=text size=30 name=title v-model="city">
          <h3>Country:</h3>
          <input type=text size=30 name=title v-model="country">
          <h4>Zoom:</h4>
          <input type=text size=15 name=title v-model="zoom">
          <br><br>
          <input type="submit" class="btn btn-danger" value="Show Map">
        </form>
        <img :src="map" />
        <form method=get v-on:submit.prevent="getplaces">
          <input type="submit" class="btn btn-success" value="Places">
        </form>
        <div>{{ this.name }}</div>
      </div>`,
    data: function (){
      return {
        address: '',
        city: '',
        country: '',
        zoom: '',
        map: null,
        name: null,
      }
    },
    methods: {
      showmap: function() {
        this.$parent.mapActive = true;
        $.ajax({
          url: 'http://flasky:5000/map',
          type: 'GET',
          data: {address: this.address, city: this.city, country: this.country, zoom: this.zoom},
        }).done(data => {
          var parsing = JSON.parse(data)
          this.map = (parsing.map);
        })
      },
      getplaces: function() {
        $.ajax({
          url: 'http://flasky:5000/places',
          type: 'GET',
          data: {address: this.address, city: this.city, country: this.country},
        }).done(data => {
          var parsing = JSON.parse(data)
          this.name = (parsing.info.results[0].name)
          console.log(parsing);
        })
      }
    }
  })
}