<template>
    <div class="navtop">
        <div class="nav">
            <div>
                <img src="../assets/image/navleft.png" alt="Vue navleft">
            </div>
            <ul>
                <li @click="navone" :class="{navactive:num==0,navhover:num==1}" >音乐馆</li>
                <li @click="navtwo" :class="{navactive:num==1,navhover:num==0}" >我的音乐</li>
                <li class="navhover">客户端</li>
                <li class="navhover">开放平台</li>
                <li class="navhover">VIP</li>
            </ul>
            <div class="positions">
                <div class="nav-ipt" :class='{bdbottom:hotshow}'>
                    <input type="text" placeholder="搜索音乐、MV、歌单、用户" v-model="msg" @focus="shows" @blur="blurs">
                    <div>
                        <img src="../assets/image/sousuo.png" alt="Vue souso">
                    </div>
                </div>
                <transition name="slide-fade">
                <div class="search" v-show="searchshow">
                    <p>专辑</p>
                    <div v-for="(item,index) in searchs.album.itemlist" :key="index" @click="albumdata(item.mid)">
                        {{item.name}}-<span>{{item.singer}}</span>
                    </div>
                    <p>MV</p>
                    <div v-for="(item,index) in searchs.mv.itemlist" :key="'1'+index" @click="mvdata(item.vid)">
                        {{item.name}}-<span>{{item.singer}}</span>
                    </div>
                    <p>歌手</p>
                    <div v-for="(item,index) in searchs.singer.itemlist" :key="'2'+index" @click="singerdata(item.mid)">
                        {{item.name}}
                    </div>
                    <p>单曲</p>
                    <div v-for="(item,index) in searchs.song.itemlist" :key="'3'+index" @click="songdata(item.mid)">
                        {{item.name}}-<span>{{item.singer}}</span>
                    </div>
                </div>
                </transition>
                <transition name="slide-fade">
                <div class="searchhot" v-show='hotshow'>
                    <p v-for="(item,index) in hotmsg" :key="'4'+index" @mouseenter="corfff(index)" @mouseleave="cors(index)"  @click="getdata">
                        <span class="spanone" :class="{cursor:corfffs&&corfffindex==index}">{{index+1}}</span>
                        <span class="spantwo">{{item.k}}</span>
                        <span class="spanthree" :class="{cursor:corfffs&&corfffindex==index}">{{(item.n/10000).toFixed(1)}}万</span>
                    </p>
                </div>
                </transition>
            </div>
            <div class="navright">
                <div class="navhover" @click='alerts()'>登录</div>
                <div class="navvip"  :class="{bdnone:showone}" @mouseenter="showvipenter" @mouseleave="showvipleave">
                    <div class="hovers">
                        开通VIP
                        <img src="../assets/image/downwhite.png" alt="Vue downwhite" class="navvipimg">
                    </div>
                    <div v-show="showone" class="navvipchild hovers" @click='alerts()'>开通绿钻豪华版</div>
                    <div v-show="showone" class="navvipchild hovers" @click='alerts()'>开通付费包</div>
                </div>
                <div class="navpay" @mouseenter="showpayenter" @mouseleave="showpayleave">
                    <div class="hovers  bgcs" :class="{bdnone:showtwo}" @mouseenter="imgenter" @mouseleave="imgleave">
                        充值
                        <img class="navpayimg" :src="imgtab?srcimg[1]:srcimg[0]" alt="Vue downblack">
                    </div>
                    <div v-show="showtwo" class="navpaychild hovers" @click='alerts()'>购买乐币</div>
                    <div v-show="showtwo" class="navpaychild hovers" @click='alerts()'>充值饭票</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {search,searchhot,searchdetail} from '../api/apiall'
