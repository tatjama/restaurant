//List of tables -8
let tables = [];
//list of active orders
let orders = [];
//number of last created order
let currentNumber = 0;
//name of current item
let currentName = "";
//create array of items;
let arrayOfItems = [];
const  namesOfPizzas =['Capriciosa', 'Vezuvio','Siciliana', 'Calzona'];
const  namesOfPastas = ['Carbonara', 'Milaneze', 'Italiana', 'Bolonjeze', 'Quatr0 Formagio'];
const typesOfBeverages = ['Voda', 'negaziranni sok', 'gazirani sok'];
const namesOfBeverages = ['Rosa', 'Jabuka', 'Coca Cola'];
const namesOfAdds = ['Kecap', 'Sir', 'Origano', 'Pavlaka', 'Masline'];
const volumeOfBeverages = [0.5, 0.25, 0.33];
const tableList = document.querySelector(".table-list");
const ordersList = document.getElementById("orders-list");
class Order{
    constructor(tableNumber, listOfOrder){
        this.date = this.getDate();
        this.orderNumber = Order.getNumber();
        this.tableNumber = tableNumber;
        this.items = listOfOrder;
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
    static getInput(tableId){
        let nameInput = document.getElementById(`pizza${tableId}`);
       currentName =  nameInput.value;
    }
    static clearInput(tableId){
        console.log(tableId);
        let nameInput = document.getElementById(`pizza${tableId}`);
        currentName = "";
        nameInput.value = "";
    }
}
class ListOfOrder{
    constructor(){
        this.item = item;
        this.quantity = quantity;
        
    }
}
class Table{
    constructor(table){
        this.tableName = table;
    }
}
class Beverage{
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
        this.type = "Pizza";
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
        this.type = "Pasta";
        this.name = name;
        this.price = this.getPrice();
    }
    getPrice(){
        const price = Math.floor(Math.random()*301) + 300;
        return price;
    }
}
class Adds{
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
    static start(numberOfTables,numberOfPizzas, numberOfPastas, numberOfBeverages, numberOfAdds){
        Restaurant.getTables(numberOfTables);
        Restaurant.getItems(numberOfPizzas, numberOfPastas, numberOfBeverages, numberOfAdds)
    }
    static getItems(numberOfPizzas, numberOfPastas, numberOfBeverages, numberOfAdds){
        for(let i = 0; i < numberOfPizzas; i++){
            let pizza = new Pizza(namesOfPizzas[i]);
            arrayOfItems.push(pizza);
        }
        for (let i = 0; i < numberOfPastas; i++){
            let pasta = new Pasta(namesOfPastas[i]);
            arrayOfItems.push(pasta)
        }
        for(let i = 0; i < numberOfBeverages; i++){
            let drink = new Beverage(typesOfBeverages[i], namesOfBeverages[i], volumeOfBeverages[i]);
            arrayOfItems.push(drink);
        }
        for(let i = 0; i < numberOfAdds; i++){
            let adds = new Adds(namesOfAdds[i]);
            arrayOfItems.push(adds)
        }
       // return arrayOfItems
    }
    //create Array of tables
    static getTables(numb){
        for(let i = 1; i <= numb; i++){
        tables.push(new Table(i));
        }
        tables.map((table) => {
           let div =  document.createElement("div");
            div.setAttribute("class", "table");
            div.setAttribute("id", table.tableName);
            div.innerHTML = "Table No" + table.tableName;
            div.addEventListener("click",(e) => UI.orderTable(e.target.id));
            //div.addEventListener("click",(e) => Restaurant.createOrder(e.target.id));
            tableList.appendChild(div);
        })
    }
    
    static createOrder(tableNumber){
        let listOfOrder = [];
        const pizza = new Pizza(currentName);
        listOfOrder.push(pizza)
        const order = new Order(tableNumber, listOfOrder);
        console.log(order);
        console.log(pizza)
       orders.push(order);      
        UI.displayOrders(orders);  
    }   

}
class UI{
    static orderTable(tableId){
        let table = document.getElementById(tableId);
        let div = document.createElement("div");
        div.innerHTML =`
        <input class="name-input" id="pizza${tableId}" type="text" placeholder="Name" 
        value="" onfocus = "Order.clearInput(${tableId})"  onchange = "Order.getInput(${tableId})"/>
        <button id = "btn"+${tableId} onclick="Restaurant.createOrder(${tableId})">Create order</button>
        `
        table.appendChild(div);
    }
    static displayOrders(){
        let div = document.createElement("div");
        div.setAttribute("class", "order");
        orders.map((order) => {            
            div.innerHTML = `
            <div class="new-order">    
                <h3>Order number: ${order.orderNumber}</h3>
                <p>Table number: ${order.tableNumber}</p>
                <p>Date: ${order.date}</p>
                <input type="text" placeholder="name of meal"/>
            </div>
            `;            
        })
        ordersList.appendChild(div);
    }
}
document.addEventListener('DOMContentLoaded', 
Restaurant.start(numberOfTables = 4,numberOfPizzas = 4, numberOfPastas = 5, numberOfBeverages = 3, numberOfAdds = 5));
console.log(arrayOfItems)

/*class Billing extends Order{
    constructor(cached){
        super(number)
        this.cached = cached;
    }
}*/
