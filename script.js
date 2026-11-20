(() => {
 const PHONE = "919844555042";
 let activeMenuCategory="North Indian Curries";
 const money = n => "₹" + Number(n).toLocaleString("en-IN");
 const getCart = () => JSON.parse(localStorage.getItem("smgv_cart") || "[]");
 const saveCart = c => { localStorage.setItem("smgv_cart", JSON.stringify(c)); updateCartUI(); };
 const count = c => c.reduce((s,x)=>s+x.qty,0);
 const subtotal = c => c.reduce((s,x)=>s+x.price*x.qty,0);
 function updateCartUI(){
   const c=getCart(), n=count(c);
   document.querySelectorAll("[data-cart-count]").forEach(el=>el.textContent=n);
   document.querySelectorAll("[data-cart-total]").forEach(el=>el.textContent=money(subtotal(c)));
   const list=document.querySelector("[data-cart-preview]");
   if(list) list.innerHTML=c.length?c.map(x=>`<div class="mini-line"><span>${x.name} × ${x.qty}</span><b>${money(x.price*x.qty)}</b></div>`).join(""):'<p class="muted">Your cart is waiting for something delicious.</p>';
 }
 function add(id){
   const item=(window.MENU_ITEMS||[]).find(x=>x.id===id); if(!item)return;
   const c=getCart(), old=c.find(x=>x.id===id);
   if(old)old.qty++;else c.push({...item,qty:1});
   saveCart(c); toast(`${item.name} added to cart`);
 }
 function change(id,delta){
   const c=getCart().map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0); saveCart(c); renderCart();
 }
 function toast(msg){
   let t=document.querySelector(".toast"); if(!t){t=document.createElement("div");t.className="toast";document.body.append(t)}
   t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1900);
 }
 function renderCart(){
   const root=document.querySelector("[data-cart-items]"); if(!root)return;
   const c=getCart();
   root.innerHTML=c.length?c.map(x=>`<article class="cart-row"><img src="${x.img}" alt="${x.name}" onerror="this.onerror=null;this.src='${x.fallback}'"><div class="cart-row-info"><b>${x.name}</b><small>${money(x.price)} each</small><div class="qty"><button data-minus="${x.id}" aria-label="Decrease">−</button><span>${x.qty}</span><button data-plus="${x.id}" aria-label="Increase">+</button></div></div><strong>${money(x.price*x.qty)}</strong></article>`).join(""):'<div class="empty-cart"><span>✳</span><h3>Your cart is empty</h3><p>Add a few favourites from our menu.</p><a class="btn btn-dark" href="menu.html">Explore menu</a></div>';
   const total=subtotal(c);
   document.querySelectorAll("[data-cart-subtotal]").forEach(x=>x.textContent=money(total));
   document.querySelectorAll("[data-cart-total]").forEach(x=>x.textContent=money(total));
   document.querySelectorAll("[data-cart-count]").forEach(x=>x.textContent=count(c));
   const checkout=document.querySelector("[data-checkout]");if(checkout)checkout.disabled=!c.length;
 }
 function checkout(){
   const c=getCart(); if(!c.length)return;
   const form=document.querySelector("#checkout-form");
   if(!form || !form.reportValidity())return;
   const d=Object.fromEntries(new FormData(form).entries());
   const lines=c.map(x=>`• ${x.name} × ${x.qty} — ${money(x.price*x.qty)}`).join("\n");
   const msg=`Hello Shri Manjunatha Grand Veg, I would like to place an order:\n\n${lines}\n\nSubtotal: ${money(subtotal(c))}\n\nName: ${d.name}\nPhone: ${d.phone}\nOrder type: ${d.type}\nAddress / notes: ${d.address||"Not provided"}\nPreferred time: ${d.time||"As soon as possible"}\n\nPlease confirm availability and final amount.`;
   window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,"_blank");
 }
 document.addEventListener("click",e=>{
   const a=e.target.closest("[data-add]");if(a){add(a.dataset.add);return}
   const plus=e.target.closest("[data-plus]");if(plus){change(plus.dataset.plus,1);return}
   const minus=e.target.closest("[data-minus]");if(minus){change(minus.dataset.minus,-1);return}
   const cat=e.target.closest("[data-filter]");if(cat){document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===cat));activeMenuCategory=cat.dataset.filter;window.dispatchEvent(new CustomEvent("menu-category-change"));return}
   if(e.target.closest("[data-checkout]"))checkout();
   if(e.target.closest("[data-menu-toggle]"))document.querySelector(".nav-links")?.classList.toggle("open");
   if(e.target.closest("[data-lightbox-close]"))document.querySelector(".lightbox")?.classList.remove("open");
   const img=e.target.closest("[data-lightbox]");if(img){const box=document.querySelector(".lightbox");if(box){box.querySelector("img").src=img.src;box.classList.add("open")}}
 });
 document.addEventListener("submit",e=>{
   if(e.target.matches("form[data-whatsapp-form]")){e.preventDefault();const form=e.target;const entries=[...new FormData(form).entries()].filter(([,v])=>String(v).trim()!=="");const title=form.dataset.formTitle||"Website Enquiry";const lines=entries.map(([k,v])=>`${k}: ${v}`).join("\n");const msg=`Hello Shri Manjunatha Grand Veg,\n\n${title}\n\n${lines}\n\nPlease contact me regarding this enquiry. Thank you.`;window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,"_blank","noopener");}
 });
 document.addEventListener("DOMContentLoaded",()=>{
   updateCartUI();renderCart();
   const menu=document.querySelector("[data-menu-grid]");
   if(menu && window.MENU_ITEMS){
     const cats=["All",...new Set(MENU_ITEMS.map(x=>x.category))];
     let searchTerm="";
     const sidebar=document.querySelector("[data-menu-sidebar]");
     const shortcuts=document.querySelector("[data-menu-shortcuts]");
     const labelFor=c=>({"North Indian Curries":"Veg Curries","Breakfast":"Breakfast & Tiffin","Chaat & Street Food":"Chats & Snacks","Pav Bhaji & Pav":"Pav Bhaji & Pav","Dosa":"Dosa Varieties","Indo-Chinese":"Starters (Indo-Chinese)","Rice & Biryani":"Rice & Biryani","Breads":"Breads","Beverages":"Beverages","Desserts & Sweets":"Desserts"}[c]||c);
     const choose=c=>{activeMenuCategory=c;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b.dataset.filter===c));draw()};
     const categoryMarkup=c=>`<button class="reference-category-button ${c==="All"?"active":""}" data-filter="${c}"><span>${c==="All"?"▦":"◉"}</span><b>${c==="All"?"All Items":labelFor(c)}</b><small>${c==="All"?MENU_ITEMS.length:MENU_ITEMS.filter(x=>x.category===c).length}</small></button>`;
     if(sidebar)sidebar.innerHTML=cats.map(categoryMarkup).join("");
     if(shortcuts)shortcuts.innerHTML=cats.map(c=>`<button class="reference-shortcut ${c==="All"?"active":""}" data-filter="${c}">${labelFor(c==="All"?"All Items":c)}</button>`).join("");
     const search=document.querySelector("[data-menu-search]");
     const draw=()=>{
       const shown=MENU_ITEMS.filter(x=>(activeMenuCategory==="All"||x.category===activeMenuCategory)&&`${x.name} ${x.category} ${x.desc||""}`.toLowerCase().includes(searchTerm.toLowerCase()));
       const title=document.querySelector(".reference-menu-heading h2"); if(title)title.textContent=activeMenuCategory==="All"?"All Menu Items":labelFor(activeMenuCategory);
       menu.innerHTML=shown.map(x=>`<article class="food-card" data-menu-card data-category="${x.category}"><div class="food-image"><img src="${x.img}" alt="${x.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${x.fallback}'"><span class="veg-dot" title="Vegetarian"></span></div><div class="food-content"><h3>${x.name}</h3><p>${x.desc||"A vegetarian favourite from our menu."}</p><div class="food-bottom"><strong>${money(x.price)}</strong><button class="add-btn" data-add="${x.id}">＋ Add</button></div></div></article>`).join("");
       const count=document.querySelector("[data-menu-count]"); if(count)count.textContent=`${shown.length} Items`;
       if(!shown.length)menu.innerHTML='<p class="no-results">No dishes match your search. Try another name or category.</p>';
     };
     draw();if(search)search.addEventListener("input",()=>{searchTerm=search.value;draw()});
     window.addEventListener("menu-category-change",draw);
   }
   document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
 });
})();

// Homepage venue slideshow: switch actual hotel photographs every second.
document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.querySelector("[data-hero-slideshow]");
  if (!slideshow) return;
  const slides = Array.from(slideshow.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;
  let active = 0;
  window.setInterval(() => {
    slides[active].classList.remove("is-active");
    active = (active + 1) % slides.length;
    slides[active].classList.add("is-active");
  }, 1000);
});
