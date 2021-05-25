<template>
  <div class="songlist">
      <div class="songlists">
            <div class="nav">
                <div v-for="(item,index) in lists" :key="index" :class="{active:index==tabcolor}" @click="updatacolor(index),getdatas(item.ids)" class="actives">{{item.title}}</div>
            </div>
            <div class="titles">
                <div class="titleleft">全部歌单</div>
                <div>
                    <p class="pone" :class="{bgcolors:colors==true}" @click="updates">推荐</p>
                    <p :class="{bgcolors:colors==false}" @click="updates">最新</p>
                </div>
            </div>
            <div class="lists">
                <div class="content" v-for="(item,index) in datalist" :key="index">
                    <div class="cursor"><img :src="item.cover_url_big" alt="" @click="songlistdetail(item.tid)"></div>
                    <div class="listtitle actives" @click="songlistdetail(item.tid)">{{item.title}}</div>
                    <div class="listcor cursor">{{item.creator_info.nick}}</div>
                    <div class="listcor">播放量:{{(item.access_num/10000).toFixed(1)}}万</div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import {recommendsonglisturl,recommendsonglistdata,newsonglisturl,newsonglistdata,othersonglist} from '../api/apiall'
export default {
    name:'Songlist',
    data(){
        return{
            lists:[
                {
                    title:'官方歌单',
                    ids:3317
                },
                {
                    title:'经典',
                    ids:59
                },
                {
                    title:'情歌',
                    ids:71
                },
                {
                    title:'网络歌曲',
                    ids:3056
                },
                {
                    title:'KTV热歌',
                    ids:64
                }
            ],
            colors:true,
            datalist:[],
            tabcolor:null
        }
    },
    methods:{
        updatacolor(i){
            this.tabcolor=i
        },
        updates(){
            this.tabcolor=null
            this.colors=!this.colors
            this.getdata(this.colors)
        },
        getdata(i){
            var urls = i==true?recommendsonglisturl:newsonglisturl
            var listdata = i==true?recommendsonglistdata:newsonglistdata
            this.axios.post(urls,listdata).then(res=>{
                // console.log(res.data.req_1.data.v_playlist,99999)
                this.datalist=res.data.req_1.data.v_playlist
                // console.log(this.datalist)
            }).catch(err=>{
                console.log(err)
            })
        },
        getdatas(i){
            this.axios.get(othersonglist+'?id='+i).then(res=>{
                this.datalist=res.data.data.list
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
    },
    created(){
        this.getdata(this.colors)
    }
}
</script>

<style lang="scss" scoped>
    .songlist{
        width: 100%;
        background:linear-gradient(#f2f2f2,#fafafa);
        min-height: 800px;
        .songlists{
            width: 1200px;
            margin: 0 auto;
            .nav{
                padding: 30px 0;
                box-sizing: border-box;
                width: 500px;
                // margin: 0 30px;
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                color: #000;
            }
            .titles{
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                box-sizing: border-box;
                .titleleft{
                    font-size: 24px;
                }
                p{
                    border: 1px solid #999;
                    padding: 10px 15px;
                    box-sizing: border-box;
                    display: inline-block;
                    cursor: pointer;
                    font-size: 14px;
                }
                .pone{
                    border-right: 0px solid #000;
                }
                .bgcolors{
                    background-color: #31c27c;
                    color: #fff;
                }

            }
            .lists{
                .content{
                    display: inline-block;
                    width: 20%;
                    padding: 0 10px 10px 0;
                    box-sizing: border-box;
                    position: relative;
                    font-size: 14px;
                    div{
                        margin-bottom: 10px;
                    }
                    img{
                        width: 228px;
                        height: 228px;
                    }
                    .listtitle{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .listcor{
                        color: #999;
                    }
                }
            }
        }
        .active{
            color: #31c27c;
        }
        .actives:hover{
            color: #31c27c;
            cursor: pointer;
        }
        .cursor:hover{
            color: #31c27c !important;
            cursor: pointer;
        }
    }
    
</style>

