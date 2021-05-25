<template>
    <div class="albumdetail">
        <div class="details">
            <div class="head">
                <div><img :src="fixedurl+singermid+'.jpg'" alt="" class="cursor"></div>
                <div class="headright">
                    <p>{{singerdetail?singerdetail.singername:'暂无内容'}}</p>
                    <div ><img src="../assets/image/Homepage/author.png" alt="Vue author">英文名:<span class="cursor">{{english?english:'暂无内容'}}</span></div>
                    <div class="overs">标签
                        <p v-for="(items,index) in singerdetail" :key="index">{{items?items.key:'暂无内容'}}:{{items?items.value:'暂无内容'}}</p>
                    </div>
                    <!-- <div>播放量：{{(details.visitnum/10000).toFixed(1)?(details.visitnum/10000).toFixed(1):'暂无内容'}}万</div>
                    <div class="plays">播放全部</div> -->
                </div>
            </div>
            <div class="detail">
                <div class="detailleft">
                    <div class="blacks">
                        <span class="spansong">歌曲</span>
                        <!-- <span class="spansinger">歌手</span> -->
                        <span class="spanalbum">歌手</span>
                        <span class="spantime">时长</span>
                        </div>
                    <div class="lists" v-for="(item,index) in details" :key="index">
                        <div class="flexone">{{++index}}</div>
                        <div class="flextwo cursor" @click="songdetail(item.mid,item.singer[0].mid)">{{item.title}}</div>
                        <!-- <div class="flexthree">{{item.singer_name}}</div> -->
                        <div class="flexfour cursor">{{item.singer[0].name}}</div>
                        <div class="flexfive">
                            0{{Math.floor(item.interval/60)}}:{{(parseInt(item.interval%60)).toFixed(0)}}
                            <!-- {{item.pub_time}} -->
                        </div>
                    </div>
                </div>
                <div class="detailright">
                    <p>简介</p>
                    <div v-html="desc?desc.desc:'暂无内容'"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {albumdetail,singer,newfixedurl,fixedurl} from '../api/apiall'
export default {
    naem:'Albumdetail',
    data(){
        return{
            details:'',
            singerdetail:'',
            singermid:'',
            newfixedurl,
            fixedurl,
            english:'',
            desc:''
        }
    },
    created(){
        // console.log(this.$route.query.ids,'专辑，新碟mid',this.$route.query.singermid,'歌手mid')
        this.singermid=this.$route.query.ids
        this.axios.get(albumdetail+'?albummid='+this.$route.query.ids).then(res=>{
            // console.log(res,'专辑列表，新碟列表')
            this.details=res.data.data.list
            // console.log(this.details)
        }).catch(err=>{
            console.log(err)
        })
        this.axios.get(singer+'?singermid='+this.$route.query.singermid).then(res=>{
            // console.log(res,'歌手介绍')
            this.singerdetail=res.data.data.basic.item
            this.english=res.data.data.basic.item[0].value
            this.desc=res.data.data
            // console.log(this.desc,111)
        }).catch(err=>{
            console.log(err)
        })
        
        // console.log('我也触发了')
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
        }
    }

}
</script>

<style lang="scss" scoped>
    .albumdetail{
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
                width: 1200px;
                img{
                    width: 250px;
                    height: 250px; 
                }
                .headright{
                    padding: 20px 50px;
                    box-sizing: border-box;
                    width: 1000px;
                    max-height: 250px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .overs{
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        p{
                          font-size: 14px;  
                        }
                    }
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
                    // .spansinger{
                    //     margin-left:355px;
                    // }
                    .spanalbum{
                        margin-left:465px ;
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
                            width: 55%;
                            line-height: 80px;
                        }
                        // .flexthree{
                        //     width: 15%;
                        //     line-height: 80px;
                        //     text-overflow:ellipsis;
                        //     overflow: hidden;
                        //     white-space: nowrap;
                        // }
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
                    padding-left: 20px;
                    box-sizing: border-box;
                    font-size: 14px;
                    width: 300px;
                }
            } 
        }
        .cursor:hover{
            cursor: pointer;
            color: #31c27c;
        }
    }
</style>