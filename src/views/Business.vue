<template>
  <div class="bus-container">
    <div id="scrollBusiness">
      <ul class="content">
        <!-- 评分部分 -->
        <div class="busimess-container">
          <div class="busimess-header">
            <div class="business-rate">
              <h3>{{name}}</h3>
              <div class="info">
                <img v-for="(item,i) in starList" :key="i" :src="item" width="16px" height="16px" />
                <span class="rate">({{ratingCount}})</span>
                <span>月售{{sellCount}}单</span>
              </div>
            </div>
            <div class="like" @click="clickLike">
              <img
                :src="isLike?require('../assets/imgs/star24_on@2x.png'):require('../assets/imgs/star24_off@2x.png')"
              />
              <p>收藏</p>
            </div>
          </div>
          <div class="busimess-send-info">
            <div class="item" style="border-right:1px solid #ccc">
              <span style="color:grey">起送价</span>
              <p>
                <span style="font-size:30px">{{minPrice}}</span>元
              </p>
            </div>
            <div class="item" style="border-right:1px solid #ccc">
              <span style="color:grey">商家配送</span>
              <p>
                <span style="font-size:30px">{{deliveryPrice}}</span>元
              </p>
            </div>
            <div class="item">
              <span style="color:grey">平均配送时间</span>
              <p>
                <span style="font-size:30px">{{deliveryTime}}</span>分钟
              </p>
            </div>
          </div>
        </div>
        <!-- 公告与活动 -->
        <div class="mess">
          <h3>公告与活动</h3>
          <div class="item" style="color:#EC524E">{{bulletin}}</div>
          <div class="item" v-for="(item,i) in supports" :key="i">
            <img src width="14px" height="14px" />
            {{item.description}}
          </div>
        </div>
        <!-- 商铺实景 -->
        <div class="pic-box">
          <h3>店铺实景</h3>
          <div id="scroll-pic" style="overflow:scroll">
            <ul class="cont" ref="cont">
              <div class="pic">
                <img v-for="(item,i) in pics" :key="i" :src="item" width="120px" height="100px" />
              </div>
            </ul>
          </div>
        </div>
        <!-- 商铺信息 -->
        <div class="store-box">
          <div class="item">
            <h3>商铺信息</h3>
          </div>
          <div class="item" v-for="(item,i) in infos" :key="i">{{item}}</div>
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
      score: "",
      name: "",
      deliveryTime: "",
      ratingCount: "",
      sellCount: "",
      minPrice: "",
      deliveryPrice: "",
      bulletin: "",
      supports: [],
      pics: [],
      infos: [],
      isLike: false
      //   width:''
    };
  },
  created() {
    getInfo("/api/seller").then(res => {
      //   console.log(res.data.data);
      this.score = res.data.data.score;
      this.name = res.data.data.name;
      this.deliveryTime = res.data.data.deliveryTime;
      this.ratingCount = res.data.data.ratingCount;
      this.sellCount = res.data.data.sellCount;
      this.minPrice = res.data.data.minPrice;
      this.deliveryPrice = res.data.data.deliveryPrice;
      this.bulletin = res.data.data.bulletin;
      this.supports = res.data.data.supports;
      this.pics = res.data.data.pics;
      this.infos = res.data.data.infos;
      this.$nextTick(() => {
        //获取星星列表
        let scoreStar = Math.round(this.score);
        for (let i = 0; i < 5; i++) {
          if (i < scoreStar) {
            this.starList.push(require("../assets/imgs/star24_on@2x.png"));
          } else {
            this.starList.push(require("../assets/imgs/star24_off@2x.png"));
          }
        }
        // console.log(this.$refs);
        let picwidth = 120;
        let margin = 10;
        let width = (picwidth + margin) * this.pics.length - margin;
        this.$refs.cont.style.width = width + "px";
        let picScoll = new BScroll("#scroll-pic", {
          startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical"
        });
        // console.log(width);
      });
    });

    // console.log(this.starList);
  },
  mounted() {
    let scrollBox = new BScroll("#scrollBusiness", {
      click: true
      // eventPassthrough: 'vertical'
    });
  },
  methods: {
    clickLike() {
      this.isLike = !this.isLike;
    }
  }
};
</script>

<style lang="less" scoped>
.bus-container{
    height: 100%;
    background-color:#f3f6f6;
    overflow: auto;
}
#scrollBusiness {
  height: 100%;
//   overflow: auto;
}
.busimess-container {
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: #fff;
  .busimess-header {
    border-bottom: 1px solid #eee;
    display: flex;
    .business-rate {
      flex: 1;

      padding-bottom: 10px;
      .info {
        display: flex;
        align-items: center;
        .rate {
          margin: 0 5px;
        }
      }
    }
    .like {
      width: 50px;
      text-align: center;
    }
  }
  .busimess-send-info {
    display: flex;
    padding: 20px 0;
    text-align: center;
    .item {
      flex: 1;
    }
  }
}
.mess {
  margin-top: 20px;
  background: #fff;
  padding: 20px 0 0 10px;
  .item {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
}
.pic-box {
  margin-top: 20px;
  background: #fff;
  padding: 10px;
  height: 100%;

  .pic {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px;
    img {
      margin-right: 10px;
    }
  }
}
.store-box {
  margin-top: 20px;
  background: #fff;
  padding: 10px;
  .item {
    border-bottom: 1px solid #eee;
    padding: 10px 5px;
  }
}
</style>