<template>
   <div class="wonderful" >
        <div class="songlisttitle">
           <h2> 精  彩  推  荐</h2>
        </div>
        <el-carousel trigger='click'  class="content" :interval=1000 :autoplay=false arrow="hover" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in newlist" :key="index" >
                <div class="imglist">
                    <div v-for="(item1,index1) in item" :key="index1" class="listcontent" @click="albumdetail(item1.singer[0].mid)">
                        <img :src="item1.picUrl" alt="">
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
   </div>
</template>

<script>
import {wonderfulurl} from "../../api/apiall.js"
export default {
    name:'Wonderful',
    data(){
        return{
            list:'',
            lengths:'',
            newlist:[],
        }
    },
    created(){
        this.getdata() 
    },
    methods:{
        getcor(i){
            this.colors=i
            if(i==0){
                this.list.length=0
                this.newlist.length=0
                this.getdata()
            }else{
                this.list.length=0
                this.newlist.length=0
                this.getdatas(i)   
            }      
        },
        getdata(){
            this.axios.get(wonderfulurl).then(res=>{
                this.list=res.data.data
                this.lengths=Math.ceil(this.list.length/2)
                for(var i=0;i<this.lengths;i++){
                    this.newlist.push(
                        this.list.slice(i*2,(i+1)*2)
                    )
                }
                // console.log(this.newlist)
            }).catch(err=>{
                console.log(err)
            })
        },
        albumdetail(i){
           this.$router.push({
               path:'/albumdetail',
               query:{
                   ids:i
               }
               
           })
           this.$store.dispatch('triggertab',null)
        }
    }

}
</script>

<style  scoped>
    .wonderful{
        width:100% ;
        position: relative;
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    /* >>>表示样式穿透 */
    .wonderful>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n+1) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .wonderful>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .wonderful>>>.el-carousel__arrow {
        height: 100px;
        width: 60px;
        color: #555;
        border-radius: 0;
        background-color: rgba(90, 93, 95, 0.21);
        top: 40%;
        font-size: 45px;
    }
    .wonderful>>>.el-carousel__container{
        height: 220px;
    }
    .content{
        width:100%;
        margin:0 auto;
        height: 250px;
    }
    .imglist{
        width:1200px ;
        height: 210px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
    }
    .imglist>div{
        /* margin-left: 30px; */
        height: 100%;
        widows: 220px;
    }
    .imglist>div img{
        width:510px;
        height: 204px;
    }
    .imglist>div img:hover{
        cursor: pointer;
    }
    .imglist>div div{
        width:200px ;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .songlisttitle{
        min-width: 1200px;
        text-align: center;
        color:#333;
        padding: 30px 0;
        font-size: 20px;
    }
    .songlistnav{
        width:1200px ;
        margin: 5px auto 30px;
        text-align: center;
    }
    .songlistnav a{
        font-size: 15px;
        margin: 0 24px;
        color: #333;
    }
    .active{
        color: #31c27c  !important;
    }
    .cursor{
        cursor: pointer;
    }
    .listcontent{
        cursor: pointer;
    }
    .listcontent div:nth-of-type(1){
        font-size: 14px;
        margin:10px 0 5px  ;
    }
    .listcontent div:nth-of-type(2){
        font-size: 14px;
        color: #999;
    }
</style>