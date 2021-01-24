class Order{
    constructor(number){
        this.numberOfOrder = number;  
                
    }
    get date(){
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let time = new Date().getHours();
        let minutes = new Date().getMinutes();
        let d = day + "/" + month + "/" + year;
        let t = time + ":" + minutes;
        return [d, t];
    }
    
};
class Billing extends Order{
    constructor(cached){
        super(number)
        this.cached = cached;
    }
}
class Table{
    constructor(table){
        this.table = table;
    }
}
class Drink{
    constructor(name,  volume){
        this.name = name;
        this.price = Math.floor(Math.random()*350)+ 150;
        this.volume = volume;
    }
}
class Meal{
    constructor(name){
        this.name = name;
        this.price = Math.floor(Math.random()*300) + 300;
    }
}
class Addings{
    constructor(name){
        this.name = name;
        this.price = Math.floor(Math.random()*80) + 20;
    }
}
let pizza = new Meal("Capriciosa") ;
let drink = new Drink("Gazirano", 0.5);
let addings = new Addings("Kechup");
let order = new Order(1);
console.log(drink);
console.log(pizza);
console.log(addings);
console.log(order.date);
console.log(order.numberOfOrder);
console.log(order);
/*PRINT DRINK
document.getElementById("root").innerHTML = function(){ 
    var txt = "";
    for(x in drink) {
    txt +=  drink[x] + "<br>"
    
}
return txt;
}();*/