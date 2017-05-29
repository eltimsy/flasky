export default function googlemap() {
  return Vue.component('mapfun',{
    template:`
      <div id="Gmap">
        <form method=get v-on:submit.prevent="showmap">
          <h3>City:</h3>
          <input type=text size=30 name=title v-model="city">
          <h3>Country:</h3>
          <input type=text size=30 name=title v-model="country"><br><br>
          <input type="submit" class="btn btn-danger" value="Show Map">
        </form>
        <img :src="map" />
      </div>`,
    data: function (){
      return {
        city: '',
        country: '',
        map: null,
      }
    },
    methods: {
      showmap: function() {
        this.$parent.mapActive = true;
        $.ajax({
          url: 'http://127.0.0.1:5000/map',
          type: 'GET',
          data: {city: this.city, country: this.country},
        }).done(data => {
          var parsing = JSON.parse(data)
          this.map = (parsing.map);
        })
      }
    }
  })
}