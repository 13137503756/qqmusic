<template>
    <div>
        <!-- 音乐馆下边的小导航 -->
        <Navlist></Navlist>
        <router-view></router-view>
    </div>
</template>

<script>
import Navlist from "../components/Homepage/Navlist"
export default {
    name:'Homepage',
    components:{
        Navlist,
    },
}
</script>

<style>

</style>