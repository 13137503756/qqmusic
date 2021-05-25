<template>
    <div class="plays">
        <div class="player">
            <audio :src="playurl" controls id="videoDiv" autoplay></audio>
        </div>
        <div class="detailleft">
            <div class="blacks">
                <span class="spansong" @click="gettime">歌词</span>
            </div>
            <div class="lists">
                <div class="flexone" v-show='engshow==0'>
                    <div v-for="(item,index) in newlyrictext" :key="index" :class="{styles:index==topi}" ref='transforms'>{{item}}</div>
                    <div v-show="shows">暂无歌词</div>
                </div>
                <div class="flextwo" v-show='engshow==1'>
                    <div v-for="(item,index) in newtranstext" :key="index">{{item=='//'?'':item}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { plays,lyric} from "../api/apiall";
export default {
    name: "Plays",
    data() {
        return {
            songmid: "",
            playurl: "",
            newlyric:'',     // 所有歌词
            shows:false,
            newtrans:'',
            newlyrictext:[], // 分离时间提取歌词
            newtranstext:[],
            engshow:0,          
            times:[],          // 分离歌词提取时间 
            minutes:'',      // 获取当前音频的分钟
            seconds:'',      // 获取当前音频的秒钟
            topi:0,        // 歌词数据下标符合显示高亮
        };
    },
    created() {
        // console.log(this.$route.query.ids,'歌曲的mid')
        var reg =  /[\u4e00-\u9fa5]+/   // 匹配中文
        var reg1 =  /[a-zA-z]+/ // 匹配英文
        this.songmid = this.$route.query.ids;
        this.axios
        .get(plays + "?id=" + this.songmid)
        .then((res) => {
            // console.log(res,'歌曲的播放数据')
            this.playurl = res.data.data[this.songmid];
            // console.log(this.playurl, "播放链接");
        })
        .catch((err) => {
            console.log(err);
        });
        this.axios.get(lyric+'?songmid='+this.$route.query.ids).then(res=>{
            // console.log(res,'歌曲详情')
            this.newlyric=res.data.data.lyric.split('\n')
            this.newlyric.join('').split(']').map((item,index)=>{
                if(reg.test(item.split('[')[1])==false){
                    if(reg1.test(item.split('[')[1])==false){
                        this.times.push(item.split('[')[1])
                    }
                    
                }
            })
            // console.log(this.times,'处理后的时间')       //   处理后的时间
            var arr=[]
            this.newlyric.map((item,index)=>{
                if(item.length!=0){
                    arr.push(item.split(']')[1])
                }
            })
            var brr=JSON.parse(JSON.stringify(arr))    // 深拷贝赋值
            var n =0                                   // 声明一个变量用来下边brr数组中每一项的索引一一对应从而删除
            for(var i=0;i<arr.length;i++){
                if(arr[i].length==0){
                    // console.log(arr[i])
                    // console.log(i)
                    brr.splice(i-n,1)
                    ++n
                }else{
                    break
                }
            }
            brr.map((item,index)=>{
                this.newlyrictext.push(item)
            })
            // console.log(this.newlyrictext,'处理后的歌词')
            if(res.data.data.lyric.length<20){
                this.shows=true
            }else{
                this.shows=false
            }
            this.newtrans=res.data.data.trans.split('\n')
            this.newtrans.map((item,index)=>{
                this.newtranstext.push(item.split(']')[1])
            })
        }).catch(err=>{
            console.log(err)
        })
        
       
       
    },
    mounted(){
        //  this.gettime()
         let that = this;
            //监听播放时间
            let musicDom = document.getElementById("videoDiv");//获取Audio的DOM节点
            // let musicDom = document.getElementById("videoDiv");//获取Audio的DOM节点
            // musicDom.play()
            //使用事件监听方式捕捉事件
            musicDom.addEventListener("timeupdate",function(){//监听音频播放的实时时间事件
                let timeDisplay;
                //用秒数来显示当前播放进度
                timeDisplay = Math.floor(musicDom.currentTime);//获取实时时间
                // console.log(timeDisplay)
                //处理时间
                //分钟
                let minute = timeDisplay / 60;
                let minutes = parseInt(minute);
                //秒
                let second = timeDisplay % 60;
                let seconds = Math.round(second);
              
                that.minutes = minutes
                that.seconds = seconds
                // console.log(minutes+'------------------'+seconds)
            },false);
    },
    watch:{
        seconds:function(news,olds){
            // console.log(this.$refs.transforms,'获取dom节点')
            // console.log(news,'获取最新秒数')
            console.log(this.minutes+'------------------'+this.seconds)
            for(var i=0;i<this.times.length;i++){
                
                // console.log(this.times.length,'总长度',i,'i的值')
                // if(parseInt(this.times[i].split(':')[0])==this.minutes&&parseInt(this.times[i].split(':')[1])==this.seconds){
                //     this.topi=i
                //     console.log(this.topi,'高亮的下表索引')
                // }
                if(i<this.times.length-1){
                    if( parseInt(this.times[i].split(':')[0])==this.minutes&&parseInt(this.times[i].split(':')[1])==this.seconds&&parseInt(this.times[i+1].split(':')[0])==this.minutes&&parseInt(this.times[i+1].split(':')[1])>this.seconds){
                        this.topi=i
                        console.log(this.topi,'高亮的下表索引')
                    }
                }else{
                    if(parseInt(this.times[i].split(':')[0])==this.minutes&&parseInt(this.times[i].split(':')[1])==this.seconds){
                        this.topi=i
                        console.log(this.topi,'高亮的下表索引')
                    }
                }
                
            }
            if(this.topi>10){
                for(var i=0;i<this.$refs.transforms.length;i++){
                   this.$refs.transforms[i].style.transform=`translateY(-${(this.topi-10)*15}px)`
                }
            }else{
                for(var i=0;i<this.$refs.transforms.length;i++){
                   this.$refs.transforms[i].style.transform=`translateY(0px)`
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .plays {
        min-height: 790px;
        background:linear-gradient(#d3d8d7,#ffffff);
        width: 100%;
        position: relative;
        .player audio{
            width: 1200px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 50px;
        }
        .detailleft{
            width:1200px;
            font-size: 12px;
            margin: 0 auto;
            text-align: center;
            height: 790px;
            overflow-x: hidden;
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
                margin: 0 auto;
                width: 1218px;
                height: 600px;
                font-size: 14px;
                overflow-x: hidden;
                overflow-y: scroll;
                .flexone{
                    width: 100%;
                    // color: #999;
                    div{
                        position: relative;
                        line-height: 20px;
                    }
                    .styles{
                        font-size: 18px;
                        color: #31c27c;
                    }
                }
                .flextwo{
                    width: 100%;
                }

            }
        }
    }
    
</style>