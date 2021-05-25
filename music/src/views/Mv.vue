<template>
    <div class="mv">
        <div class="mvs">
            <div v-for="(item,index) in singertype" :key="index" class="titles">
                <div v-for="(list,i) in item" :key="i" :class="{active:colors[index=='area'?0:1]==i}" @click="updatas(index,i,list.id)">{{list.name}}</div>
            </div>
        </div>
        <div class="head">全部MV</div>
        <div class="singerlist">
            <div class="lists">
                <div v-for="(item,index) in singerlists" :key="index">
                    <img :src="item.picurl" alt="" @click="mvdetail(item.vid)">
                    <p class="pone cursor" @click="mvdetail(item.vid)">{{item.title}}</p>
                    <p class="ptwo cursor" @click="singerdetail(item.singers[0].mid)">{{item.singers[0].name}}</p>
                    <p class="pthree">播放量:   {{item.playcnt}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mvurl,mvlisturl} from '../api/apiall'
export default {
    name:'Mv',
    data(){
        return{
            singertype:'',
            colors:[0,0],
            num:0,
            ids:[15,7],
            singerlists:[],
            newsingerlist:[],
            imgstatus:false
        }
    },
    created(){
        this.getdata()
        this.getdatas()
    },
    methods:{
        updatas(k,i,ids){
            this.num = k=='area'?0:1
            this.colors.splice(this.num,1,i)
            this.ids.splice(this.num,1,ids)
            this.getdatas()
        },
        getdata(){
            this.axios.get(mvurl).then(res=>{
                this.singertype=res.data.data
            }).catch(err=>{
                console.log(err)
            })
        },
        getdatas(){
            this.axios.get(mvlisturl+`?area=${this.ids[0]}&version=${this.ids[1]}`).then(res=>{
                // console.log('MV详情',res)
                this.singerlists.length=0
                for(var i=0;i<res.data.data.list.length;i++){
                    if(res.data.data.list[i].picurl.length==0){
                        continue;
                    }else if(res.data.data.list[i].picurl){
                        this.singerlists.push(res.data.data.list[i])
                    }
                }
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

<style lang="scss" scoped>
    .mv{
        width: 100%;
        min-height: 800px;
        background: #fafafa;
        .mvs{
            width: 1200px;
            padding: 50px 0;
            box-sizing: border-box;
            margin: 0 auto;
            .titles{
                display: flex;
                font-size: 14px;
                margin-bottom: 10px;
                div{
                    padding: 5px 10px;
                    box-sizing: border-box;
                    margin-right: 20px;
                    cursor: pointer;
                }
                div:nth-of-type(1){
                    margin-right: 40px;
                }
                div:hover{
                    color: #31c27c;
                }
                .active{
                    padding: 5px 10px;
                    box-sizing: border-box;
                    background: #31c27c;
                    // line-height: 19px;
                    color: #fff !important;
                }
            }
            div:nth-of-type(3){
                div{
                    margin-right: 12px;
                }
                div:nth-of-type(1){
                    margin-right: 40px;
                }
            }
        }
        .head{
            width: 1200px;
            margin:0 auto;
        }
        .singerlist{
            width: 1200px;
            margin: 0 auto;
            .lists{
                display: flex;
                flex-wrap: wrap;
                // text-align: center;
                div{
                    width: 25%;
                    margin-bottom: 20px;
                    img{
                        width: 285px;
                        height: 160px;
                    }
                    p{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin:10px 0 ;
                        font-size: 14px;
                        color: #999;
                    }
                    .pone{
                        color:#000;
                        width:90%
                    }
                }
            }
        }
        .cursor:hover{
            cursor: pointer;
            color: #31c27c;
        }
    }
</style>