<template>
  <div class="navlist">
      <div class="navlistitem">
          <ul>
              <li v-for="(item,index) in list" :key="index" v-bind:class="{active:tabs==index}" @click="updatecolor(index)">{{item}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex' 
export default {
    name:"Navlist",
    data(){
        return{
            list:['首页','歌手','新碟','排行榜','分类歌单','电台','MV','数字专辑','票务'],
        }  
    },
    created(){
        
    },
    methods:{
        updatecolor(i){
            var rout = i==0?'/':i==1?'/singer':i==2?'/album':i==3?'/tops':i==4?'songlist':i==5?'/errs':i==6?'/mv':i==7?'errs':'/errs'
            this.$router.push({
                path:rout
            })
            this.$store.dispatch('triggertab',i)
        } ,
        
    },
    computed:{
        tabs(){
            return this.$store.state.test
        }
        // tabs:state=>state.test
    }
}
</script>

<style lang="scss" scoped>
    .navlistitem{
        width:100% ;
        min-width:1200px;
        height: 50px;
        line-height: 50px;
        ul{
            width: 790px;
            margin: 0 auto;
            overflow: hidden;
            li{
                float: left;
                margin-right:50px;
                font-size: 15px;
            }
            li:hover{
                color: #31c27c;
                cursor: pointer;
            }
        }
        .active{
            color: #31c27c;
        }
    }
   
</style>