<template>
  <div class="app">
    <div>
      <span v-for="(item,index) in ['新闻','体育','娱乐']" :key="index"
      @click="hanldClick(index)"
      :class="{seted : curen === index}"
      >
          {{item}}
      </span>
    </div>
    <div v-show="curen === 0">
      <p>中秋快乐</p>
      <p>中秋快乐</p>
      <p>中秋快乐</p>
    </div>
    <div v-show="curen === 1">
      <p>中国男篮大胜</p>
      <p>中国男篮大胜</p>
      <p>中国男篮大胜</p>
    </div>
    <div v-show="curen === 2">
      <p>吴亦凡恋情</p>
      <p>吴亦凡恋情</p>
      <p>吴亦凡恋情</p>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            curen: 0
        }
    },
    methods:{
        hanldClick(index){
            this.curen = index
        }
    }
};
</script>

<style>
p{
    display:block;
    line-height: 50px;
}
.app{
    margin: 200px 300px;
}
.seted{
    color: red;
}
</style>