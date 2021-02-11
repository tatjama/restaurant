const tableList = document.querySelector(".table-list");
//const ordersList = document.getElementById("orders-list");
class Order{
    constructor(tableNumber){
        this.date = this.getDate();
        this.orderNumber = Order.getNewNumber();
        this.tableNumber = tableNumber;
        this.listOfPizzas = [];
        this.listOfPastas = [];
        this.listOfDrinks = [];
    }
    //number of current order
     static currentOrder = 0;

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
    static getNewNumber(){
        this.currentOrder = ++this.currentOrder;
        return this.currentOrder ;
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
}
class Bill {
    constructor(order){
        this.tableNumber = order.tableNumber;
        this.billNumber = order.orderNumber;
        this.listOfPizzas = order.listOfPizzas;
        this.sumOfPizzas = this.calculateSumOfPizzas();
        this.listOfPastas = order.listOfPastas;
        this.sumOfPastas = this.calculateSumOfPastas();
        this.listOfDrinks = order.listOfDrinks;
        this.sumOfDrinks = this.calculateSumOfDrinks();
        this.finalSum = this.calculateFinalSum();
    }
    calculateSumOfPizzas(){
        let sum = 0;
        let n = this.listOfPizzas.length;
        for(let i = 0; i < n; i++){
            let sumOfAddons = 0; 
            let m = this.listOfPizzas[i].addonArr.length;
            for(let j = 0; j < m; j++){
                sumOfAddons += this.listOfPizzas[i].addonArr[j].price
            }
            sum += this.listOfPizzas[i].price + sumOfAddons
        }
        return sum;
    }
    calculateSumOfPastas(){
        let sum = 0;
        let n = this.listOfPastas.length;
        for(let i = 0; i < n; i++){
            let sumOfAddons = 0;
            let m = this.listOfPastas[i].addonArr.length;
            for(let j = 0; j < m; j++){
                sumOfAddons += this.listOfPastas[i].addonArr[j].price
            }            
            sum += this.listOfPastas[i].price + sumOfAddons;
        }
        return sum;
    }
    calculateSumOfDrinks(){
        let sum = 0;
        for(let i = 0; i <this.listOfDrinks.length; i++){
            sum += this.listOfDrinks[i].price
        }
        return sum
    }
    calculateFinalSum(){
        return this.sumOfDrinks + this.sumOfPastas + this.sumOfPizzas

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
class Meal{
    constructor(name){
        this.name = name;
        this.price = this.getPrice();
        this.addonArr = [];
    }
    getPrice(){
        const price =Math.floor(Math.random()*301) + 300;
        return price;
    }
    get addon(){
        return this.addonArr
    }
    set addon(currentAddon){  
         this.addonArr.push(currentAddon);
    }
}
class Pizza extends Meal{   
}
class Pasta extends Meal{
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
    //list of current orders
    static  listOfOrders = [];
    // arrays of names and values
    static  namesOfPizzas =['Capriciosa', 'Vezuvio','Siciliana', 'Calzona'];
    static  namesOfPastas = ['Carbonara', 'Milaneze', 'Italiana', 'Bolonjeze', 'Quatr0 Formagio'];
    static  typesOfDrinks = ['Voda', 'negaziranni sok', 'gazirani sok'];
    static  namesOfDrinks = ['Rosa', 'Jabuka', 'Coca Cola'];
    static  namesOfAdds = ['Kecap', 'Sir', 'Origano', 'Pavlaka', 'Masline'];
    static  volumeOfDrinks = [0.5, 0.25, 0.33];

    static start(numberOfTables,numberOfPizzas, numberOfPastas, numberOfDrinks, numberOfAdds){
        Restaurant.getTables(numberOfTables);
        Restaurant.getItems(numberOfPizzas, numberOfPastas, numberOfDrinks, numberOfAdds)
    }
    static getItems(numberOfPizzas, numberOfPastas, numberOfDrinks, numberOfAdds){
        for(let i = 0; i < numberOfPizzas; i++){
            let pizza = new Pizza(Restaurant.namesOfPizzas[i]);
            arrayOfItems.push(pizza);
        }
        for (let i = 0; i < numberOfPastas; i++){
            let pasta = new Pasta(Restaurant.namesOfPastas[i]);
            arrayOfItems.push(pasta)
        }
        for(let i = 0; i < numberOfDrinks; i++){
            let drink = new Drink(Restaurant.typesOfDrinks[i], Restaurant.namesOfDrinks[i], Restaurant.volumeOfDrinks[i]);
            arrayOfItems.push(drink);
        }
        for(let i = 0; i < numberOfAdds; i++){
            let adds = new Addon(Restaurant.namesOfAdds[i]);
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
let arrayOfItems = [];
document.addEventListener('DOMContentLoaded', 
Restaurant.start(numberOfTables = 4,numberOfPizzas = 4, numberOfPastas = 5, numberOfDrinks = 3, numberOfAdds = 5));
console.log(arrayOfItems)
let order1 = new Order(1);
const capriciosa1 = new Pizza("Capriciosa");
const ketchup = new Addon("ketchup");
const origano = new Addon("origano");
capriciosa1.addon = ketchup;
capriciosa1.addon = origano;
order1.addPizza(capriciosa1);
let italiana = new Pasta("Italiana");
order1.addPasta(italiana);
const cheese = new Addon("cheese");
italiana.addon = cheese;
let cocaCola = new Drink("gazirano", "Coca Cola", 0.5);
order1.addDrink(cocaCola);
order1.addDrink(cocaCola);
console.log(order1);

Restaurant.listOfOrders.push(order1);
let order2 = new Order(2);
let siciliana = new Pizza("Siciliana");
order2.addPizza(siciliana);
let carbonara = new Pizza("Carbonara");
order2.addPizza(carbonara);
let negaziraniSokMali = new Drink("negazirani", "Negazirani", 0.25);
order2.addDrink(negaziraniSokMali);
console.log(order2);
Restaurant.listOfOrders.push(order2);

let order3 = new Order(3);
const capriciosa = new Pizza("Capriciosa");
const capriciosa2 = new Pizza("Capriciosa");
capriciosa2.addon =ketchup;
order3.addPizza(capriciosa2);
order3.addPizza(capriciosa2);
order3.addPizza(capriciosa); 
let negaziraniSok = new Drink("negazirani", "Negazirani", 0.5);
order3.addDrink(negaziraniSok);
let gaziraniSok = new Drink("gazirani", "Gazirani",0.33);
order3.addDrink(gaziraniSok);
let voda = new Drink("voda", "Voda Casa", 0.2);
order3.addDrink(voda);
console.log(order3);
Restaurant.listOfOrders.push(order3);
console.log(Restaurant.listOfOrders);
let bill = new Bill(order3);
console.log(bill)
let bill1 = new Bill(order1);
console.log(bill1);

let order4 = new Order(4);
const vezuvio = new Pizza("Vezuvio");
order4.addPizza(vezuvio);
console.log(order4);