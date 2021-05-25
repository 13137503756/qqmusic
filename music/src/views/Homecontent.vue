<template>
    <div>
        <!-- 歌单推荐 -->
        <Songlist></Songlist>
        <!-- 新歌首发 -->
        <Newstar></Newstar>
        <!-- 精彩推荐 -->
        <Wonderful></Wonderful>
        <!-- 新碟首发 -->
        <Album></Album>
        <!-- 排行榜 -->
        <Tops></Tops>
        <!-- Mv -->
        <Mv></Mv>
    </div>
</template>

<script>
import Songlist from "../components/Homepage/Songlist"
import Newstar from "../components/Homepage/Newstar"
import Wonderful from "../components/Homepage/Wonderful"
import Album from "../components/Homepage/Album"
import Tops from "../components/Homepage/Tops"
import Mv from "../components/Homepage/Mv"
export default {
    name:'Homecontent',
    components:{
        Newstar,
        Songlist,
        Wonderful,
        Album,
        Tops,
        Mv
    }
}
</script>

<style>

</style>