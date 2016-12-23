//1.不同语言用不同文件
//2.文件格式简单
//3.jquery mobile会对模板处理，是否能用
//4.有没有license
//5.用户体验

var multi_language = {
    defaultLanguage: "en-us", //默认语言
    currentLanguage: null, //当前语言
    //用于存放语言文件
    text: null,
    _load_script: function(url, scb, ecb){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = url;
        script.onload = scb;
        script.onerror = ecb;
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        head.insertBefore(script, head.firstChild);
    },
    //加载语言文件 lanName:语言名 scb 成功回调 ecb 失败回调
    changeLanguage: function(lanName, scb, ecb){
        if (lanName == this.currentLanguage) {
            return false;
        }
        var self = this;
        //载入语言文件
        this._load_script("language/" + lanName + ".js", function(){
            var msg = self.text;
            if (msg.language === lanName) {
                self.text = msg;
                self.currentLanguage = lanName;
                self.update();
                scb && scb();
            }
            else {
                ecb && ecb();
            }
        }, ecb);
    },
    //更新页面语言显示
    update: function(){
        if (!this.text) {
            return false;
        }
        var self = this;
        $("*[ml]").html(function(i, html){
            var key = $(this).attr("ml").split(".");
            var r = self.text;
            while (key.length) {
                r = r[key.shift()];
            }
            return r;
        });
    }
};
