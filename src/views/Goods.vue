<template>
  <div style="display:flex;height:100%">
      <!-- 左边菜单 -->
    <div id="left-box" style="flex:0 1 80px; background: #f3f6f6;overflow:auto;height:100%">
      <ul class="content">
        <div dis-hover v-for="item in goodsList" :key="item.name" :class="{menuItems:true,isSelected:isShow==item.name}" @click="clickMenu(item.name)">{{ item.name }}</div>
      </ul>
    </div>
    <!-- 右边详情 -->
    <div id="right-box" style="flex:1;background:#f3f6f6;overflow:auto;height:100%">
        <ul class="content">
          <!-- 创建每个列表 -->
          <div :id="item.name" v-for="(item,index) in goodsList" :key="index">
          <div class="goods-title" style="padding-left:5px">
              {{item.name}}
          </div>
          <div class="goods-item" v-for="(val,index) in item.foods" :key="index">
              <div>
                  <img :src="val.icon" width="55px" height="55px" style="margin-right:5px">
              </div>
              <div>
                  <h3>{{ val.name }}</h3>
                  <p :class="{description:val.description!=''}">{{val.description}}</p>
                  <p :class="{isDescription:val.description!=''}">月售:{{ val.sellCount }}&emsp;好评率:{{val.rating}}%</p>
                  <div style="display:flex;align-items:center">
                      <span style="font-size:1rem;color:red;font-weight:bold">￥{{val.price}}</span>
                      <span style="margin-left:5px;color:gray; text-decoration: line-through;font-size:1rem">{{val.oldPrice ==''?'':`￥${val.oldPrice}`}}</span>
                  </div>
                  <div class="addGoods">
                       <Button size="small" shape="circle" icon="md-remove" v-show="val.count>0" @click="changeNum(val.name,-1)"></Button>
                       <span style="margin:0 5px;font-size:1rem">{{val.count === 0?'':val.count}}</span>
                       <Button type="primary" size="small" shape="circle" icon="md-add" @click="changeNum(val.name,1)"></Button>
                  </div>
              </div>
          </div>
        </div>
        </ul>
        
     
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { getInfo } from "../apis/apis";
export default {
  data() {
    return {
      isShow:'热销榜'
    };
  },
  props: ["indexId"],
  created() {
    this.$store.commit('changeId',this.indexId);
    this.$store.dispatch('initList')
    // console.log(this.goodsList)
  },
  computed:{
    //  获取vuex中的list
     goodsList(){
       return this.$store.state.list;
     },
    divArr(){
      let arr = []
      for(let v of this.$store.state.list){
          arr.push(document.getElementById(v.name).offsetHeight)
      }
      //组装自己想要的数组:用于判断滑动的范围
      let newArr = [];
      //定义变量来保存最小值
      let min = 0;
      for(let i = 0;i < arr.length;i++){
        let obj = {min,max:min + arr[i] ,menuName:this.goodsList[i].name}
        min += arr[i];
        newArr.push(obj);
      }
       return newArr;
    }
  },
  mounted(){
    //初始化better-scroll实例
    let leftBscroll =  new BScroll('#left-box',{
      //运行监听点击事件
      click:true,
    })
    this.rightBscroll =  new BScroll('#right-box',{
      probeType:3,//设置属性才能监听滚动的距离
      click:true,
    })
    // 监听scroll事件获取到用户每次滑动的距离
    this.rightBscroll.on('scroll',(pos)=>{
      let scrollH = Math.abs(pos.y);
      //循环判断
      // console.log(scrollH)
      for(let v of this.divArr){
        if(scrollH >= v.min && scrollH < v.max) this.isShow=v.menuName
      }
    })
  },
  methods: {
    clickMenu(name){
      // 设置菜单的选中样式
      this.isShow = name;
      this.rightBscroll.scrollToElement(('#')+name,1000);
    },
    changeNum(name,val){
      // console.log(name,val)
       this.$store.commit({
         type:'changeCount',
         name,
         val,
       })
    }
  }
};
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.isSelected{
  background-color: #fff;
}
.menuItems{
    padding: 10px;
}
.goods-item{
    padding: 20px 10px;
    display: flex;
    font-size: 5px;
    color: #ccc;
    background: #fff;
    margin-bottom: 5px;
    position: relative;
    h3{
        font-size: 0.7rem;
        color: #4e4e4e
    }
    .description{
        display: inline-block;
        width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .addGoods{
        position: absolute;
        right: 10px;
        bottom: 20px;
    }
}
.isDescription{
    margin-top: -6px;
}
.addGoods{
  display: flex;
  align-items: center;
}
</style>