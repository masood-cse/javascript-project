let home_img1=document.getElementById("img1");
let home_img2=document.getElementById("img2");
let menu_cont=document.getElementById("menu-id");
let get_nav_menu=document.getElementById("my-menu");
let get_nav_home=document.getElementById("my-home");

home_img1.addEventListener("animationend",()=>{
    home_img1.classList.add("d-none");
    home_img2.classList.remove("d-none");
});
// cart CONTAINER CODE BELOW
let dispcart=document.getElementById("mycart-id");
let menuCont=document.getElementById("menu-cont");
let rowId=document.getElementById("row-id");
let delay=200;
let nav_menu=document.getElementById("my-menu");
let cartCont=document.createElement("div");
cartCont.classList.add("cart-cont");
cartCont.id="cartId";

document.body.appendChild(cartCont);
let cartHeadCont=document.createElement("div");
cartHeadCont.style.backgroundColor="#000"; 
cartHeadCont.style.position="sticky";
cartHeadCont.style.top="75px";
cartHeadCont.style.zIndex="2";
cartHeadCont.style.width="100%";
cartHeadCont.classList.add("d-flex","flex-row","justify-content-center","p-2","mt-2");
cartCont.appendChild(cartHeadCont);
let cartHead=document.createElement("h1");
cartHead.textContent="My Cart";
cartHead.style.textAlign="center";
cartHead.style.color="white";
cartHead.style.fontFamily="Roboto";
cartHead.style.fontWeight="bold";


cartHeadCont.appendChild(cartHead);
let container_cont=document.createElement("div");
container_cont.classList.add("container");
cartCont.appendChild(container_cont);
let row_cont=document.createElement("div");
row_cont.classList.add("row");

container_cont.appendChild(row_cont);
let button_cont=document.createElement("div");
button_cont.style.textAlign="center";
button_cont.classList.add("d-none","container","mt-2");
cartCont.appendChild(button_cont);
let order_button=document.createElement("button");
order_button.classList.add("cart-button-order","ml-3");

let total_cart_price=0;
let saveCart_but=document.createElement("button");
saveCart_but.textContent="Save My Cart";
saveCart_but.classList.add("cart-button","ml-3");
 order_button.innerHTML=`Order Now <br> Total: 0/-`;
cartHeadCont.appendChild(saveCart_but);
cartHeadCont.appendChild(order_button);
let count=0;
if(count===0){
    order_button.removeAttribute("data-toggle","modal");
    order_button.removeAttribute("data-target",".modal");
}
 let message=document.createElement("h1");
    message.textContent="Your Cart Is Empty";
    message.style.textAlign="center";
    message.classList.add("d-none");
    cartCont.appendChild(message);
// function for removing item from cart
 function removeItemFromCart(cartItem){
    let get_cart_item=cartItem;
    let itemIndex= cartList.findIndex(eachitem=>{
        if(eachitem.item_name===get_cart_item){
            return true;
        }
    })
    cartList.splice(itemIndex,1);
 }

// GET CART FROM LOCAL STORAGE
function getFromLocalStorage(){
    let stringifiedList=localStorage.getItem("cartList");
    let parsedList=JSON.parse(stringifiedList);
    if (parsedList===null){
        return [];
    }
    else {
        
        return parsedList;
    }
}
let cartList=getFromLocalStorage();

// ADD TO CART FUNCTION

