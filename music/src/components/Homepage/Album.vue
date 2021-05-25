<template>
   <div class="album" >
        <div class="songlisttitle">
           <h2> 新  碟  首  发</h2>
        </div>
        <div class="songlistnav">
            <a v-for="(item,index) in titles" :key="index" :class="['cursor',{active:colors==index}]" @click="getcor(index)">{{item}}</a>
        </div>
        <el-carousel trigger='click'  class="content" :interval=1000 :autoplay=false arrow="hover" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in newlist" :key="index" >
                <div class="imglist">
                    <div v-for="(item1,index1) in item" :key="index1" class="listcontent">
                        <div  @click="albumdetail(item1.mid,item.singers[0].mid)" class="cursor">
                            <img :src="fixedurl+item1.url+'.jpg'" alt="">
                        </div>
                        <div @click="albumdetail(item1.mid,item.singers[0].mid)" class="cursor">{{item1.name}}</div>
                        <div class="contents cursor" @click="singerdetail(item1.singers[0].mid)">{{item1.singers[0].name}}</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
   </div>
</template>

<script>
import {album,fixedurl} from "../../api/apiall.js"
export default {
    name:'Songlist',
    data(){
        return{
            titles:['内地','港台','欧美','韩国','日本','其他'],
            colors:'',  // tab切换高亮
            list:[],   // 获取数据
            lengths:'',  // 数据的长度用来分割
            newlist:[],  // 分割后新的数组
            albummid:[],   // 获取每个数据的albummid用来获取图片
            newalbummid:[], // 跟nwelist数据格式一样
            fixedurl,   // 将api中的图片地址变成本地
        }
    },
    created(){
        this.getdatas(1)
    },
    methods:{
        getcor(i){
            this.colors=i
            this.getdatas(++i)      
        },
        getdatas(type=1){
            this.albummid.length=0
            this.list.length=0
            this.newlist.length=0
            this.newalbummid.length=0
            this.axios.get(album+'?num=20&type='+type).then(res=>{
                this.list.push(...res.data.data.list)
                this.lengths=Math.ceil(this.list.length/10)
                for(var i=0;i<this.lengths;i++){
                    this.newlist.push(
                        this.list.slice(i*10,(i+1)*10)
                    )
                }
                for(var i=0;i<this.list.length;i++){
                    this.albummid.push(
                        this.list[i].photo.pic_mid
                    )
                }
                for(var i=0;i<this.lengths;i++){
                    this.newalbummid.push(
                        this.albummid.slice(i*10,(i+1)*10)
                    )
                }
                for(var i=0;i<this.lengths;i++){
                    for(var k=0;k<this.newlist[i].length;k++){
                        this.newlist[i][k].url=this.newalbummid[i][k]
                    }
                    
                }
                // console.log(this.newlist,'新碟推送')
            }).catch(err=>{
                console.log(err)
            })
        },
        albumdetail(i,k){
           this.$router.push({
               path:'/albumdetail',
               query:{
                   ids:i,
                   singermid:k
               }
               
           })
        },
        singerdetail(i){
           this.$router.push({
               path:'/singerdetail',
               query:{
                   ids:i
               }
               
           })
        }
    }

}
</script>

<style  scoped>
    .album{
        width:100% ;
        position: relative;
        background: linear-gradient(#f2f2f2,#fafafa);
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
    .songlistnav a:hover{
        color:#31c27c
    }
    .active{
        color: #31c27c  !important;
    }
    .cursor{
        cursor: pointer;
    }
    .cursor:hover{
        color: #31c27c  !important;
    }
    /* >>>表示样式穿透 */
    .album>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n+1) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .album>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .album>>>.el-carousel__arrow {
        height: 100px;
        width: 60px;
        color: #555;
        border-radius: 0;
        background-color: rgba(90, 93, 95, 0.21);
        top: 40%;
        font-size: 45px;
    }
    .content{
        width:100%;
        margin:0 auto;
        height: 658px;
    }
    .album>>>.el-carousel__container {
        height: 330px;
    }
    .album>>>.el-carousel__container{
        height: 630px;
    }
    .imglist{
        overflow: hidden;
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
    }
    .listcontent{
        float: left;
        width: 20%;
        height: 315px;
        padding-top:15px ;
        box-sizing: border-box;
    }
    .imglist img{
        width:224px ;
        height: 224px;
    }
    .listcontent div{
        margin-bottom: 5px;
    }
    .listcontent>div:nth-of-type(3){
        color: #999;
    }
    
</style>