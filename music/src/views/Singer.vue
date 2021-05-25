<template>
    <div class="singer">
        <div class="singerbg">万千歌手        近在眼前</div>
        <div class="singers">
            <div v-for="(item,index) in singertype" :key="index" class="titles">
                <div v-for="(list,i) in item" :key="i" :class="{active:colors[index=='area'?0:index=='genre'?1:index=='index'?2:3]==i}" @click="updatas(index,i,list.id)">{{list.name}}</div>
            </div>
        </div>
        <div class="singerlist">
            <div class="lists">
                <div v-for="(item,index) in singerlists" :key="index">
                    <img :src="imgstatus==false?item.singer_pic:''" alt="" @click="singerdetail(item.singer_mid)" class="cursor">
                    <p @click="singerdetail(item.singer_mid)" class="cursor">{{item.singer_name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {singerlist,singerlistdata,fixedurl} from '../api/apiall'
export default {
    name:'Singer',
    data(){
        return{
            singertype:'',
            colors:[0,0,0,0],
            num:0,
            ids:[-100,-100,-100,-100],
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
            this.num = k=='area'?0:k=='genre'?1:k=='index'?2:3
            this.colors.splice(this.num,1,i)
            this.ids.splice(this.num,1,ids)
            this.getdatas()
        },
        getdata(){
            this.axios.get(singerlist).then(res=>{
                this.singertype=res.data.data
                // console.log(777,this.singertype)
            }).catch(err=>{
                console.log(err)
            })
        },
        getdatas(){
            this.axios.get(singerlistdata+`?area=${this.ids[0]}&genre=${this.ids[1]}&index=${this.ids[2]}&sex=${this.ids[3]}`).then(res=>{
                // console.log(999,res)
                if(this.ids[2]!=-100){
                    this.imgstatus=true
                }else{
                    this.imgstatus=false
                }
                // console.log(this.ids[2],this.imgstatus)
                this.singerlists=res.data.data.list
                // console.log(this.singerlists,'歌手列表')
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .singer{
        width: 100%;
        min-height: 800px;
        background: #fafafa;
        .singerbg{
            background:url(../assets/image/Homepage/singerbg.jpg);
            width: 100%;
            height: 375px;
            min-width: 1200px;
            background-position: 100% 100%;
            font-size: 60px;
            color: #fff;
            text-align: center;
            line-height: 375px;
        }
        .singers{
            width: 1200px;
            margin: 50px auto;
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
        .singerlist{
            width: 1200px;
            margin: 0 auto;
            .lists{
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                div{
                    width: 20%;
                    margin-bottom: 20px;
                    p{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin:20px 0 ;
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