function AddToCart(menuItem,isrestoring=false){
order_button.setAttribute("data-toggle","modal");
order_button.setAttribute("data-target",".modal");
   count=count+1;
   let total_item_price=parseInt(menuItem.price);
   button_cont.classList.add("d-block"); 
   let col_cont=document.createElement("div");
   col_cont.classList.add("col-12");
   row_cont.appendChild(col_cont);
   let item_Cont=document.createElement("div");
   item_Cont.classList.add("cart-item-cont","d-flex","flex-row");
   let cart_img_cont=document.createElement("div");
   cart_img_cont.classList.add("cart-img-cont");
   item_Cont.appendChild(cart_img_cont);
   let cart_img=document.createElement("img");
   cart_img.src=menuItem.link;
   cart_img.classList.add("cart-img");
   cart_img_cont.appendChild(cart_img);
   let item_det=document.createElement("div");
   item_det.style.margin="5px";
   item_Cont.appendChild(item_det);
   let item_name=document.createElement("p");
   item_name.textContent=menuItem.item_name;
   item_name.classList.add("cart-item-name");
   item_det.appendChild(item_name);
   let item_price=document.createElement("p");
   item_price.textContent="Price: "+menuItem.price;
   item_price.classList.add("cart-item-name");
   item_det.appendChild(item_price);
   col_cont.appendChild(item_Cont);
   let minus_cont=document.createElement("div");
   minus_cont.classList.add("d-flex","flex-row");
   let minus=document.createElement("i");
   minus.classList.add("fa-solid","fa-minus","quantity");
   minus_cont.appendChild(minus);
   item_det.appendChild(minus_cont);
   let quantityText=document.createElement("p");
   if(menuItem.item_quantity!==undefined){
    quantityText.textContent=menuItem.item_quantity;
   }
   else{
   quantityText.textContent="1";
   }
   quantityText.classList.add("qtext");
   minus_cont.appendChild(quantityText);
   let plus=document.createElement("i");
   plus.classList.add("fa-solid","fa-plus","quantity");
   minus_cont.appendChild(plus);
   let total=document.createElement("p");
   total.textContent="Total: "+menuItem.totalPrice;
   item_det.appendChild(total);
   let get_qt=parseInt(quantityText.textContent);
   plus.onclick = function () {
    if (get_qt >= 1) {
        get_qt += 1;
        quantityText.textContent = get_qt;

        total_item_price = get_qt * parseInt(menuItem.price);
        total_cart_price += parseInt(menuItem.price);  
        menuItem.item_quantity=get_qt;
        menuItem.totalPrice=total_item_price;
        menuItem.tcp=total_cart_price;
        total.textContent = "Total: " + menuItem.totalPrice;
        order_button.innerHTML = `Order Now <br> Total: ${menuItem.tcp} /-`;
    }
};

minus.onclick = function () {
    if (get_qt > 1) {
        get_qt -= 1;
        quantityText.textContent = get_qt;

        total_item_price = get_qt * parseInt(menuItem.price);
        total_cart_price -= parseInt(menuItem.price);
        menuItem.item_quantity=get_qt;
         menuItem.totalPrice=total_item_price;
            menuItem.tcp=total_cart_price;
        total.textContent = "Total: " + menuItem.totalPrice;
        order_button.innerHTML = `Order Now <br> Total: ${menuItem.tcp} /-`;
    }
};

if(get_qt===1){
    total_cart_price=total_cart_price+parseInt(menuItem.price);
    menuItem.item_quantity=1;
     menuItem.totalPrice=menuItem.price;
        menuItem.tcp=total_cart_price;
    order_button.innerHTML=`Order Now <br> Total: ${menuItem.tcp} /-`;
}

let remove_cart=document.createElement("button");
remove_cart.classList.add("remove-cart-button");
remove_cart.textContent="Remove Item from Cart"
item_det.appendChild(remove_cart);
  if(count>0){
     button_cont.classList.remove("d-none"); 
     button_cont.classList.add("d-block");
     message.classList.remove("d-block");
     message.classList.add("d-none");
       saveCart_but.classList.remove("d-none");
      saveCart_but.classList.add("d-block");
     
 }     
remove_cart.onclick=function(){
 count=count-1;
  total_cart_price=total_cart_price-total_item_price;
     menuItem.tcp=total_cart_price;
     order_button.innerHTML=`Order Now <br> Total: ${menuItem.tcp} /-`;
     removeItemFromCart(menuItem.item_name);
 if(count===0){
      button_cont.classList.remove("d-block");
      button_cont.classList.add("d-none");
      message.classList.remove("d-none");
      message.classList.add("d-block");
      total_cart_price=0;
      menuItem.tcp=total_cart_price;
     order_button.removeAttribute("data-toggle","modal");
order_button.removeAttribute("data-target",".modal");
      
      order_button.innerHTML=`Order Now <br> Total: ${total_cart_price} /-`;
 }
 row_cont.removeChild(col_cont);
 alert(`${menuItem.item_name} Removed From Cart`);
};
if(!isrestoring){
let newCartItem={
    link:menuItem.link,
    item_name:menuItem.item_name,
    price:menuItem.price,
    item_quantity:get_qt,
    totalPrice:total_item_price,
    tcp:total_cart_price
}
cartList.push(newCartItem);
}


}
saveCart_but.onclick=function(){

localStorage.setItem("cartList",JSON.stringify(cartList));
}

for(let eachCartItem of cartList){
    AddToCart(eachCartItem,true);
}

// MENU ITEM CONTAINER

