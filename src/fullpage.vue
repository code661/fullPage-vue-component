<template>
  <transition-group
  tag='div'
  :name='transitionName'
  @enter='enter'
  @leave='leave'
  >
    <div
      v-for="(list,index) in this.bgColor"
      :style="{backgroundColor:list}"
      :key='index'
      class="block"
      @wheel='wheelEvent($event)'
      @transitionend='end'
      v-show='index === currentPageIndex'
    >
    <slot
    :state='state'
    :name="'page'+index"
    v-if="index === index">
    </slot>
    </div>
  </transition-group>
</template>


<script>
import Vue from "vue";
import lodash from "lodash";

export default {
  data() {
    return {
      currentPageIndex: 0,
      transitionName: "",
      canWheel: true,
      endCount: 0,
      state: ''
    };
  },
  props:{
    bgColor: Array
  },
  methods: {
    wheelEvent: lodash.debounce(function(e) {
      if (!this.canWheel) {
        return;
      }
      this.canWheel = false;
      if (e.deltaY > 0) {
        if (this.currentPageIndex === this.bgColor.length - 1) {
          this.canWheel = true;
          this.endCount = 0;
          return;
        }
        this.transitionName = "down";
        this.currentPageIndex++;
      }

      if (e.deltaY < 0) {
        if (this.currentPageIndex === 0) {
          this.canWheel = true;
          this.endCount = 0;
          return;
        }
        this.transitionName = "up";
        this.currentPageIndex--;
      }
    },50,{leading:true}),
    end() {
      this.canWheel = true;
      this.endCount++;
      if (this.endCount === 2) {
        this.canWheel = true;
        this.endCount = 0;
        this.state = 'end'
      }
    },
    enter(el,done){
      this.state = 'enter'
      // done()
    },
    leave(el, done){
      this.state = 'leave'
      // done()
    }
  }
};
</script>

<style>
.block {
  position: absolute;
  height: 100%;
  width: 100%;
}
.down-enter-active {
  transition: all 0.8s;
  transform: translateY(0);
}
.down-enter {
  transform: translateY(100%);
}
.down-leave {
  transform: translateY(0);
}
.down-leave-active {
  transition: all 1s;
  transform: translateY(-100%);
}

.up-enter-active {
  transition: all .8s;
  transform: translateY(0);
}
.up-enter {
  transform: translateY(-100%);
}
.up-leave {
  transform: translateY(0);
}
.up-leave-active {
  transition: all 1s;
  transform: translateY(100%);
}
</style>


