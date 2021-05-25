<template>
    <div class="songlistdetail">
        <div class="details">
            <div class="head">
                <div><img :src="details.logo" alt=""></div>
                <div class="headright">
                    <p>{{details.dissname}}</p>
                    <div><img src="../assets/image/Homepage/author.png" alt="Vue author"><span class="cursor">{{details.nickname}}</span></div>
                    <div>标签:<span v-for="(item,index) in details.tags" :key="index">{{item.name}}</span></div>
                    <div>播放量：{{(details.visitnum/10000).toFixed(1)}}万</div>
                    <!-- <div class="plays">播放全部</div> -->
                </div>
            </div>
            <div class="detail">
                <div class="detailleft">
                    <div class="blacks">
                        <span class="spansong">歌曲</span>
                        <span class="spansinger">歌手</span>
                        <span class="spanalbum">专辑</span>
                        <span class="spantime">时长</span>
                        </div>
                    <div class="lists" v-for="(item,index) in details.songlist" :key="index">
                        <div class="flexone">{{++index}}</div>
                        <div class="flextwo cursor" @click="songdetail(item.songmid,item.singer[0].mid)">{{item.songname}}</div>
                        <div class="flexthree cursor" @click="singerdetail(item.singer[0].mid)">{{item.singer[0].name}}</div>
                        <div class="flexfour" cursor>{{item.albumname}}</div>
                        <div class="flexfive">0{{Math.floor(item.interval/60)}}:{{(parseInt(item.interval%60)).toFixed(0)}}</div>
                    </div>
                </div>
                <div class="detailright">
                    <p>简介</p>
                    <div v-html="details.desc"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {songlistdetail} from '../api/apiall'
export default {
    naem:'Songlistdetail',
    data(){
        return{
            details:''
        }
    },
    created(){
        // console.log(this.$route.query.ids,565656)
        this.axios.get(songlistdetail+'?id='+this.$route.query.ids).then(res=>{
            // console.log(res,'歌单详情')
            this.details=res.data.data
        }).catch(err=>{
            console.log(err)
        })
    },
    methods:{
        songdetail(i,k){
           this.$router.push({
               path:'/songdetail',
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
                   ids:i,
               }
               
           })
        }
    }
}
</script>

<style lang="scss" scoped>
    .songlistdetail{
        padding: 50px 0;
        box-sizing: border-box;
        width: 100%;
        background: #fafafa;
        min-height: 800px;
        .details{
            width: 1200px;
            margin: 0 auto;
            .head{
                display: flex;
                margin-bottom: 20px;
                img{
                    width: 250px;
                    height: 250px; 
                }
                .headright{
                    padding: 20px 50px;
                    box-sizing: border-box;
                    div{
                        margin-top:10px ;
                    }
                    img{
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                    }
                    p{
                        font-size: 40px;
                    }
                }
            }
            .detail{
                display: flex;
                .detailleft{
                    width: 900px;
                    font-size: 12px;
                    .blacks{
                        background: #fff;
                        width: 100%;
                        padding: 20px 0;
                        box-sizing: border-box;
                        font-size: 14px;
                    }
                    span{
                        color: #999;
                        display: inline-block;
                    }
                    .spansong{
                        margin-left:85px;  
                    }
                    .spansinger{
                        margin-left:355px;
                    }
                    .spanalbum{
                        margin-left:110px ;
                    }
                    .spantime{
                        margin-left:160px;
                    }
                    .lists{
                        display: flex;
                        height: 80px;
                        font-size: 14px;
                        .flexone{
                            width: 9%;
                            text-align: center;
                            line-height: 80px;
                            color: #999;
                        }
                        .flextwo{
                            width: 43%;
                            line-height: 80px;
                            text-overflow:ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        .flexthree{
                            width: 15%;
                            line-height: 80px;
                            text-overflow:ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        .flexfour{
                            width: 21%;
                            line-height: 80px;
                            text-overflow:ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        .flexfive{
                            // width: 25%;
                            line-height: 80px;
                        }
                    }
                }
                .detailright{
                    font-size: 14px;
                    width: 300px;
                }
            } 
        }
        .cursor:hover{
            color: #31c27c  !important;
            cursor: pointer;
        }
    }
</style>