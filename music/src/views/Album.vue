<template>
  <div class="album">
        <div class="albums">
            <div class="titles">
                <div v-for="(item,index) in titles" :key="index" :class="{active:index==colors}" @click="sendid(index)">{{item}}</div>
            </div>
            <div class="lists">
                <div class="content" v-for="(item,index) in datalist" :key="index">
                    <div @click="albumdetail(item.mid,item.singers[0].mid)" class="cursor"><img :src="fixedurl+item.mid+'.jpg'" alt=""></div>
                    <div class="listtitle cursor" @click="albumdetail(item.mid,item.singers[0].mid)">{{item.name}}</div>
                    <div class="listcor cursor" @click="singerdetail(item.singers[0].mid)">{{item.singers[0].name}}</div>
                    <div class="listcor">{{item.release_time}}</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {album,fixedurl} from '../api/apiall'
export default {
    name:'Album',
    data(){
        return{
            titles:['内地','港台','欧美','韩国','日本','其他'],
            colors:0,
            datalist:[],
            fixedurl
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        sendid(i){
            this.colors=i
            this.getdata(++i)
        },
        getdata(i=1){
            this.axios.get(album+'?type='+i).then(res=>{
                // console.log(res,999)
                this.datalist=res.data.data.list
                // console.log(this.datalist,'新碟列表')
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
           this.$store.dispatch('triggertab',null)
        },
        albumdetail(i,k){
           this.$router.push({
               path:'/albumdetail',
               query:{
                   ids:i,
                   singermid:k
               }
               
           })
           this.$store.dispatch('triggertab',null)
        }
    }
}
</script>

<style lang="scss" scoped>
    .album{
        min-height: 800px;
        background: #fafafa;
        .albums{
            width: 1200px;
            margin: 0 auto;
            .titles{
                display: flex;
                justify-content: space-between;
                width: 500px;
                padding: 30px 0;
                box-sizing: border-box;
                div{
                    padding: 5px 10px;
                    box-sizing: border-box;
                }
                div:hover{
                    color:#31c27c;
                    cursor: pointer;
                }
                .active{
                    background: #31c27c;
                    color: #fff !important;
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
        .cursor:hover{
            cursor: pointer;
            color: #31c27c  !important;
        }
    }
</style>

