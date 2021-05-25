// 歌单推荐          全部为POST请求

//公共的data数据comm单独拿出来
export const datacomm = {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":5381,"g_tk":5381}}
// 为你推荐
export const songlisturl1 = "/vkey/cgi-bin/musics.fcg?_=1620905304878&sign=zza7vesoyvx2rlis4f1f1f69bdcb4f30bf0f642294718189"
export const songlistdata1 = {"req_1":{"method":"get_hot_recommend","module":"playlist.HotRecommendServer","param":{"async":1,"cmd":2}}}
// 经典
export const songlisturl2 = "/vkey/cgi-bin/musics.fcg?_=1620956626684&sign=zzaeph08fb4gi3cqkzk7daf315576167169e33a4da9aabb5026"
export const songlistdata2 = {"req_1":{"method":"get_playlist_by_category","module":"playlist.PlayListPlazaServer","param":{"id":59,"curPage":1,"size":40,"order":5,"titleid":59}}}
// 网络歌曲
export const songlisturl3 = "/vkey/cgi-bin/musics.fcg?_=1620956525525&sign=zzalwuwi3w8cdau79360db98250ce5f07eb9cb3dd7e9999142"
export const songlistdata3 = {"req_1":{"method":"get_playlist_by_category","module":"playlist.PlayListPlazaServer","param":{"id":3056,"curPage":1,"size":40,"order":5,"titleid":3056}}}
//轻音乐
export const songlisturl4 = '/vkey/cgi-bin/musics.fcg?_=1620956114887&sign=zzabt30c4nsob58f3be4786c730b6c44098d157918fd0'
export const songlistdata4 = {"req_1":{"method":"get_playlist_by_category","module":"playlist.PlayListPlazaServer","param":{"id":49,"curPage":1,"size":40,"order":5,"titleid":49}}}
//官方歌单
export const songlisturl5 = '/vkey/cgi-bin/musics.fcg?_=1620956309062&sign=zzatxnz31o5pitrx4602deab1dc189a5ccf088e3b3ab5e93f'
export const songlistdata5 = {"req_1":{"method":"get_playlist_by_category","module":"playlist.PlayListPlazaServer","param":{"id":3317,"curPage":1,"size":40,"order":5,"titleid":3317}}}
//情歌         
export const songlisturl6 = '/vkey/cgi-bin/musics.fcg?_=1620983195886&sign=zzaomh8ahf9r283yuld9bcd39d4e8aafe693713e44796c611c1'
export const songlistdata6 = {"req_1":{"method":"get_playlist_by_category","module":"playlist.PlayListPlazaServer","param":{"id":71,"curPage":1,"size":40,"order":5,"titleid":71}}}
// ------------------------------------------------------------------------------------------



// 新歌首发   POST请求 数据没有图片需要用下面的图片接口拼接albumMid来获取图片

//最新
export const newstarurl1 = '/vkey/cgi-bin/musics.fcg?_=1620982587800&sign=zzauk0wp236xkq002908d20a14f99f649246563b34e7d738'
export const newstardata1 = {"req_1":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}}}
//内地
export const newstarurl2 = '/vkey/cgi-bin/musics.fcg?_=1620982442509&sign=zzaz40h6q6059gqza7cd12d56c6aad8eb54262ec7cbb7a07'
export const newstardata2 = {"req_1":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":1}}}
//港台
export const newstarurl3 = '/vkey/cgi-bin/musics.fcg?_=1620982653165&sign=zzavd1pvspm0uinh6fb06ecb873ff9852c6b504d416228307'
export const newstardata3 = {"req_1":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":6}}}
//欧美
export const newstarurl4 = '/vkey/cgi-bin/musics.fcg?_=1620982685029&sign=zzaa8dtq4cj1n3gr83h930d46f578289b0d70ceac2c4261d9d0'
export const newstardata4 = {"req_1":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":2}}} 
//韩国
export const newstarurl5 = '/vkey/cgi-bin/musics.fcg?_=1620982719343&sign=zzazpik0ds1ot782ffa2e313fccddb04888300a17605a'
export const newstardata5 = {"req_1":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":4}}}
//内地
export const newstarurl6 = '/vkey/cgi-bin/musics.fcg?_=1620982755207&sign=zzauykx85g9rtft9328af67ff69a283f1778100218593cd'
export const newstardata6 = {"req_1":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":3}}}
// ----------------------------------------------------------------------------------------------


// 图片接口  即固定地址+albumMid  GET请求
// 固定地址
export const fixedurl = '/ykey/music/photo_new/T002R180x180M000'
// 实例 http://y.gtimg.cn/music/photo_new/T002R180x180M000003c616O2Zlswm.jpg

export const newfixedurl = '/ykey/music/photo_new/T001R150x150M000' // 不行了用这个



// 精彩推荐  找到一位大佬API不用一个一个在用官网的接口了 以下全都是GET请求    大佬API地址 https://jsososo.github.io/QQMusicApi/#/

export const wonderfulurl = '/qkey/recommend/banner'

// 新碟首发         参数:
//                      type:地区分类，默认为 1 // 1：内地，2：港台，3：欧美，4：韩国，5：日本，6：其他
//                      num: 默认 10
export const album = '/qkey/new/album'

// 新碟详情         详情:
//                      albummid: 必填
export const albumdetail = '/qkey/album/songs'

// 排行榜列表分类    参数:
//                 showDetail: 是否显示前三歌曲简单信息和榜单介绍，0，不显示，1 显示，默认 0
export const topurl = '/qkey/top/category'

// 排行榜详情       参数:
//                 id: 默认 4，从上面的列表中取值  更多参数请看大佬API
//                 pageSize: 默认 100  部分接口不支持这个字段，所以这里默认选择100
export const topdetailurl = '/qkey/top'

// MV分类         
export const mvurl = '/qkey/mv/category'

// MV分类列表       参数:
//                 area： 地区，默认 15 全部，具体数值从上面分类接口获取 其他参数参照大佬API
//                 pageSize: 数量 默认20
export const mvlisturl = '/qkey/mv/list'

// 首页结束----------------------------------------------------------------

// 分类歌单  

// 推荐       采用官方接口  POST
export const recommendsonglisturl = '/vkey/cgi-bin/musics.fcg?_=1621329263299&sign=zza3oyu4hh4vywc484453bfa9671e8520b5506f424c3984'
export const recommendsonglistdata = {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":1922604837,"g_tk":1922604837},"req_1":{"method":"get_playlist_by_tag","param":{"id":10000000,"sin":0,"size":20,"order":5,"is_parent":0},"module":"playlist.PlayListPlazaServer"}}
// 最新        采用官方接口  POST
export const newsonglisturl = '/vkey/cgi-bin/musics.fcg?_=1621329262585&sign=zzadbyt0r3s61f7a6360a8dbb8d0f651d73f4b1a8a3209b'
export const newsonglistdata = {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":1922604837,"g_tk":1922604837},"req_1":{"method":"get_playlist_by_tag","param":{"id":10000000,"sin":0,"size":20,"order":2,"is_parent":0},"module":"playlist.PlayListPlazaServer"}}
// 其他歌单             参数：             大佬接口  get
//                          id: 分类id，默认为 3317 // 3317: 官方歌单，59：经典，71：情歌，3056：网络歌曲，64：KTV热歌
//                          pageNo: 页码，默认为 1
//                          pageSize: 每页返回数量，默认为 20
export const othersonglist = '/qkey/recommend/playlist'

// 歌手分类
export const singerlist = '/qkey/singer/category'

// 歌手详情               参数:
//                         singermid: 必填       pageNo: 默认 1   pageSize: 默认 20
export const singerdetail = '/qkey/singer/album'

// 歌手介绍             参数:
//                          singermid: 必填
export const singer = '/qkey/singer/desc'

// 歌手列表              参数:
//                     area: 地区，默认 -100 genre: 风格，默认 -100 index: 首字母，默认 -100 sex: 性别/组合，默认 -100
export const singerlistdata = '/qkey/singer/list' 

// 歌单详情             参数: id必填
export const songlistdetail = '/qkey/songlist'

// 歌词                参数： songid必填
//                           返回的接口中 lyric 和 trans 分别是歌词和翻译，转成了base64，这里node进行了解码。
export const lyric = '/qkey/lyric'

// Mv                 参数:  id      vid必填
export const mvdetailurl = '/qkey/mv/url'

// 关键词搜索            参数: key必填
export const search = '/qkey/search/quick'

// 热搜列表
export const searchhot = '/qkey/search/hot'

// 搜索歌曲              参数: data: 对象，key 为歌曲id，value 为搜索关键词   
export const searchdetail = '/qkey/song/find'

// 播放地址              参数：id   歌曲的mid      
export const plays = '/qkey/song/urls'

