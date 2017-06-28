<h3>Flyweight函数创建共同结构</h3>
var created=[];创建一个缓存<br>
如果create的div数大于5直接从created缓存中提取加入到容器，小于5 直接创建div元素
<pre>
var Flyweight = function(){
    var created = [];
    function create(){
        var dom = document.createElement('div');
        document.getElementById('container').appendChild(dom);
        created.push(dom);
        return dom;
    }
    return {
        getDiv:function(){
            if(create.length<5){
                return create();
            }else{
                var div = create.shift();
                create.push(div);
                return div;
            }
        }
    }
    }();</pre>
    <h3>类‘next_page’绑定事件实现数据与结构的分离原理</h3>
<pre>
var paper=0,num=5,article,len=article.length;
for(var i=0;i<5;i++){
    if(article[i]){
        Flyweight.getDiv().innerHTML=article[i];
    }
}
document.getElementById('next_page').onclick = function(){
    if(article.length<5){
        return;
    }
    var n = ++paper*num%len,j=0;
    for(;j<5;j++){
        if(article[n+j]){
            Flyweight.getDiv().innerHTML=article[n+j];
        }else if(article[n+j-len]){
            Flyweight.getDiv().innerHTML = article[n+j-len];
        }else{
            Flyweight.getDiv().innerHTML = "";
        }
    }
}
</pre>
<h3>新闻缓存数据</h3>
var cache={};新闻缓存对象；数据是否在新闻缓存对象，在缓存对象中直接提取，如果没有请求数据放入新闻缓存
<pre>
var Page = function(){
    var cache = {};
    return function(page,fn){
        if(cache[page]){
            showPage(page,cache[page]);
            fn && fn();
        }else{
            $.post('./data/getNewData.php',{
                page:page
            },function(res){
                if(res.errNo == 0){
                    showPage(page,res.data);
                    cache[page]=res.data;
                    fn&&fn();
                }else{
                    throw new Error("error");
                }
            })
        }
    }
}();
$('#next_page').click(function(){
    var $news = $('#news_content'),page=$news.data('page');
    getPageData(page,function(){
        $news.data('page',page+1);
    })
})
function getPageData(page,fn){
        $.post('./data/getNewsData.php',{
            page:page
        },function(res){
            if(res.errNo == 0){
                showPage(page,res.data);
                fn && fn();
            }
        })
}
function showPage(page,data){
    //show page
}</pre>
