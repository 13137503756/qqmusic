<template>
   <div class="album" >
        <div class="songlisttitle">
           <h2> M    V</h2>
        </div>
        <div class="songlistnav">
            <a v-for="(item,index) in titles" :key="index" :class="['cursor',{active:colors==index}]" @click="getcor(index,item.ids)">{{item.name}}</a>
        </div>
        <el-carousel trigger='click'  class="content" :interval=1000 :autoplay=false arrow="hover" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in newlist" :key="index" >
                <div class="imglist">
                    <div v-for="(item1,index1) in item" :key="index1" class="listcontent">
                        <div @click="mvdetail(item1.vid)">
                            <img :src="item1.picurl?item1.picurl:item1.singers[0].picurl" alt="" class="cursor">
                        </div>
                        <div class="titles" @click="mvdetail(item1.vid)">
                            <div class="cursor">{{item1.title}}</div>
                        </div>
                        <div>
                             <div class="contents cursor" @click="singerdetail(item1.singers[0].mid)">{{item1.singers[0].name}}</div>
                        </div>
                        <div>
                             <div class="contents">播放量:{{item1.playcnt>10000?(item1.playcnt/10000).toFixed(1)+'万':item1.playcnt}}</div>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
   </div>
</template>

<script>
import {mvlisturl} from "../../api/apiall.js"
export default {
    name:'Songlist',
    data(){
        return{
            titles:[
                {
                    name:'精选',
                    ids:'15'
                },
                {
                    name:'内地',
                    ids:'16'
                },
                {
                    name:'港台',
                    ids:'17'
                },
                {
                    name:'欧美',
                    ids:'18'
                },
                {
                    name:'韩国',
                    ids:'19'
                },
                {
                    name:'日本',
                    ids:'20'
                }
            ],
            colors:'',  // tab切换高亮
            list:[],   // 获取数据
            lengths:'',  // 数据的长度用来分割
            newlist:[],  // 分割后新的数组
        }
    },
    created(){
        this.getdatas(15)
    },
    methods:{
        getcor(i,ids){
            this.colors=i
            this.getdatas(ids)      
        },
        getdatas(area=15){
            this.list.length=0
            this.newlist.length=0
            this.axios.get(mvlisturl+`?area=${area}&pageSize=40`).then(res=>{
                // console.log(res,9999999)
                this.list.push(...res.data.data.list)
                this.lengths=Math.ceil(this.list.length/10)
                for(var i=0;i<this.lengths;i++){
                    this.newlist.push(
                        this.list.slice(i*10,(i+1)*10)
                    )
                }
                // console.log(this.newlist,'MV列表')
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
        mvdetail(i){
            this.$router.push({
                path:'/mvdetail',
                query:{
                    vid:i
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
        height: 515px;
    }
    .album>>>.el-carousel__container {
        height: 330px;
    }
    .album>>>.el-carousel__container{
        height: 480px;
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
        height: 250px;
        padding-top:15px ;
        box-sizing: border-box;
    }
    .listcontent>div:nth-of-type(1){
        width:224px ;
        height:127px;
    }
    .listcontent img{
        width: 100%;
        height: 100%;
    }
    .listcontent div{
        margin-bottom: 5px;
    }
    .listcontent>div:nth-of-type(3){
        color: #999;
    }
    .titles>div{
        width: 93%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
</style>