export default {
    name:"Nav",
    data(){
        return{
            num:0,
            showone:false,
            showtwo:false,
            bdnone:'',
            corfffs:false,
            corfffindex:'',
            childshow:[0,0,0,0,0],
            imgtab:false,
            msg:'',
            hotmsg:'',     // 热门搜索
            searchs:{
                album:{
                    itemlist:[]
                },
                mv:{
                    itemlist:[]
                },
                singer:{
                    itemlist:[]
                },
                song:{
                    itemlist:[]
                }
            },    // 普通搜索,
            hotshow:false, // 热门搜素是否显示,
            searchshow:false, // 普通搜索是否显示
            srcimg:['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAZElEQVQoU4WOwQ2AMAwD8TxNXnSmdqZ2BGaBV9p5jFIJBFIFfjnyWTGWH0FEti8GqrqS3GcQgAgPVDWRLE8IQDazOgBXCKEASO5J1t57dn8DfojIeNVai1fxBfgeD8zsmAKzoSeO+h3xOzx6hQAAAABJRU5ErkJggg==','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAU0lEQVQoU4XO0Q2AIAyE4ftnkplgJhnBWXSmmiPoAwG9pyb9mh76CRFxfBmDTdK5QAkvIiJL2gdUgNpARwaGTgWKhxd01F4B6TkcgfsYXFMwK3oD1ygZ4H6y/hQAAAAASUVORK5CYII=']
        }
    },
    created(){
        this.axios.get(searchhot).then(res=>{
            var arr1 = res.data.data.reverse().splice(25,res.data.data.length-5)
            this.hotmsg=arr1.reverse()
            // console.log(this.hotmsg,'热门搜索数据')
        }).catch(err=>{
            console.log(err)
        })
    },
    watch:{
        msg:function(news){
            if(news.length!=0){
                this.axios.get(search+"?key="+news).then(res=>{
                    // console.log('搜索数据',res)
                    this.searchs=res.data.data
                    this.searchshow=true
                    console.log(this.searchs)
                }).catch(err=>{
                    console.log(err) 
                })
                
            }else{
                this.searchshow=false
            }
            // console.log(news)
        }
    },
    methods:{
        navone(){
            this.num=0
            console.log(this.num)
        },
        navtwo(){
            this.num=1
            console.log(this.num)
            setTimeout(()=>{
                alert('抱歉,该功能暂未开放')
                this.num=0
            })
        },
        showvipenter(){
            this.showone=true
        },
        showvipleave(){
            this.showone=false
        },
        showpayenter(){
            this.showtwo=true
        },
        showpayleave(){
            this.showtwo=false
        },
        imgenter(){
            this.imgtab=true
        },
        imgleave(){
            this.imgtab=false
        },
        corfff(i){
            this.corfffs=true
            this.corfffindex=i
        },
        cors(i){
            this.corfffs=false
        },
        shows(){
            this.hotshow=true
        },
        blurs(){
            this.hotshow=false
            this.searchshow=false
        },
        getdata(){
           alert('请精确搜索')
        },
        albumdata(i,k=''){
           this.$router.push({
               path:'/albumdetail',
               query:{
                   ids:i,
                   singermid:k
               }
               
           })
           this.$store.dispatch('triggertab',null)
        },
        mvdata(i){
            this.$router.push({
                path:'/mvdetail',
                query:{
                    vid:i
                }
            })
        },
        singerdata(i){
          this.$router.push({
               path:'/singerdetail',
               query:{
                   ids:i
               }
               
           })
        },
        songdata(i){
           this.$router.push({
               path:'/songdetail',
               query:{
                   ids:i
               }
               
           })
           this.$store.dispatch('triggertab',null)
        },
        alerts(){
            alert('抱歉,该功能暂未开放')
        }
    }
}

</script>

