//解决axios跨域问题
module.exports={
    devServer:{
        //  设置API访问代理,.proxy 一定要设置 target
        proxy:{
            // '/api':{
            //     target:'https://c.y.qq.com',//第三方接口
            //     changeOrigin:true,//在本地创建虚拟服务器（服务器与服务器交互不会出现跨域问题）
            //     pathRewrite:{//路径重写
            //         '^/api':""
            //     }
            // },
            '/vkey':{
                target:'https://u.y.qq.com',//第三方接口https://u.y.qq.com
                changeOrigin:true,//在本地创建虚拟服务器（服务器与服务器交互不会出现跨域问题）
                pathRewrite:{//路径重写
                    '^/vkey':''
                }
            },
            '/ykey':{
                target:'http://y.gtimg.cn',//第三方接口
                changeOrigin:true,//在本地创建虚拟服务器（服务器与服务器交互不会出现跨域问题）
                pathRewrite:{//路径重写
                    '^/ykey':''
                }
            },
            '/qkey':{
                target:'https://api.qq.jsososo.com',//大佬接口
                changeOrigin:true,//在本地创建虚拟服务器（服务器与服务器交互不会出现跨域问题）
                pathRewrite:{//路径重写
                    '^/qkey':''
                }
            }
        },
        // inline: true, // 用于设置代码保存时是否自动刷新页面
        // hot: true, // 设置代码保存时是否进行热更新（局部刷新，不刷新整个页面）
        // open: false, // 设置 server 启动后是否自动打开浏览器
        // openPage: '', // 指定deserver 编译完成后自动打开的页面
        // https: false, // 设置是否启用https
        port: '8080', // 设置要监听的端口号
        host: '10.50.5.48', // 指定devDerve使用的host，localhost
        // compress: true, // devServer 所有服务启用 gzip 压缩
        // overlay: false, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层 
    }
}