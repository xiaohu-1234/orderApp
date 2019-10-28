<template>
  <div class="evaluate-container">
    <div id="showList">
      <ul class="content">
        <!-- 总体评分 -->
        <div class="all-evaluate">
          <!-- 总评分 -->
          <div class="left">
            <h1>{{score}}</h1>
            <p>综合评分</p>
            <span>高于附近商家{{rankRate}}%</span>
          </div>
          <div class="right">
            <p>
              服务态度&emsp;
              <img v-for="(v,i) in starList" :key="i" :src="v" width="14px" height="14px" />
              &nbsp;
              <label>{{serviceScore}}</label>
            </p>
            <p>
              服务态度&emsp;
              <img v-for="(v,i) in starList" :key="i" :src="v" width="14px" height="14px" />
              &nbsp;
              <label>{{serviceScore}}</label>
            </p>
            <p>
              送达时间&emsp;
              <span>{{deliveryTime}}分钟</span>
            </p>
          </div>
        </div>
        <!-- 满意度选择 -->
        <div class="choose-rate">
          <div class="choose">
            <div :class="{selected:isSelected ===1}" @click="filterList(1)">全部&nbsp;{{allRate}}</div>
            <div :class="{selected:isSelected ===2}" @click="filterList(2)">满意&nbsp;{{sureRate}}</div>
            <div :class="{selected:isSelected ===3}" @click="filterList(3)">不满意&nbsp;{{noRate}}</div>
          </div>
          <div class="check-box">
            <Checkbox v-model="single" @click.native="showContent($event)"></Checkbox>只看有内容的评价
          </div>
        </div>
        <!-- 列表 -->
        <div class="rateList">
          <div class="rateItems" v-for="(item,i) in showList" :key="i">
            <!-- 头像 -->
            <div class="item-logo">
              <img :src="item.avatar" width="30px" height="30px" />
            </div>
            <!-- 内容 -->
            <div class="item-content">
              <h4>{{item.username}}</h4>
              <p>
                <img
                  v-for="(val,i) in item.starList"
                  :key="i"
                  :src="val"
                  width="10px"
                  height="10px"
                />
                &nbsp;
                <label
                  :style="{display:item.deliveryTime ==='' || !item.deliveryTime?'none':'inline-block'}"
                >{{item.deliveryTime}}分钟送达</label>
              </p>
              <p>{{item.text}}</p>
              <div class="thumbs">
                <Icon type="md-thumbs-up" />
                <span class="thumbs-foods" v-for="(span,i) in item.recommend" :key="i">{{span}}</span>
              </div>
              <span class="times">{{item.rateTime}}</span>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getInfo } from "../apis/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      starList: [],
      allRate: 0,
      sureRate: 0,
      noRate: 0,
      single: false,
      showList: [],
      list: [],
      isSelected: 1
    };
  },
  props: ["score", "serviceScore", "rankRate", "deliveryTime"],
  created() {
    let scoreStar = Math.round(this.serviceScore);
    // console.log(getStar(scoreStar))
    // 获取星星个数
    this.starList = getStar(scoreStar);
    getInfo("/api/ratings").then(res => {
      this.list = res.data.data;
      for (let val of this.list) {
        val.starList = getStar(val.score);
      }
      this.showList = this.list;
      this.allRate = this.showList.length;
      this.sureRate = this.showList.filter(val => val.score > 3).length;
      this.noRate = this.showList.filter(val => val.score <= 3).length;
    });
  },
  mounted() {
    let rateScroll = new BScroll("#showList", {
      click: true
    });
  },
  computed: {},
  methods: {
    filterList(val) {
      console.log(val);
      switch (val) {
        case 1:
          this.isSelected = 1;
          this.showList = this.list;
          break;
        case 2:
          this.isSelected = 2;
          this.showList = this.list.filter(val => val.score > 3);
          break;
        case 3:
          this.isSelected = 3;
          this.showList = this.list.filter(val => val.score <= 3);
          break;
      }
    },
    showContent() {
      if (!this.single) {
        this.showList = this.list.filter(val => val.text != "");
      } else {
        this.showList = this.list;
      }
    }
  }
};
function getStar(scoreStar) {
  //定义全部星星个数
  let allStar = 5;
  let arr = [];
  for (let i = 0; i < allStar; i++) {
    if (i < scoreStar) {
      arr.push(require("../assets/imgs/star24_on@2x.png"));
    } else {
      arr.push(require("../assets/imgs/star24_off@2x.png"));
    }
  }
  return arr;
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#showList {
  overflow: auto;
  height: 100%;
}
.evaluate-container {
  background-color: #f3f6f6;
  height: 100%;
  border-bottom: 2px solid #ccc;
  display: flex;
  flex-direction: column;
}
.all-evaluate {
  display: flex;
  padding: 10px;
  //   height: 104px;
  color: #4e4e4e;
  background-color: #fff;
  .left {
    width: 40%;
    border-right: 1px solid #eee;
    padding-right: 10px;
    text-align: center;
    h1 {
      color: #f60;
    }
    span {
      color: grey;
      font-size: 0.7rem;
    }
    p {
      font-weight: bold;
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    line-height: 28px;
    p {
      span {
        margin-left: 5px;
        color: grey;
      }
      label {
        color: #f60;
      }
    }
  }
}
.choose-rate {
  padding: 0 20px;
  background: #fff;
  //   height: 94px;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  .choose {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    div {
      padding: 5px 10px;
      margin-right: 10px;
      &:nth-child(2) {
        background-color: #ccecf7;
      }
      &:last-child {
        background-color: #eaebed;
      }
    }
    .selected {
      background: blue !important;
      color: #fff;
    }
  }
  .check-box {
    padding: 10px 0;
  }
}
.rateList {
  flex: 1;
  padding: 10px;
  background: #fff;
  .rateItems {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    position: relative;
    .item-logo {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      margin-right: 10px;
    }
    .item-content {
      flex: 1;
      label {
        font-size: 0.7rem;
        color: grey;
      }
      .thumbs {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .thumbs-foods {
          display: inline-block;
          width: 60px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 10px;
          border: 1px solid #ccc;
          font-size: 0.7rem;
          padding: 0 3px;
          margin-top: 5px;
        }
      }
    }
  }
  .times {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 0.5rem;
    color: grey;
  }
}
</style>