function createAndAppendItem(menu){
 let colCont=document.createElement("div");
 colCont.classList.add("col-12","col-md-3","mt-3");
 rowId.appendChild(colCont);
 let itemCont=document.createElement("div");
 itemCont.classList.add("item-cont","shadow-lg");
 itemCont.setAttribute("data-aos","fade-up");
 itemCont.setAttribute("data-aos-duration","1500");
if (delay<600){
    delay=delay+100;
     itemCont.setAttribute("data-aos-delay",delay);
  
}
else{
     delay=200;
     itemCont.setAttribute("data-aos-delay",delay);
}

 colCont.appendChild(itemCont);
 let imgCont=document.createElement("div");
 imgCont.classList.add("img-cont");
 itemCont.appendChild(imgCont);
 let itemImg=document.createElement("img");
 itemImg.classList.add("w-100");
 itemImg.src=menu.link;
 imgCont.appendChild(itemImg);
 let priceCont=document.createElement("div");
 priceCont.classList.add("price-cont");
 itemCont.appendChild(priceCont);
 let nameEl=document.createElement("p");
 nameEl.textContent=menu.item_name;
 nameEl.classList.add("item-name");
 priceCont.appendChild(nameEl);
 let priceEl=document.createElement("p");
 priceEl.textContent=menu.price;
 priceEl.classList.add("item-price")
 priceCont.appendChild(priceEl);
 let cartButton=document.createElement("button");
 cartButton.classList.add("cart-button");
 cartButton.textContent="Add To Cart";
 priceCont.appendChild(cartButton);
 cartButton.onclick= function(){
    
    let x=cartList.findIndex(eachItem=>{
        if(eachItem.item_name===menu.item_name){
           return true
        }
    })
    if(x!==-1){
        alert("item already exists in your cart");
    }
    else{
        AddToCart(menu);
        alert(`item added to cart`)
    }
}
}

// DATA OF SNACK ITEMS 

let itemsObj=[
    {
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747750252/american-removebg-preview_bp5vx5.png",
    item_name:"American Classic Zinger",
    price:"185/-"
},
{
     link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747750260/tandoori-removebg-preview_wkkzvh.png",
    item_name:"Tandoori Zinger Burger",
    price:"235/-"
},
{
   link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747750279/4pc_hot_wings-removebg-preview_qinhgx.png",
    item_name:"4 Pc Hot Wings & Medium Fries",
    price:"265/-"  
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747750269/regular_popcorn-removebg-preview_mufjya.png",
    item_name:"4 Pc Hot Wings Popcorn",
    price:"170/-" 
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747803467/peri-removebg-preview_e4w7l0.png",
    item_name:"Peri peri 3pc chicken",
    price:"240/-"
},
{
   link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747803680/smoky-removebg-preview_ji2zj0.png",
    item_name:"2pc smoky chicken",
    price:"145/-" 
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747803855/bucket-removebg-preview_ndlede.png",
    item_name:"Chicken & fries bucket",
    price:"170/-" 
},
{
     link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747804150/roll-removebg-preview_iuyxgw.png",
    item_name:"Spicy Chicken roll",
    price:"275/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747804584/zingermeal-removebg-preview_pwgf9g.png",
    item_name:"Chicken Roll & Zinger Meal",
    price:"280/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747804776/popcorn-removebg-preview_mwxlqj.png",
    item_name:"Chicken Roll & Popcorn Meal",
    price:"450/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747805057/burger_longer-removebg-preview_ojaxlh.png",
    item_name:"Chicken Longer Burger",
    price:"250/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747805353/dc-removebg-preview_rodopz.png",
    item_name:"Double Chicken roll",
    price:"190/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747806265/rizz-removebg-preview_pqz7eg.png",
    item_name:"Rizz fizz",
    price:"120/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747806681/chocopie2-removebg-preview_uiqqly.png",
    item_name:"Choco Mud Pie",
    price:"200/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747806915/virgin-removebg-preview_ycchbp.png",
    item_name:"Virgin Mojito",
    price:"100/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747807008/masalapep-removebg-preview_qqkep3.png",
    item_name:"Masala Pepsi",
    price:"100/-"
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747807247/mousse-removebg-preview_lo6kac.png",
    item_name:"Mousse Cake",
    price:"300/-"
},
{
   link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747807389/7up-removebg-preview_kppkkc.png",
    item_name:"7 Up",
    price:"59/-" 
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747807399/pepsi-removebg-preview_auptsu.png",
    item_name:"Pepsi",
    price:"59/-"  
},
{
    link:"https://res.cloudinary.com/dv8fruigd/image/upload/v1747807422/mirinda-removebg-preview_elfa36.png",
    item_name:"Mirinda",
    price:"59/-"
}];

// LOOP FOR CALLING THE MENU ITEMS 
for (let eachItem of itemsObj){
createAndAppendItem(eachItem);
}
