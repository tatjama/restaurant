//list of active orders
let listOfOrders = [];
//number of last created order
let currentNumber = 0;
//name of current item
//let currentName = "";
//create array of items;
let arrayOfItems = [];
const  namesOfPizzas =['Capriciosa', 'Vezuvio','Siciliana', 'Calzona'];
const  namesOfPastas = ['Carbonara', 'Milaneze', 'Italiana', 'Bolonjeze', 'Quatr0 Formagio'];
const typesOfDrinks = ['Voda', 'negaziranni sok', 'gazirani sok'];
const namesOfDrinks = ['Rosa', 'Jabuka', 'Coca Cola'];
const namesOfAdds = ['Kecap', 'Sir', 'Origano', 'Pavlaka', 'Masline'];
const volumeOfDrinks = [0.5, 0.25, 0.33];
const tableList = document.querySelector(".table-list");
const ordersList = document.getElementById("orders-list");
class Order{
    constructor(tableNumber){
        this.date = this.getDate();
        this.orderNumber = Order.getNumber();
        this.tableNumber = tableNumber;
        this.listOfPizzas = [];
        this.listOfPastas = [];
        this.listOfDrinks = [];
        this.addonsForPizza = [];
        this.addonsForPasta = [];
    }
    getDate(){
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let time = new Date().getHours();
        let minutes = new Date().getMinutes();
        let d = day + "/" + month + "/" + year;
        let t = time + ":" + minutes;
        return [d, t];
    }
    static getNumber(){
        currentNumber = ++currentNumber;
        return currentNumber;
    }
    addPizza(pizza){
        this.listOfPizzas.push(pizza)
    }
    addPasta(pasta){
        this.listOfPastas.push(pasta)
    }
    addDrink(drink){
        this.listOfDrinks.push(drink)
    }
    addAddonPizza(addonForPizza){
        this.addonsForPizza.push(addonForPizza)
    }
    addAddonPasta(addonForPasta){
        this.addonsForPasta.push(addonForPasta)
    }
    
}
class Table{
    constructor(table){
        this.tableName = table;
    }
}
class Drink{
    constructor(type, name, volume){
        this.type = type;
        this.name = name;
        this.price = this.getPrice();
        this.volume = volume;
    }
    getPrice(){
        const price =Math.floor(Math.random()*350)+150;
        return price;
    }
}
class Pizza{
    constructor(name){
        this.name = name;
        this.price = this.getPrice();
    }
     getPrice(){
        const price = Math.floor(Math.random()*301)+300;
        return price
    }    
}
class Pasta{
    constructor(name){
        this.name = name;
        this.price = this.getPrice();
    }
    getPrice(){
        const price = Math.floor(Math.random()*301) + 300;
        return price;
    }    
}
class Addon{
    constructor(name){
        this.name = name;
        this.price = this.getPrice();
    }
    getPrice(){
        const price = Math.floor(Math.random()*81) + 20;
        return price
    }
}
class Restaurant{
    static start(numberOfTables,numberOfPizzas, numberOfPastas, numberOfDrinks, numberOfAdds){
        Restaurant.getTables(numberOfTables);
        Restaurant.getItems(numberOfPizzas, numberOfPastas, numberOfDrinks, numberOfAdds)
    }
    static getItems(numberOfPizzas, numberOfPastas, numberOfDrinks, numberOfAdds){
        for(let i = 0; i < numberOfPizzas; i++){
            let pizza = new Pizza(namesOfPizzas[i]);
            arrayOfItems.push(pizza);
        }
        for (let i = 0; i < numberOfPastas; i++){
            let pasta = new Pasta(namesOfPastas[i]);
            arrayOfItems.push(pasta)
        }
        for(let i = 0; i < numberOfDrinks; i++){
            let drink = new Drink(typesOfDrinks[i], namesOfDrinks[i], volumeOfDrinks[i]);
            arrayOfItems.push(drink);
        }
        for(let i = 0; i < numberOfAdds; i++){
            let adds = new Addon(namesOfAdds[i]);
            arrayOfItems.push(adds)
        }
    }
    //create Array of tables
    static getTables(numb){
        let tables = [];
        for(let i = 1; i <= numb; i++){
        tables.push(new Table(i));
        }
        UI.displayTables(tables);
    }    
}
class UI{
    static displayTables(tables){
        tables.map((table) => {
            let div =  document.createElement("div");
             div.setAttribute("class", "table");
             div.setAttribute("id", table.tableName);
             div.innerHTML = "Table No" + table.tableName;
             div.addEventListener("click",(e) => UI.orderTable(e.target.id));
             tableList.appendChild(div);
         })
    }
    static orderTable(tableId){
        let table = document.getElementById(tableId);
        let div = document.createElement("div");
        div.innerHTML =`
        <input class="name-input" id="pizza${tableId}" type="text" placeholder="Pizza name" 
        value="" onfocus = "Pizza.clearInput(${tableId})"  onchange = "Pizza.getInput(${tableId})"/>
        <input class="name-input" id="pasta${tableId}" type="text" placeholder="Pasta name" 
        value="" onfocus = "Pasta.clearInput(${tableId})"  onchange = "Pasta.getInput(${tableId})"/>
        
        <button id = "btn"+${tableId} onclick="Restaurant.createOrder(${tableId})">Create order</button>
        `
        table.appendChild(div);
    }    
}
document.addEventListener('DOMContentLoaded', 
Restaurant.start(numberOfTables = 4,numberOfPizzas = 4, numberOfPastas = 5, numberOfDrinks = 3, numberOfAdds = 5));
console.log(arrayOfItems)
let order1 = new Order(1);
let capriciosa = new Pizza("Capriciosa");
order1.addPizza(capriciosa);
let ketchup = new Addon("ketchup");
order1.addAddonPizza(ketchup);
let origano = new Addon("origano");
order1.addAddonPizza(origano);
let italiana = new Pasta("Italiana");
order1.addPasta(italiana);
let sir = new Addon("sir");
order1.addAddonPasta(sir);
let cocaCola = new Drink("gazirano", "Coca Cola", 0.5);
order1.addDrink(cocaCola);
order1.addDrink(cocaCola);
console.log(order1);
listOfOrders.push(order1);
let order2 = new Order(2);
let siciliana = new Pizza("Siciliana");
order2.addPizza(siciliana);
let carbonara = new Pizza("Carbonara");
order2.addPizza(carbonara);
let negaziraniSokMali = new Drink("negazirani", "Negazirani", 0.25);
order2.addDrink(negaziraniSokMali);
console.log(order2);
listOfOrders.push(order2);
let order3 = new Order(3);
order3.addPizza(capriciosa);
order3.addPizza(capriciosa);
order3.addPizza(capriciosa);
order3.addAddonPizza(ketchup);
order3.addAddonPizza(ketchup);
let negaziraniSok = new Drink("negazirani", "Negazirani", 0.5);
order3.addDrink(negaziraniSok);
let gaziraniSok = new Drink("gazirani", "Gazirani",0.33);
order3.addDrink(gaziraniSok);
let voda = new Drink("voda", "Voda Casa", 0.2);
order3.addDrink(voda);
console.log(order3);
listOfOrders.push(order3);
console.log(listOfOrders);



