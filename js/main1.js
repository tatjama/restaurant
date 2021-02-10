//List of tables -8
let tables = [];
//list of active orders
let orders = [];
//number of last created order
let currentNumber = 0;
//name of current item
let currentName = "";
const tableList = document.querySelector(".table-list");
const ordersList = document.getElementById("orders-list");
const nameInput = document.getElementById("name-input");
//const createMealBtn = document.querySelector(".create-meal-btn");
//const createBeverageBtn = document.querySelector(".create-beverage-btn");
class Order{
    constructor(tableNumber, numberOfItems){
        this.date = this.getDate();
        this.orderNumber = Order.getNumber();
        this.tableNumber = tableNumber;
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
    static getInput(){
       currentName =  nameInput.value;
    }
    static clearInput(){
        currentName = "";
        nameInput.value = "";
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
class Restaurant{
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
            div.addEventListener("click",(e) => Restaurant.createOrder(e.target.id));
            tableList.appendChild(div);
        })
    }
    static createOrder(tableNumber){
        const order = new Order(tableNumber);
        orders.push(order);      
        UI.displayOrders(orders);  
    }   

}
class UI{
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
document.addEventListener('DOMContentLoaded', Restaurant.getTables(8));
//console.log(new Pizza("Capriciosa"))

/*class Billing extends Order{
    constructor(cached){
        super(number)
        this.cached = cached;
    }
}*/
