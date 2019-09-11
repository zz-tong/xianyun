<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- :data="flightsData"是父传子组件的事件 -->
        <FlightsFilters :data="flightsData"/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <!-- :data="item"用户把父组件数据传给子组件使用data绑定数据item -->
        <!-- flightsData.flights是之前循环的记录数,后面重新赋值新的数组dataList,循环它就可以了 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";

export default {
  data() {
    return {
      //机票列表返回的总数;其中包含4个属性:flights/info/options/tatol,接过来的是一个对象
      flightsData: { //总航班数距
        flights: [],   //航班数
        info: {}, 
        options: {}
      },

      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
      total: 0, //初始总条数
      //声明一个显示当前页的数的数组
      dataList: []
    };
  },
  methods: {
    //2.每页出发的条数,val 是条数
    handleSizeChange(val) {
      //直接把datalist赋值给val
      this.dataList = val;
      // 最终把每页条数公式切换datalist的值
      this.dataList = this.flightsData.flights.slice(0, val);
    },

    // 1.点击切换页码时候触发,val是点击的页码
    handleCurrentChange(val) {
      console.log(val);
      this.pageIndex = val; //当前页

      // slice()的截取不能固定,需重新计算
      //按照数学公式切换dataList的值
      //pageIndex -1 如:pageIndex=0 那么它的值就是0,再*pageSize每页显示的值
      //第二个截取范围的为:pageIndex*pageSize 就是截取的点索引
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },

  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {
    console.log(this.$route); //this.$route路由可以返回所有航班信息
    console.log(this.$route.quary); //this.$route路由可以返回所有航班信息quary是其中的一项对象
    //请求航班数据列表
    this.$axios({
      url: "airs",
      //路由url参数
      params: this.$route.query
    }).then(res => {
      console.log(res.data);
      // 赋值给总的数据
      this.flightsData = res.data; // 在上面结构中给循环

      //分页的总数
      this.total = this.flightsData.flights.length;

      //第一页的值;slice(0,5)是从第0条,到第5条截取,不包含第5条
      this.dataList = this.flightsData.flights.slice(0, this.pageSize);
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>