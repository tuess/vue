// 导入http内置模块
const http = require('http')
// 解析get请求
const urlModule = require('url')

// 创建一个http服务器
const server = http.createServer()

// 监听http服务器的request请求
server.on('request',function(req,res){
    //   设置头允许跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*");

    // const url = req.url

    const{pathname:url,query} = urlModule.parse(req.url,true)

    if(url === '/getscript'){
        // 拼接一个方法的调用
        // var scriptStr = 'show()'

        var data = {
            name:'zs',
            age:23,
            gender:'man',
        }

        var scriptStr = `${query.callback}(${JSON.stringify(data)})`
        // res.end发送给客户端，客户端把这个字符串当作js代码去解析执行 
        res.end(scriptStr)
    } else {
        res.end('404')
    }
})

// 指定端口号并启动服务监听
server.listen(3000,function(){
    console.log('server listen at http://127.0.0.1:3000')
})