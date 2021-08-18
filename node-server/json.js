  var http = require('http');
  const urlModule = require('url');
  //   解析post请求
  const querystring = require('querystring')
  const urldecode = require('urldecode')

  http.createServer(function (request, response) {
      //   设置头允许跨域请求
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.writeHead(200, {
          'Content-Type': 'application/json'
      });

      // 截取url
      const {
          pathname: url,
          query
      } = urlModule.parse(request.url, true)

      if (url === '/getAll') {
          // 定义基本数据，在首先执行的方法内定义全局变量，避免了定义在外部每次有请求进来都会被重新赋值的问题
           car = [{
                  id: 1,
                  name: ' ',
                  ctime: new Date()
              },
              {
                  id: 2,
                  name: '凯迪拉克',
                  ctime: new Date()
              },
              {
                  id: 3,
                  name: '特斯拉',
                  ctime: new Date()
              },
          ]
          var json = JSON.stringify({
              car
          })
          response.end(json);
      }
      if (url === '/add') {
          // 获取的post数据不好处理！！！！
          var str = ''
          request.on('data', data => {
              str += data
              var carName = urldecode(str.substr(5, str.length))
              car.push({
                  id: car.length + 1,
                  name: carName,
                  ctime: new Date()
              })
              var json = JSON.stringify({
                  car
              })
              response.end(json);
          })
      } else if (url === '/del') {
        //   删除数据，从url中取得id的值
          var arg = urlModule.parse(request.url, true).query
          car.splice((arg.id - 1), 1)
          var json = JSON.stringify({
              car
          })
          response.end(json);
      }
  }).listen(8081);

  console.log('Server running at http://127.0.0.1:8081/');