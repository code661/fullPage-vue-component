import Vue from 'vue'
import fullpage from './fullpage.vue'
import page1 from './page1.vue'


new Vue({
  el: '#app',
  data: {
    bgColor: ["#DB4D6D", "#E2943B", "#24936E", "#BC9F77"],
  },
  components:{fullpage, page1}
})