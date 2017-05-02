export default function vueFun() {
  return Vue.component('vuefun',{
    template:`
      <div>
      {{ this.$parent.message }} <br />
      <span v-bind:title="this.$parent.message2(10)">
        Hover your mouse over me for a few seconds to see my dynamically bound title!
      </span>
      <p v-if="this.$parent.see">{{ this.$parent.value }}</p>
      <ul class="list-group">
        <li v-for="item of this.$parent.list"
            :key="item"
            class="list-group-item"
            v-bind:class="{ active: isActive == item}"
            v-on:click="activateItem(item)"
        >
          {{ item }}
        </li>
      </ul>
      <p>{{ this.$parent.number }}</p>
      <button v-on:click="this.$parent.addnum">Add One</button>
      <input v-model="this.$parent.value">
      <button v-on:click="this.$parent.seeit">Toggle Value</button>
      <ul class="list-group">
        <test-test v-for="item in this.$parent.food" v-bind:stuff="item" :key="item.id"></test-test>
      </ul>
    </div>`,
    data: function (){
      return {
        isActive: false,
      }
    },
    methods: {
      activateItem: function(item) {
        this.isActive = item;
      },
    }
  })
}