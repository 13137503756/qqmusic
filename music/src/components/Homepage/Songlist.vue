<template>
   <div class="songlist" >
        <div class="songlisttitle">
           <h2> 歌  单  推  荐</h2>
        </div>
        <div class="songlistnav">
            <a v-for="(item,index) in titles" :key="index" :class="['cursor',{active:colors==index}]" @click="getcor(index)">{{item}}</a>
        </div>
        <el-carousel trigger='click'  class="content" :interval=1000 :autoplay=false arrow="hover" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in newlist" :key="index" >
                <div class="imglist">
                    <div v-for="(item1,index1) in item" :key="index1" class="listcontent">
                        <img :src="nums==1?item1.cover:item1.cover_url_big" alt="" @click="songlistdetail(nums==1?item1.content_id:item1.tid)" class="cursor">
                        <div @click="songlistdetail(nums==1?item1.content_id:item1.tid)" class="cursor">{{item1.title}}</div>
                        <div>播放量:{{((nums==1?item1.listen_num:item1.access_num)/10000).toFixed(1)}}万</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
   </div>
</template>

<script>
import {songlisturl1,songlistdata1,songlisturl2,songlistdata2,songlisturl3,songlistdata3,songlisturl4,songlistdata4,songlisturl5,songlistdata5,songlisturl6,songlistdata6, datacomm} from "../../api/apiall.js"
export default {
    name:'Songlist',
    data(){
        return{
            titles:['为你推荐','经典国语','经典','轻音乐','官方歌单','情歌'],
            colors:'',
            list:[],
            lengths:'',
            newlist:[],
            nums:1

            
        }
    },
    created(){
        this.getdata(1)
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
            this.axios.post(songlisturl1,{...datacomm,...songlistdata1}).then(res=>{
                // console.log(res,'歌单推荐列表')
                this.list.push(...res.data.req_1.data.v_hot)
                this.lengths=Math.ceil(this.list.length/5)
                for(var i=0;i<this.lengths;i++){
                    this.newlist.push(
                        this.list.slice(i*5,(i+1)*5)
                    )
                    this.nums=1
                }
                // console.log(this.newlist,88888)
            }).catch(err=>{
                console.log(err)
            })
        },
        getdatas(i){
            var urls = i==1?songlisturl2:i==2?songlisturl3:i==3?songlisturl4:i==4?songlisturl5:songlisturl6
            var datas = i==1?songlistdata2:i==2?songlistdata3:i==3?songlistdata4:i==4?songlistdata5:songlistdata6
            this.axios.post(urls,{...datacomm,...datas}).then(res=>{
                // console.log(res,222)
                this.list.push(...res.data.req_1.data.v_playlist)
                this.lengths=Math.ceil(this.list.length/5)
                for(var i=0;i<this.lengths;i++){
                    this.newlist.push(
                        this.list.slice(i*5,(i+1)*5)
                    )
                    this.nums=2
                }
                // console.log(this.newlist,88888)
            }).catch(err=>{
                console.log(err)
            })
        },
        songlistdetail(i){
           this.$router.push({
               path:'/songlistdetail',
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
    .songlist{
        width:100% ;
        position: relative;
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    /* >>>表示样式穿透 */
    .songlist>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n+1) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .songlist>>>.el-carousel__item[data-v-2c3a3d39]:nth-child(2n) {
        background: linear-gradient(#f2f2f2,#fafafa);
    }
    .songlist>>>.el-carousel__arrow {
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
        height: 330px;
    }
    .imglist{
        width:1200px ;
        margin: 0 auto;
        display: flex;
    }
    .imglist>div{
        margin-left: 30px;
        height: 100%;
        widows: 220px;
    }
    .imglist>div img{
        width:225px ;
        height: 225px;
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
    .listcontent div:nth-of-type(1){
        font-size: 14px;
        margin:10px 0 5px  ;
    }
    .listcontent div:nth-of-type(2){
        font-size: 14px;
        color: #999;
    }
</style>