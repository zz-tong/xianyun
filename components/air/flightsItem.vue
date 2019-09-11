<template>
  <div class="flight-item">
    <!-- 这里给个盒子点击事件任意地方展开航班信息座位表 -->
    <div @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <!-- 可能存在多个座位信息,需要循环 -->
      <!-- v-show=""就是隐藏座位信息的 -->
      <el-row type="flex" justify="space-between" align="middle" v-show="isShow">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //控制座位列表展开
      isShow: false
    }
  },

  // 使用props方法声明一个对象来父传子
  props: {
    // data表示组件可以接收的属性对象数据
    data: {
      // type是一个类型,他是一个对象Object
      //type这里是不能改的,他是用来声明属性(data)的类型
      type: Object,
      // 默认是空数组
      //如果调用组件不传值,此阿勇default的默认值
      default: {}
    }
  },
  //航班用时计算转换
  // computed和data一样都可以在模板中渲染，区别在computed的属性值是一个函数，
  // 最终的变量的值是由函数返回。
  // computed是一个计算属性
  //   split(":")它的返回值是一个数组
  computed: {
    //相隔时间
    rankTime() {
      //出发时间,放回值是数组
      const dep = this.data.dep_time.split(":");
      //到达时间,放回值是数组
      const arr = this.data.arr_time.split(":");

      //2.判断出现-24小时的情况解决;
      // 如果到达时间小于出发时间,说明时间到达了第二天,需要加上24
      //需要用parseInt()转换,可以能是兼容性问题只有我电脑
      if (arr[0] < dep[0]) {
        arr[0] = 24 + parseInt(arr[0]);
      }

      // 达到时间的分钟数组中的第0个是14,第1个是30;加一个+号是把字符串转为数字
      const arrVal = parseInt(arr[0]) * 60 + +arr[1];
      // 出发时间的分钟数组中的第0个是12,第1个是00;加一个+号是把字符串转为数字
      const depVal = parseInt(dep[0]) * 60 + +dep[1];

      //   相隔的总分钟
      const dis = arrVal - depVal;
      //向下取整获取小时,使用math.floor方法
      const hours = Math.floor(dis / 60);
      //获取分钟使用%(磨)
      const min = dis % 60;

      //return拼接字符串输出
      return `${hours}时${min}分`;
    }
  }
};
</script>
 
<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>