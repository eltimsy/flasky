export default function googlemap() {
  return Vue.component('mapfun',{
    template:`
      <div id="Gmap">
        <button type="button" class="btn btn-danger" v-on:click="showmap">Show Map</button>
        <img :src="map" />
      </div>`,
    data: function (){
      return {
        map: null,
      }
    },
    methods: {
      showmap: function() {
        this.$parent.mapActive = true;
        $.ajax({
          url: 'http://127.0.0.1:5000/map'
        }).done(data => {
          var abc = JSON.parse(data)
          this.map = (abc.map);
        })
      }
    }
  })
}