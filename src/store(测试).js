import Vue from 'vue'
import Vuex from 'vuex'
import {getInfo} from './apis/apis';

Vue.use(Vuex)

const store = new Vuex.Store({
  //状态：存储状态数据
  state: {
     name:'张三',
     list:[],
     peoples:[
      {id:1,age:18},
      {id:2,age:18},
      {id:3,age:18},
      {id:4,age:17},
      {id:5,age:18},
      {id:6,age:18},
      {id:7,age:18},
    
    ]
  },
  //改变：改变状态数据
  mutations: {
      modifyName(state,{newName}){
         state.name = newName
      },
      initList(state,val){
          state.list = val;
      }
  },
  //异步改变:可以发送请求
  actions: {
      initList(concext){
          getInfo('/api/goods').then(res => {
            console.log(res.data.data)
            concext.commit('initList',res.data.data)
          })
      }
  },
  //vuex的计算属性 类似于vue的computed
  getters:{
      getPeo:state => state.peoples.filter(v => v.age>=18)
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
      store.dispatch('initList')
console.log(store)     
export default store;
