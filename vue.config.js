module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                bypass: function (req, res){
                    if(req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skipping proxy for browser request.")
                        return "/index.html";
                        //这里的if条件是判断当mock不是none的时候才执行下面的语句
                    }else if(process.nextTick.MOCK !== "none"){
                        const name = req.path
                        .split("/api/")[1]
                        .split("/")
                        .join("_");
                        //每次mock过来的数据会缓存，所以只会生效一次 如果更改了数据那么就不会生效了  弊端
                        const mock = require(`./mock/${name}`);
                        const result = mock(req.method);
                        //需要在这里每次都拿到一个新值  所以要清除掉缓存
                        delete require.cache[require.resolve(`./mock/${name}`)];
                        return res.send(result);
                    }
                }
            }
        }
    }
}
