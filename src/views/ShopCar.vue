<template>
  <div class="shopList">
    <div class="shopCarTitle">
      <h3>满足起步价</h3>
    </div>
    <div class="clickDiv">
      <span>购物车</span>
      <button>清空购物车</button>
    </div>
    <div class="showList" v-for="(item,i) in showShopCarList" :key="i">
      <div class="content">{{item.name}}</div>
      <div class="allPrice">{{item.price * item.count}}</div>
      <div class="getNum">
        <Button size="small" shape="circle" icon="md-remove" @click="changeCount(item.name,-1)"></Button>
        <span style="margin:0 5px">{{item.count}}</span>
        <Button
          type="primary"
          size="small"
          shape="circle"
          icon="md-add"
          @click="changeCount(item.name,1)"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showShopCarList() {
      return this.$store.state.shopCarList;
    }
  },
  methods: {
    changeCount(name, val) {
      this.$store.commit({
        type: "changeCount",
        name,
        val
      });
    }
  }
};
</script>

<style lang="less" scoped>
.shopList {
  position: fixed;
  bottom: 60px;
  //   height: 300px;
  width: 100%;
  background: #ccc;
  .shopCarTitle {
    text-align: center;
  }
  .clickDiv {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    button {
      border: none;
      outline: none;
      background: #fff;
    }
  }
  .showList {
    display: flex;
    padding: 10px;
     justify-content: space-between;
    align-items: center;
    .content {
      width: 50%;
    }
    .allPrice {
      width: 20%;
    }
    .getNum {
      width: 30%;
      text-align: right;
    }
  }
}
</style>