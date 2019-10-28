<template>
  <div style="height:100%" class="index-container">
    <!-- 头部 -->
    <div class="index-header" :style="{backgroundImage:`url(${avatar})`}">
      <div class="mask">
        <div class="mask-logo">
          <img :src="avatar" width="75px" height="75px" />
        </div>
        <div class="mask-msg">
          <div class="title-box">
            <img src="../assets/imgs/brand@3x.png" width="30px" height="18px" />
            <span class="title">{{name}}</span>
          </div>
          <p class="mask-show">
            <span>{{ description }}</span> /
            <span style="fon-size:0.4rem">
              {{ deliveryTime }}
              <span>分钟送达</span>
            </span>
          </p>
          <div class="discount">
            <img src="../assets/imgs/decrease_1@2x.png" width="12px" height="12px" />
            <span class="descriptionText">{{descriptionText }}</span>
          </div>
        </div>
      </div>
      <div class="bulletin">
        <img src="../assets/imgs/bulletin@3x.png" width="22px" height="12px" alt />
        <div>{{bulletin}}</div>
        <span style="margin-right:10px;">></span>
      </div>
    </div>
    <!-- 导航 -->
    <div class="show-box">
      <div :class="{selected:isShow == '/'}" @click="changePage('/')">商品</div>
      <div :class="{selected:isShow == '/evaluate'}" @click="changePage('/evaluate')">评价</div>
      <div :class="{selected:isShow == '/business'}" @click="changePage('/business')">商家</div>
    </div>
    <!-- 显示页 -->
    <router-view
      :indexId="id"
      :score="score"
      :serviceScore="serviceScore"
      :rankRate="rankRate"
      :deliveryTime="deliveryTime"
      style="flex:1"
    ></router-view>
    <transition name="slide-fade">
      <ShopCar v-show="isShowShopCar"></ShopCar>
    </transition>
    <!-- 购物车点击 -->
    <div class="shopCar">
      <!-- 图片 -->
      <div class="imgWraper" @click="showCar">
        <div class="imgContainer" :style="{backgroundColor:allPrice >= 20?'#f60':'#2A333C'}">
        <img :src="imgPath" width="30px"  height="30px"/>
      </div>
      </div>
      <!-- 内容 -->
      <div class="contentShopCar" :style="{color:allPrice >= 20?'#f60':''}">
        <h2>￥{{allPrice}}</h2>
      </div>
      <!-- 中间线 -->
      <div style="border-right:1px solid #ccc;margin:0 5px;width:0"></div>
      <div class="sendContent">
        <span>另需配送费￥4元</span>
      </div>
      <button class="goToMoney" :style="{backgroundColor:allPrice >= 20?'#f60':'#2A333C',color:allPrice >= 20?'#fff':''}">{{allPrice >= 20?'去结算':'20起送'}}</button>
    </div>
    <div style="height:60px;width:100%"></div>
  </div>
</template>

<script>
import { getInfo } from "../apis/apis";
import ShopCar from './ShopCar'
export default {
  data() {
    return {
      isShow: "/",
      avatar: "",
      name: "",
      deliveryTime: "",
      description: "",
      supports: [],
      bulletin: "",
      id: "",
      score: "",
      serviceScore: "",
      rankRate: "",
      isShowShopCar:false,
    };
  },
  components:{
    ShopCar,
  },
  created() {
    // 发送请求
    console.log(this.$store)
    getInfo("/api/seller")
      .then(res => {
        // console.log(res.data.data)
        for (let k in this.$data) {
          this.$data[k] = res.data.data[k];
        }
        let hash = getIsSelected(location.hash.substring(1));
        // console.log(hash)
        this.isShow = hash;
      })
      .catch(err => console.log(err));
  },
  computed: {
    descriptionText() {
      
      var str = "";
      for (let v of this.supports) {
        str += v.description + " ";
      }
      return str;
    },
    allPrice(){
      return this.$store.getters.allPrice;
    },
    imgPath() {
      if (this.$store.getters.allPrice < 20) {
        return require('../assets/imgs/shopCar_0.png')
      } else {
        return require('../assets/imgs/shopCar_1.png')
      }
    },
  },
  methods: {
    changePage(path) {
      this.isShow = path;
      this.$router.history.push(path);
    },
    showCar(){
      this.isShowShopCar = !this.isShowShopCar;
    }
  }
};
function getIsSelected(hash) {
  // console.log(hash);
  switch (hash) {
    case "/":
      return "/";
    case "/evaluate":
      return "/evaluate";
    default:
      return "/business";
  }
}
</script>

<style lang="less" scoped>
.index-container{
  display: flex;
  flex-direction: column;
}
.index-header {
  width: 100%;
  height: 150px;
  background-size: 100%;
  background-position: 100px;
  position: relative;
  .mask {
    width: 100%;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
    background: #464646;
    opacity: 0.9;
    display: flex;
    padding: 22px;
    .mask-logo {
      width: 75px;
      height: 75px;
      border-radius: 5px;
      overflow: hidden;
    }
    .mask-msg {
      margin-left: 10px;
      flex: 1;
      color: #fff;
      .mask-show {
        line-height: 32px;
      }
      .title-box {
        display: flex;
        align-items: center;
        .title {
          font-size: 1rem;
          color: #fff;
          margin-left: 5px;
        }
      }
      span {
        font-size: 0.7rem;
      }
      .discount {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
        }
        .descriptionText {
          display: inline-block;
          width: 170px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .bulletin {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
    height: 30px;
    justify-content: space-between;
    width: 100%;
    font-size: 0.5rem;
    background: #44403a;
    opacity: 0.9;
    color: #fff;
    img {
      margin-left: 10px;
    }
    div {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 5px;
    }
  }
}
.show-box {
  flex: 0 1 40px;
  display: flex;
  // width: 100%;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  color: #4e4e4e;
  div {
    padding: 10px 0;
    text-align: center;
  }
}
.selected {
  color: #e01f17;
}
.shopCar{
  width: 100%;
  height: 60px;
  background: #141C27;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  .imgContainer{
    height: 50px;
    background: #2A333C;
    width: 50px;
    text-align: center;
    border-radius: 50%;
    img{
      margin-top: 10px;
    }
  }
  .imgWraper{
    width: 70px;
    height: 70px;
    background: #141C27;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .contentShopCar{
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 80px;
    
  }
  .sendContent{
    display: flex;
    align-items: center;
  }
  .goToMoney{

      border: none;
      width: 120px;
      height: 60px;
      background: #2B343B;
      color: #97999D;
      font-size: 1.5rem;
      outline: none;
    
  }
 
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

</style>