var Flyweight = function(){
    var created = [];
    function create(){
        var dom = document.createElement('div');
        document.getElementById('container').appendChild(dom);
        created.push(dom);
        return dom;
    }
}