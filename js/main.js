let tables = [];
let orders = [];
const createOrderBtn = document.querySelector('.create-order-btn');
const tableList = document.querySelector(".table-list");
const ordersList = document.getElementById("orders-list");

class Order{
    constructor(tableNumber){
        this.date = this.getDate();
        //this.numberOfOrder = Order.temporaryNumber(number);
        this.tableNumber = tableNumber
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
    
}
class Table{
    constructor(table){
        this.tableName = table;
    }
    static createOrder(tableNumber){
        const order = new Order(tableNumber);
        orders.push(order);      
        Table.displayOrders(orders);  
    }

    static displayOrders(){
        let div = document.createElement("div");
        div.setAttribute("class", "order");
        orders.map((order) => {
            
            
            div.innerHTML = `
            <div class="new-order">    
                <p>Table number: ${order.tableNumber}</p>
                <p>Date: ${order.date}</p>
            </div>
            `;
            
        })
        ordersList.appendChild(div);
    }
   
}
class Tables{
    static getTables(numb){
        for(let i = 1; i <= numb; i++){
        tables.push(new Table(i));
        }
        tables.map((table) => {
           let div =  document.createElement("div");
            div.setAttribute("class", "table");
            div.setAttribute("id", table.tableName);
            div.innerHTML = "Table No" + table.tableName;
            div.addEventListener("click",(e) => Table.createOrder(e.target.id));
            tableList.appendChild(div);
        })
        console.log(tables)
    }
}

document.addEventListener('DOMContentLoaded', Tables.getTables(8));
/*class Order{
    constructor(){
        this.date = this.getDate();
        this.numberOfOrder = Order.temporaryNumber(number);
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
    get numbOfOrder() {
        return this.number;
    }
    set numbOfOrder(number) {
        this.number = ++number;
    }
    static temporaryNumber(number = 0){   
        number = ++number;
        return number;
    }

    static createOrder(x){  

        document.getElementById("order").innerHTML = `
        <div class="new-order">
            <h3>Order number: ${x.number}</h3>
            <p>Date: ${x.date}</p>
        </div>
        `;
    }
    
};*/
/*createOrderBtn.addEventListener('click',() => {
    let order = new Order();
    order.getDate();
    order.numbOfOrder = order.number;
    console.log(order)
    return order
})*/
/*class Billing extends Order{
    constructor(cached){
        super(number)
        this.cached = cached;
    }
}*/
