<template>
    <div class="mvdetail">
        <div class="detail">
            <video width="1200" height="700" controls='controls' autoplay='autoplay' :src="newdatas[0]"></video>
        </div>  
    </div>
</template>

<script>
import {mvdetailurl} from '../api/apiall'
export default {
    name:'Mvdetail',
    data(){
        return{
            list:null,
            datas:'',
            newdatas:''
        }
    },
    created(){
        // console.log(this.$route.query.vid,'mv的vid')
       
        this.datas = this.$route.query.vid
        this.axios.get(mvdetailurl+"?id="+this.$route.query.vid).then(res=>{
            // console.log(res,'mv详情')
            this.list={...res.data.data}
            this.newdatas=this.list[this.datas]
            // console.log(this.newdatas)
        }).catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style lang="scss" scoped>
    .mvdetail{
        width: 100%;
        background: #333333;
        min-height: 800px;
        .detail{
            width: 1200px;
            margin: 0 auto;
            height: 700px;
        }
    }
</style>