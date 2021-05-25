<template>
   <div class="newstarurl" >
        <div class="songlisttitle">
           <h2> 新  歌  首  发</h2>
        </div>
        <div class="songlistnav">
            <a v-for="(item,index) in titles" :key="index" :class="['cursor',{active:colors==index}]" @click="getcor(index)">{{item}}</a>
        </div>
        <el-carousel trigger='click'  class="content" :interval=1000 :autoplay=false arrow="hover" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in newlist" :key="index" >
                <div class="imglist">
                    <div v-for="(item1,index1) in item" :key="index1" class="listcontent">
                        <div @click="songdetail(item1.mid,item1.singer[0].mid)" class="cursor">
                            <img :src="fixedurl+item1.url+'.jpg'" alt="">
                        </div>
                        <div>
                            <div class="contents cursor" @click="songdetail(item1.mid,item1.singer[0].mid)">{{item1.title}}{{item1.subtitle}}</div>
                            <div @click="singerdetail(item1.singer[0].mid)" class="cursor">{{item1.singer[0].name}}</div>
                        </div>
                        <div>
                            03.44
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
   </div>
</template>

<script>
import {newstarurl1,newstardata1,newstarurl2,newstardata2,newstarurl3,newstardata3,newstarurl4,newstardata4,newstarurl5,newstardata5,newstarurl6,newstardata6,datacomm,fixedurl} from "../../api/apiall.js"
export default {
    name:'Songlist',
    data(){
        return{
            titles:['最新','内地','港台','欧美','韩国','日本'],
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
        this.getdatas(0)
    },
    methods:{
        getcor(i){
            this.colors=i
            this.list.length=0
            this.newlist.length=0
            this.getdatas(i)      
        },
        getdatas(i){
            var urls = i==0?newstarurl1:i==1?newstarurl2:i==2?newstarurl3:i==3?newstarurl4:i==4?newstarurl5:newstarurl6
            var datas = i==0?newstardata1:i==1?newstardata2:i==2?newstardata3:i==3?newstardata4:i==4?newstardata5:newstardata6
            this.albummid.length=0
            this.list.length=0
            this.newlist.length=0
            this.newalbummid.length=0
            this.axios.post(urls,{...datacomm,...datas}).then(res=>{
                this.list.push(...res.data.req_1.data.songlist)
                this.lengths=Math.ceil(this.list.length/9)
                for(var i=0;i<this.lengths;i++){
                    this.newlist.push(
                        this.list.slice(i*9,(i+1)*9)
                    )
                }
                for(var i=0;i<this.list.length;i++){
                    this.albummid.push(
                        this.list[i].album.mid
                    )
                }
                for(var i=0;i<this.lengths;i++){
                    this.newalbummid.push(
                        this.albummid.slice(i*9,(i+1)*9)
                    )
                }
                for(var i=0;i<this.lengths;i++){
                    for(var k=0;k<this.newlist[i].length;k++){
                        this.newlist[i][k].url=this.newalbummid[i][k]
                    }
                    
                }
                // console.log(this.newlist,'新歌首发列表')
            }).catch(err=>{
                console.log(err)
            })
        },
        singerdetail(i){
            this.$router.push({
                path:'/singerdetail',
                query:{
                    ids:i
                }
            })
        },
        songdetail(i,k){
           this.$router.push({
               path:'/songdetail',
               query:{
                   ids:i,
                   singermid:k
               }
               
           })
        }
    }

}
</script>

<style  scoped>
    .newstarurl{
        width:100% ;
        position: relative;
        background: linear-gradient(#f2f2f2,#fafafa);
        height: 515px;
    }
    /* >>>表示样式穿透 */
    .newstarurl>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n+1) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .newstarurl>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .newstarurl>>>.el-carousel__arrow {
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
        
        /* height: 550px; */
    }
    .newstarurl>>>.el-carousel__container {
        height: 330px;
    }
    .imglist{
        width:1200px ;
        margin: 0 auto;
        /* display: flex; */
        overflow: hidden;
    }
    .listcontent{
        margin-top: 20px;
        display: inline-block;
        height: 100%;
        width: 33%;
        float: left;
        display: flex;
        justify-content: space-between;
    }
    .listcontent img{
        width:85px ;
        height: 85px;
        position: relative;
        top:-9px
    }
    .listcontent>div:nth-of-type(1){
        width:85px ;
        font-size: 14px;
        border-bottom: 1px solid #f2f2f2;
    }
    .listcontent>div:nth-of-type(2){
        width:65% ;
        font-size: 14px;
        color: #999;
        padding: 15px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #f2f2f2;
    }
    .listcontent>div:nth-of-type(3){
        width:45px ;
        margin-right: 20px;
        border-bottom: 1px solid #f2f2f2;
        line-height: 80px;
        color: #999;
        font-size: 14px;
        text-align: center;
    }
    .contents{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000;
        margin-bottom: 5px;
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
        color: #31c27c;
    }
    .active{
        color: #31c27c  !important;
    }
    .cursor{
        cursor: pointer;
    }
    .cursor:hover{
        color: #31c27c;
    }
</style>