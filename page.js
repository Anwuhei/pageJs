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
}();
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