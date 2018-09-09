<template>
  <div class="project-desc">
    <span v-html="code" v-for="code in codes"></span>
    <span v-show="show">|</span>
  </div>
</template>

<script>
export default {
  props: {
    state: String
  },
  data() {
    return {
      msg: "AVueProject"
        .split("")
        .concat(["<br>", "{", "<br>"], "return 'tan61'".split(""), [
          "<br>",
          "}"
        ]),
      msgIndex: 0,
      codes: [],
      timer1: null,
      timer2: null,
      show: false
    };
  },
  methods: {
    pushMsg() {
      this.codes.push(this.msg[this.msgIndex]);
      this.msgIndex++;
    },
    showChange(){
      this.show = !this.show;
      if(this.msgIndex === this.msg.length){
        clearInterval(this.timer1)
        this.timer1 = null
        clearInterval(this.timer2)
        this.timer2 = null
      }
    },
    clear(){
      this.codes = []
      this.msgIndex = 0
      clearInterval(this.timer1)
      this.timer1 = null
      clearInterval(this.timer2)
      this.timer2 = null
    }
  },
  watch:{
    state(){
      if(this.state === 'enter'){
        this.timer1 = setInterval(this.pushMsg, 240);
        this.timer2 = setInterval(this.showChange, 150);
      }
      if(this.state === 'leave'){
        this.clear()
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-desc {
  position: absolute;
  bottom: 30px;
  left: 30px;
  font-size: 30px;
}
</style>