<style scoped>
    .bgcs{
        border: 1px solid #c9c9c9;
        border-radius: 3px;
    }
    .nav{
        display: flex;
        width: 1200px;
        margin: 0 auto;
        border-bottom: 1px solid #f2f2f2;
    }
    .nav ul{
        overflow: hidden;
        margin:0 10px 0 15px;
    }
    .nav ul li{
        float: left;
        padding: 0 20px;
        line-height: 90px;
        height: 90px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }
    .navhover:hover{
        color:#31c27c;
        cursor: pointer;
    }
    .nav>div{
        display: flex;
        justify-content: space-around;
    }
    .nav>div>img{
        width:170px;
        height: 46px;
        position: relative;
        top: 22px;
    }
    .nav-ipt{
        display: flex;
        width: 176px;
        border: 1px solid #c9c9c9;
        padding: 0 33px 0 11px;
        line-height: 36px;
        height: 36px;
        margin-top: 26px;
        border-radius: 3px;
        background-color: #fff;
    }
    .nav-ipt input{
        width: 176px;
        height: 36px;
        border: 0 none;
        font-size: 14px;
        outline: none;
    }
    .nav-ipt>div{
        height: 36px;
        width: 0px;
    }
    .nav-ipt>div img{
        position: relative;
        left: 8px;
        top: 2px;
    }
    .navactive{
        background-color: #31c27c;
        color: #fff;
    }
    .navvip{
        background-color: #31c27c;
        width: 118px;
        height: 38px;
        font-size: 13px;
        margin-top: 24px;
        color: #fff;
        text-align: center;
        line-height: 38px;
        border-radius: 3px;
        border: 1px solid #31c27c;
    }
    .navvipchild{
        width: 118px;
        height: 38px;
        font-size: 13px;
        color: #000;
        text-align: center;
        line-height: 38px;
        border: 1px solid #c9c9c9;
        border-top: none;
        position: relative;
        left: -1px;
    }
    .navpay{
        width: 82px;
        /* border: 1px solid #c9c9c9; */
        height: 38px;
        font-size: 13px;
        margin-top: 24px;
        text-align: center;
        line-height: 38px;
       
    }
    .navpaychild{
        width: 80px;
        border: 1px solid #c9c9c9;
        height: 38px;
        font-size: 13px;
        text-align: center;
        line-height: 38px;
        border-top: none;
        position: relative;
        z-index: 99;
    }
    .navright{
        width: 294px;
        line-height: 90px;
    }
    .navright>div{
        margin-left:10px;
    }
    .navright>div:nth-of-type(1){
        margin-left:20px ;
    }
    .navvipimg{
        position: relative;
        left: 20px;
    }
    .navpayimg{
        position: relative;
        left: 10px;
    }
    .hovers:hover{
        background-color: #31c27c;
        color: #fff;
        cursor: pointer;
    }
    .bdnone{
        border-bottom-right-radius:0;
        border-bottom-left-radius:0;
    }
    .positions{
        position: relative;
    }
    .search{
        position: absolute;
        width: 220px;
        left: 0;
        top: 61px;
        border: 1px solid #c9c9c9;
        background:#fff;
        overflow: hidden;
        z-index: 99;
    }
    .search p{
        font-size: 14px;
        color: #999;
        margin: 10px 20px;
    }
    .search div{
        font-size: 14px;
        padding: 10px 30px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow:ellipsis ;
        white-space: nowrap;
    }
    .search div:hover{
        cursor: pointer;
        background: #31c27c;
        color: #fff !important;
    }
    .search div:hover span{
        color: #fff !important;
    }
    .search div span{
        color: #999;
    }
    .searchhot{
        position: absolute;
        width: 220px;
        left: 0;
        top: 61px;
        border: 1px solid #c9c9c9;
        background:#fff;
        /* padding: 10px;
        box-sizing: border-box; */
        overflow: hidden;
        z-index: 88;
    }
    .searchhot p{
        /* margin-bottom: 10px; */
        padding: 10px;
        box-sizing: border-box;
    }
    .searchhot p:hover{
        cursor: pointer;
        background: #31c27c;
        color: #fff !important;
    }
    .spanone{
        color: #ff4222 ;
        font-size: 14px;
    }
    .spantwo{
        font-size: 14px;
        margin-left:10px;
    }
    .cursor{
        color: #fff !important;
        cursor: pointer;
    }
    .spanthree{
        color: #999;
        font-size: 14px;
        float: right;
    }
    .bdbottom{
        border-bottom:0;
    }
    .slide-fade-enter-active {transition: all .2s ease;}
    .slide-fade-leave-active {transition: all .2s ease;}
    .slide-fade-enter, .slide-fade-leave-to{transform: translateY(5px);opacity: 0;}
</style>