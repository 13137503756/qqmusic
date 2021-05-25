<template>
    <div class="footer" v-show="shows">
        <div class="bottom">
            <div class="b-one">
                <div>下载QQ音乐客户端</div>
                <div class="fex">
                    <div>PC版</div>
                    <div>Mac版</div>
                    <div>Android版</div>
                    <div>iPone版</div>
                </div>
                <div>开放平台</div>
                <div>QQ音乐开放平台  腾讯音乐人</div>
            </div>
            <div class="b-two">
                <div>特色产品</div>
                <div class="fex">
                    <div>全民K搁</div>
                    <div>Super sound</div>
                    <div>QPlay</div>
                    <div>Fan直播伴侣</div>
                </div>
                <div>TME集团官网</div>
                <div>腾讯音乐</div>
            </div>
            <div class="b-three">
                <div>合作链接</div>
                <div>
                    <span>CJ ENM</span>
                    <span>腾讯视频</span>
                    <span>手机QQ空间</span>
                </div>
                <div>
                    <span>最新版QQ</span>
                    <span>腾讯社交广告</span>
                    <span>电脑管家</span>
                </div>
                <div>
                    <span>QQ浏览器</span>
                    <span>腾讯微云</span>
                    <span>腾讯云</span>
                </div>
                <div>
                    <span>企鹅FM</span>
                    <span>智能电视网</span>
                    <span>当贝市场</span>
                </div>
            </div>
        </div>
        <div class="footers">
            <div>关于腾讯|About  Tencent|服务条款|用户服务协议|隐私政策|权利声明|广告服务|腾讯招聘|客服中心|网站导航</div>
            <div>Copyright @ 1998 - 2021 Tencent.All Rights Reserved.</div>
            <div>腾讯公司  版权所有  网络文化经营许可证:粤网文|2018|6725-2386号</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Footer',
    data(){
        return{
            shows:true
        }
    },
    watch:{
        $route:function(news){
            if(news.name=='Plays'){
                this.shows=false
            }else{
                this.shows=true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .footer{
        width: 100%;
        height: 650px;
        background-color: #333;
        color: #7f7f7f;
        .bottom{
            width: 1200px;
            margin: 0 auto;
            // height: 100%;
            // border: 1px solid #fff;
            display: flex;
            justify-content: space-between;
            >div{
                width: 33%;
                height: 540px;
                // border: 1px solid #fff;
                padding: 90px 0 0 10px;
                box-sizing: border-box;
            }
            .fex{
                display: flex;
            }
            // .b-one .b-two .b-three{
                
            // }
        }
        .footers{
            text-align: center;
            font-size: 14px;
            
        }
    }
</style>>