<template>
   <div class="tops" >
        <div class="songlisttitle">
           <h2> 新  碟  首  发</h2>
        </div>
        <div class="list">
            <div class="content" v-for="(item,index) in songlist" :key="index">
                <p>巅峰榜</p>
                <p>热歌</p>
                <p>__</p>
                <div v-for="(list,i) in item" :key="i" class="cur">
                    <p>{{i+1}}<span @click="songdetail(item1.mid,item1.singermid)">{{list.names}}</span></p>
                    <p @click="singerdetail(list.singermid)"><span>{{list.singername}}</span></p>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import {topurl,topdetailurl} from "../../api/apiall.js"
export default {
    name:'Tops',
    data(){
        return{
            idlist:[26,27,4,3,16],
            songlist:[[],[],[],[],[]]
        }
    },
    created(){
        this.idlist.map((item,index)=>{
            this.axios.get(topdetailurl+`?id=${item}&pageSize=3`).then(res=>{
            for(var i=0;i<3;i++){
                this.songlist[index].push({
                    names:res.data.data.list[i].title,
                    singername:res.data.data.list[i].singerName,
                    singermid:res.data.data.list[i].singerMid
                })
            }
            // console.log(res.data.data,'排行榜列表')
            }).catch(err=>{
                console.log(err)
            })
        })
    },
    methods:{
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
    .tops{
        width:100% ;
        position: relative;
        background: linear-gradient(#f2f2f2,#fafafa);
        height: 680px;
        color: #fff;
    }
    .songlisttitle{
        min-width: 1200px;
        text-align: center;
        color:#333;
        padding: 30px 0;
        font-size: 20px;
    }
    .active{
        color: #31c27c  !important;
    }
    .cursor{
        cursor: pointer;
    }
    .list{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
    }
    .list>div{
        width: 225px;
        height: 500px;
        padding:50px 40px;
        box-sizing: border-box;
        background-image: url(../../assets/image/Homepage/topbg.jpg);
    }
    .list>div:nth-of-type(3){
        background-position: -224px 0;
    }
    .list>div:nth-of-type(4){
        background-position: -448px 0;
    }
    .list>div:nth-of-type(5){
        background-position: -672px 0;
    }
    .content>p{
        text-align: center;
        font-size: 24px;
        font-weight: 500;
    }
    .content>p:nth-of-type(1){
        font-size: 20px;
        color: rgba(255, 255, 255, 0.7);
    }
    .content>div{
        margin-top: 40px;
        font-size:14px ;
    }
    .content>div>p{
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .content>div>p:nth-of-type(1) span{
        margin-left: 10px;
    }
    .content>div>p:nth-of-type(2) span{
        margin-left: 17px;
    }
    .cur p{
        cursor: pointer;
    }
</style>