<template>
  <div class="tops">
        <div class="content">
            <div class="contentleft">
                <div v-for="(item,index) in datalist" :key="index" class="every">
                    <div class="titles">{{item.title}}</div>
                    <div class="country">
                        <p v-for="(lists,i) in item.list" :key="i" @click="getdata(lists.topId)" :class="{colors:cors==lists.topId}">{{lists.label}}</p>
                    </div>
                </div>
            </div>
            <div class="contentright">
                <div class="contenttitle">
                    <span class="spanone">流行指数榜</span>
                    <span class="spantwo">2021-05-18</span>
                    <span class="spanthree">榜单规则</span>
                </div>
                <div>
                    <div class="blacks"><span class="spansong">歌曲</span><span class="spansinger">歌手</span><span class="spantime">时长</span></div>
                    <div class="lists" v-for="(item,index) in toplistdata" :key="index">
                        <div class="flexone">{{item.rank}}</div>
                        <div class="flextwo">
                            <div>
                                <div><img src="../assets/image/Homepage/up.png" alt="Vue up"></div>
                                <div>{{item.rankValue}}</div>
                            </div>
                        </div>
                        <div class="flexthree" @click='albumdetail(item.albumMid,item.singerMid)'><img :src="fixedurl+item.albumMid+'.jpg'" alt=""></div>
                        <div class="flexfour cursor" @click="songdetail(item.mid,item.singerMid)">{{item.name}}</div>
                        <div class="flexfive cursor" @click='singerdetail(item.singerMid)'>
                            <!-- <img src="../assets/image/Homepage/play.png" alt="Vue play"> -->
                            {{item.singerName}}</div>
                        <div class="flexsix">0{{Math.floor(item.interval/60)}}:{{(parseInt(item.interval%60)).toFixed(0)}}</div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {topurl,topdetailurl,fixedurl} from '../api/apiall'
export default {
    name:'Tops',
    data(){
        return{
            datalist:[],
            ids:4,
            toplistdata:[],
            fixedurl,
            cors:4
        }
    },
    created(){
        this.axios.get(topurl).then(res=>{
            // console.log(res)
            this.datalist=res.data.data
            // console.log(this.datalist)
        }).catch(err=>{
            console.log(err)
        })
        this.getdata()
    },
    methods:{
        getdata(i=4){
            // console.log(888888,i)
            this.cors=i
            this.axios.get(topdetailurl+'?id='+i+'&pageSize=20').then(res=>{
                // console.log(9999,res)
                this.toplistdata=res.data.data.list
                // console.log('排行榜列表',this.toplistdata)
            }).catch(err=>{
                console.log(err)
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
        },
        singerdetail(i){
           this.$router.push({
               path:'/singerdetail',
               query:{
                   ids:i,
               }
               
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .tops{
        width: 100%;
        background:#fafafa;
        padding: 60px 0;
        box-sizing: border-box;
        min-height: 800px;
        .content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            .contentleft{
                width: 180px;
                margin-right:20px ;
                border: 1px solid hsla(0,0%,60%,.2);
                .every{
                    margin-bottom:20px ;
                    .country{
                        font-size: 15px;
                        p{
                            width: 100%;
                            height: 40px;
                            cursor: pointer;
                            padding-left:10px ;
                            box-sizing: border-box;
                            line-height: 40px;
                        }
                        p:hover{
                            color: #31c27c;
                        }
                        .colors{
                            background: #31c27c;
                            color: #fff  !important;
                        }
                    }
                    .titles{
                        width: 90%;
                        margin-bottom:10px;
                        padding: 10px 10px 15px;
                        border-bottom: 1px solid hsla(0,0%,60%,.2);
                        font-size: 20px;
                    }
                }
                
            }
            .contentright{
                width: 1000px;
                .contenttitle{
                    margin: 10px 0;
                    .spanone{
                        font-size: 20px;
                    }
                    .spantwo{
                        margin: 0 20px;
                        color: #999;
                        font-size: 15px;
                    }
                    .spanthree{
                        font-size: 15px;
                    }
                }
                
                .blacks{
                    background: #fff;
                    width: 100%;
                    padding: 20px 0;
                    box-sizing: border-box;
                    font-size: 14px;
                }
                .spansong{
                    margin-left:135px;
                    display: inline-block;
                    color: #999;
                }
                .spansinger{
                    margin-left:530px;
                    display: inline-block;
                    color: #999;
                }
                .spantime{
                    margin-left:220px;
                    display: inline-block;
                    color: #999;
                }
                .lists{
                    display: flex;
                    height: 80px;
                    .flexone{
                        width: 8%;
                        text-align: center;
                        color:#ff4222;
                        font-size: 24px;
                        line-height: 80px;
                    }
                    .flextwo{
                        width: 5%;
                        font-size: 12px;
                        text-align: center;
                        padding-top: 25px;
                        box-sizing:border-box;
                    }
                    .flexthree{
                        width: 11%;
                        padding-top: 25px;
                        box-sizing:border-box;
                        img{
                            width: 40px;
                            height: 40px;
                        }
                    }
                    .flexfour{
                        width: 45%;
                        line-height: 80px;
                        text-overflow:ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .flexfive{
                        width: 25%;
                        line-height: 80px;
                    }
                    .flexsix{
                        width: 6%;
                        line-height: 80px;
                        color: #999;
                    }
                }
            }
        }
        .cursor:hover{
            color: #31c27c  !important;
            cursor: pointer;
        }
    }
</style>
