<template>
    <div class="albumdetail">
        <div class="details">
            <div class="head">
                <div><img :src="newfixedurl+singermid+'.jpg'" alt=""></div>
                <div class="headright">
                    <p>{{singerdetail?singerdetail.singername:'暂无内容'}}</p>
                    <div ><img src="../assets/image/Homepage/author.png" alt="Vue author">外文名:{{english?english:'暂无内容'}}</div>
                    <div class="overs">标签
                        <p v-for="(items,index) in singerdetail" :key="index">{{items?items.key:'暂无内容,请尝试详细搜索'}}:{{items?items.value:'暂无内容'}}</p>
                    </div>
                    <!-- <div>播放量：{{(details.visitnum/10000).toFixed(1)?(details.visitnum/10000).toFixed(1):'暂无内容'}}万</div>-->
                    <div class="play" @click="plays(songmid)"><span class="plays">播放</span></div> 
                </div>
            </div>
            <div class="detail">
                <div class="detailleft">
                    <div class="blacks">
                        <span class="spansong">歌词</span>
                    </div>
                    <div class="lists">
                        <div class="flexone">
                            <div v-for="(item,index) in newlyrictext" :key="index">{{item}}</div>
                            <div v-show="shows">暂无歌词</div>
                        </div>
                        <div class="flextwo">
                            <div v-for="(item,index) in newtranstext" :key="index">{{item=='//'?'':item}}</div>
                        </div>
                    </div>
                </div>
                <div class="detailright">
                    <p>简介</p>
                    <div v-html="details.desc?details.desc:'暂无内容'"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {lyric,singer,newfixedurl,fixedurl} from '../api/apiall'
export default {
    naem:'Albumdetail',
    data(){
        return{
            details:'',
            singerdetail:'',
            singermid:'',
            songmid:'',
            newfixedurl,
            fixedurl,
            english:'',
            desc:'',
            shows:false,
            newlyric:[],     // 每一段分割成数组
            newlyrictext:[],       // 重新处理
            newtrans:[],     // 每一段分割成数组
            newtranstext:[]       // 重新处理
        }
    },
    created(){
        // console.log(this.$route.query.ids,'歌曲mid',this.$route.query.singermid,'歌手mid')
        this.singermid=this.$route.query.singermid
        this.songmid=this.$route.query.ids
        this.axios.get(lyric+'?songmid='+this.$route.query.ids).then(res=>{
            // console.log(res,'歌曲详情')
            this.details=res.data.data
            this.newlyric=this.details.lyric.split('\n')
            this.newlyric.map((item,index)=>{
                this.newlyrictext.push(item.split(']')[1])
            })
            if(res.data.data.lyric.length<20){
                this.shows=true
            }else{
                this.shows=false
            }
            this.newtrans=this.details.trans.split('\n')
            this.newtrans.map((item,index)=>{
                this.newtranstext.push(item.split(']')[1])
            })
            // console.log(this.newlyrictext,'处理后的歌词')
        }).catch(err=>{
            console.log(err)
        })
        this.axios.get(singer+'?singermid='+this.$route.query.singermid).then(res=>{
            // console.log(res,'歌手介绍')
            this.singerdetail=res.data.data.basic.item
            if(res.data.data.basic.item[0].name=='英文名'){
                this.english=res.data.data.basic.item[0].value
            }else{
                this.english='暂无外文名'
            }
            
            this.desc=res.data.data
        }).catch(err=>{
            console.log(err)
        })
    },
    methods:{
        plays(i){
            // console.log(this.singermid,'发送的歌手mid')
            this.$router.push({
                path:'/plays',
                query:{
                    ids:i
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
                        max-height:138px ;
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
                    .play{
                        margin-top:20px ;
                        .plays{
                            padding: 10px 30px;
                            box-sizing: border-box;
                            // font-size: 20px;
                            background: #31c27c;
                            color: #fff;
                            cursor: pointer;
                        }
                    }
                }
            }
            .detail{
                display: flex;
                .detailleft{
                    width: 900px;
                    font-size: 12px;
                    .blacks{
                       
                        width: 100%;
                        padding: 20px 0;
                        box-sizing: border-box;
                        font-size: 14px;
                    }
                    // span{
                    //     // color: #999;
                    // }
                    .lists{
                       
                        display: flex;
                        height: 97%;
                        font-size: 14px;
                        overflow: hidden;
                        .flexone{
                            width: 50%;
                            // color: #999;
                        }
                        .flextwo{
                            width: 50%;
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
    }
</style>