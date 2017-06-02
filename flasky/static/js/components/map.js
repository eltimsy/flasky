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
      </div>`,
    data: function (){
      return {
        address: '',
        city: '',
        country: '',
        zoom: '',
        map: null,
      }
    },
    methods: {
      showmap: function() {
        this.$parent.mapActive = true;
        $.ajax({
          url: 'http://127.0.0.1:5000/map',
          type: 'GET',
          data: {address: this.address, city: this.city, country: this.country, zoom: this.zoom},
        }).done(data => {
          var parsing = JSON.parse(data)
          this.map = (parsing.map);
        })
      }
    }
  })
}