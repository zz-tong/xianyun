<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item,index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 表单 -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          v-model="form.departCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          v-model="form.destCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
//引入使用第三方moment日期格式转换的
import moment from "moment";
export default {
  data() {
    return {
      //按接口获取从服务器带回的数据,定义需要提交的是5个参数
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      //tab栏索引
      currentTab: 0
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(index) {
      //this.currentTab = index; //这暂时不做点击切换
      //切换到往返
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 2.如果是传递空的数组在框里就不出现下列列框
      if (!value) {
        cb([]);
        return;
      }

      // 1.根据用户的输入请求建议城市
      this.$axios({
        // get:接口
        url: "/airs/city",
        // get参数
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        // 得到数据data
        const { data } = res.data;
        // 给数组中每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性,把获取过来的:如广州市的市去除
          v.value = v.name.replace("市", "");
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
        });
        // 默认选中第一个:出发城市名称及成代码
        this.form.departCity = newData[0].value;
        this.form.departCode = newData[0].sort;

        // 把获取过来的显示在下列列表中
        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    // item是当然选中的对象
    // 把选中的值设置给form
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 到达城市输入框获取焦点时触发
    queryDestSearch(value, cb) {
      // 2.如果是传递空的数组在框里就不出现下列列框
      if (!value) {
        cb([]);
        return;
      }

      // 1.根据用户的输入请求建议城市
      this.$axios({
        // get:接口
        url: "/airs/city",
        // get参数
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        // 得到数据data
        const { data } = res.data;
        // 给数组中每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性,把获取过来的:如广州市的市去除
          v.value = v.name.replace("市", "");
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
        });
        // 默认选中第一个:出发城市名称及成代码
        this.form.destCity = newData[0].value;
        this.form.destCode = newData[0].sort;

        // 把获取过来的显示在下列列表中
        cb(newData);
      });
    },
    // 到达城市下拉选择时触发
    handleDestSelect(item) {
      console.log(item);
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    //出发时间
    // value会返回当然选中的日期
    handleDate(value) {
      //日期转换
      this.form.departDate = moment(value).format(`YYYY-MM-DD`);
    },
    //点击切换按钮
    // 触发和目标城市切换时触发
    handleReverse() {
      //解构出相关值
      const { departCity, departCode, destCity, destCode } = this.form;
      // 交叉赋值
      this.form.departCity = destCity;
      this.form.departCode = destCode;

      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    //点击按钮搜索
    handleSubmit() {
      // 表单认证
      const { departCity, destCity, departDate } = this.form;

      // 判断输入框不能为空
      if (!departCity) {
        this.$alert("出发城市不能为空", "提示");
        return;
      };

      if (!destCity) {
        this.$alert("到达城市不能为空", "提示");
        return;
      };

      if (!departDate) {
        this.$alert("出发日期不能为空", "提示");
        return;
      };


      // 跳转到机票列表页 /air/flights
      this.$router.push({
        path: "/air/flights",
        // url携带的参数
        query: this.form
      });
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>