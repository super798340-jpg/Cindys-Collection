const products = [
 {id:1,name:"Classic Oxford Shirt",category:"Shirts",price:220,image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",tag:"BESTSELLER"},
 {id:2,name:"Everyday Polo Shirt",category:"Shirts",price:180,image:"https://images.unsplash.com/photo-1625910513413-5fc45e6e9b18?auto=format&fit=crop&w=700&q=80",tag:"NEW"},
 {id:3,name:"Tailored Smart Trousers",category:"Trousers",price:290,image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80",tag:""},
 {id:4,name:"Modern Leather Sneakers",category:"Shoes",price:350,image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",tag:""},
 {id:5,name:"Relaxed Fit Shirt",category:"Shirts",price:240,image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",tag:"NEW"},
 {id:6,name:"Minimal Leather Belt",category:"Accessories",price:120,image:"https://images.unsplash.com/photo-1624222247344-550fb8e9a5b1?auto=format&fit=crop&w=700&q=80",tag:""},
 {id:7,name:"Weekend Chinos",category:"Trousers",price:260,image:"https://images.unsplash.com/photo-1511898634545-c01af8c7f6e2?auto=format&fit=crop&w=700&q=80",tag:""},
 {id:8,name:"Everyday Timepiece",category:"Accessories",price:420,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",tag:""}
];
let cart = JSON.parse(localStorage.getItem("cindyCart") || "[]");
let category = "All";
const grid = document.getElementById("productGrid");
const money = n => `GH₵${n.toFixed(2)}`;
function renderProducts(){
 const q = document.getElementById("searchInput").value.toLowerCase();
 const visible = products.filter(p => (category==="All" || p.category===category) && p.name.toLowerCase().includes(q));
 grid.innerHTML = visible.length ? visible.map(p=>`<article class="product-card"><div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.tag?`<span class="badge">${p.tag}</span>`:""}<button class="quick-add" onclick="addToCart(${p.id})">ADD TO BAG +</button></div><div class="product-info"><h3>${p.name}</h3><p>${money(p.price)}</p></div></article>`).join("") : `<p>No products found. Try another search.</p>`;
}
function saveCart(){localStorage.setItem("cindyCart",JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your bag")}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)} · Qty ${x.qty}</p></div><button class="remove-item" onclick="removeItem(${p.id})" aria-label="Remove">×</button></div>`}).join(""):`<p class="empty-cart">Your bag is waiting for something great.</p>`;
 document.getElementById("cartSubtotal").textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.category;renderProducts()}));
document.getElementById("searchInput").addEventListener("input",renderProducts);
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("overlay");
function openCart(){drawer.classList.add("open");overlay.classList.add("show")}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>showToast(cart.length?"Checkout demo: connect a payment provider to accept orders.":"Your bag is empty.");
const modal=document.getElementById("accountModal");
document.getElementById("accountBtn").onclick=()=>modal.classList.add("show");
document.getElementById("closeAccount").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
let authMode="login";
document.querySelectorAll(".auth-tab").forEach(b=>b.onclick=()=>{authMode=b.dataset.mode;document.querySelectorAll(".auth-tab").forEach(x=>x.classList.toggle("active",x===b));document.getElementById("nameField").classList.toggle("hidden",authMode==="login");document.querySelector(".auth-submit").textContent=authMode==="login"?"LOG IN →":"CREATE ACCOUNT →";document.getElementById("authMessage").textContent="Account access is a front-end demo. Connect a secure backend before accepting real accounts."});
document.getElementById("authForm").onsubmit=e=>{e.preventDefault();document.getElementById("authMessage").textContent=authMode==="login"?"Demo login submitted. A secure account service is not connected yet.":"Demo registration submitted. A secure account service is not connected yet.";};
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thank you for subscribing!";e.target.reset()};
document.getElementById("menuToggle").onclick=()=>document.querySelector(".desktop-nav").classList.toggle("open");
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
