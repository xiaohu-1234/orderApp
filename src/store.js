import Vue from 'vue'
import Vuex from 'vuex'
import { getInfo } from './apis/apis';

Vue.use(Vuex)

export default new Vuex.Store({
  //状态：存储状态数据
  state: {
    list: [],
    id: '',
    imgPath: require('../src/assets/imgs/shopCar_0.png'),
    shopCarList: [],
    allPrice:''
  },
  //改变：改变状态数据
  mutations: {
    // 获取id
    changeId(state, val) {
      state.id = val
    },
    initList(state, val) {
      state.list = val;
    },
    changeCount(state, { name, val }) {
      for (let obj of state.list) {
        for (let v of obj.foods) {
          if (v.name === name) {
            v.count += val;
            state.shopCarList.push(v);
            //数组去重
            let obj = {};
            state.shopCarList = state.shopCarList.reduce((cur, next) => {
              obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
              return cur;
            }, []) //设置cur默认类型为数组，并且初始值为空的数组
            //判断当前点击的数量是否为0 如果为0就删除
            if(v.count === 0){
              let index = state.shopCarList.indexOf(v);
              state.shopCarList.splice(index,1)
            }
          }
        }
      }

      // console.log(state.shopCarList);


    }
  },
  //异步改变:可以发送请求
  actions: {
    initList(context) {
      getInfo(`/api/goods?id=${context.state.id}`).then(res => {
        // 添加商品的购物个数
        for (let obj of res.data.data) {
          for (let val of obj.foods) {
            val.count = 0;
          }
        }
        context.commit('initList', res.data.data)
      })
    }
  },
  getters: {
    
    allPrice: state => {
      let res = 0;
      for(let val of state.shopCarList){
          res += val.count*val.price;
      }
      return res;
    }
  }

})

// 1.state:核心概念 state是保存状态的地方
// 2.mutations: 这是改变数据的位移方法 需要通过commit方法来触发mutations里面的函数
      //方式1 直接在commit函数中传入改变的方法名，需要传参的话就是通过其他的参数
      // store.commit('modifyName','李四')
      //方式2 在commit函数中传入一个对象，类似于redux的通知对象
          //  注意这里传的参数，在改变方法中用对象的形式来接收
/* store.commit({
  type:'modifyName', //表示mutations里面的改变函数,
  newName:'哈哈哈'
}) */
// 3.actions:这是可以异步改变state数据，但是不是直接操作state而是通过mutation
      //调用方式式通过store.dispatch方法，也有两种方式和commit一样


