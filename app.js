const WA_NUMBER = "6285720458256";
const $ = (id) => document.getElementById(id);
const toast = (msg) => { const el=$("toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2600); };
const getOrders=()=>JSON.parse(localStorage.getItem("sky_orders")||"[]");
const setOrders=(v)=>localStorage.setItem("sky_orders",JSON.stringify(v));
const getStock=()=>JSON.parse(localStorage.getItem("sky_stock")||"[]");
const setStock=(v)=>localStorage.setItem("sky_stock",JSON.stringify(v));

function showPage(page){
 document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===page));
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 $("nav").classList.remove("open");
 if(page==="history") renderHistory();
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$("menuBtn").addEventListener("click",()=>$("nav").classList.toggle("open"));

function openOrder(service){
 $("serviceType").value=["Top Up Game","Pulsa","Token Listrik","Pembayaran Pajak"].includes(service)?service:"Top Up Game";
 $("orderTitle").textContent="Pesan "+service;
 $("orderPanel").scrollIntoView({behavior:"smooth",block:"start"});
 $("productName").focus();
}
document.querySelectorAll(".service-card").forEach(b=>b.addEventListener("click",()=>{
 if(b.dataset.service==="Akun Game"){showPage("home");$("stockList").scrollIntoView({behavior:"smooth"});return;}
 openOrder(b.dataset.service);
}));
$("closeOrder").addEventListener("click",()=>$("orderPanel").classList.add("collapsed"));
$("orderForm").addEventListener("submit",e=>{
 e.preventDefault();
 const order={id:"SKY"+Date.now().toString().slice(-7),service:$("serviceType").value,product:$("productName").value,target:$("customerTarget").value,amount:$("amount").value,notes:$("notes").value,status:"Menunggu konfirmasi",date:new Date().toLocaleString("id-ID")};
 const all=getOrders();all.unshift(order);setOrders(all);renderHistory();
 const msg=`Halo Admin SkyTopUp, saya ingin memesan:%0AID Pesanan: ${order.id}%0ALayanan: ${order.service}%0AProduk: ${order.product}%0AID/Nomor Tujuan: ${order.target}%0ANominal: ${order.amount}%0ACatatan: ${order.notes||"-"}`;
 window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
 toast("Pesanan disimpan di riwayat perangkat ini.");
 e.target.reset();
});
function renderHistory(){
 const list=getOrders();
 $("historyList").innerHTML=list.length?list.map(o=>`<div class="stock-item"><b>${escapeHtml(o.service)} — ${escapeHtml(o.product)}</b><small>${escapeHtml(o.date)} • ${escapeHtml(o.id)}</small><small>Tujuan: ${escapeHtml(o.target)} | ${escapeHtml(o.amount)}</small><strong>${escapeHtml(o.status)}</strong></div>`).join(""):'<p class="muted">Belum ada transaksi di perangkat ini.</p>';
}
function renderStock(){
 const list=getStock();
 $("stockList").innerHTML=list.length?list.map((s,i)=>`<article class="stock-item"><b>${escapeHtml(s.title)}</b><small>${escapeHtml(s.desc)}</small><strong>${escapeHtml(s.price)}</strong><button class="secondary-btn buy-stock" data-index="${i}">Ketuk untuk membeli</button></article>`).join(""):'<p class="muted">Belum ada stok akun. Admin dapat menambahkan stok melalui menu Akun (demo lokal).</p>';
 document.querySelectorAll(".buy-stock").forEach(b=>b.addEventListener("click",()=>{
  const s=getStock()[Number(b.dataset.index)];
  const msg=`Halo Admin SkyTopUp, saya ingin membeli akun game:%0ANama: ${encodeURIComponent(s.title)}%0ASpesifikasi: ${encodeURIComponent(s.desc)}%0AHarga: ${encodeURIComponent(s.price)}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
 }));
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("addStock").addEventListener("click",()=>{
 const title=$("stockTitle").value.trim(),desc=$("stockDesc").value.trim(),price=$("stockPrice").value.trim();
 if(!title||!desc||!price){toast("Lengkapi nama, spesifikasi, dan harga.");return;}
 const list=getStock();list.push({title,desc,price});setStock(list);renderStock();
 $("stockTitle").value=$("stockDesc").value=$("stockPrice").value="";
 toast("Stok demo ditambahkan di perangkat ini.");
});
let authMode="login";
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
 authMode=b.dataset.auth;
 document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===b));
 $("usernameWrap").classList.toggle("hidden",authMode!=="register");
 $("authSubmit").textContent=authMode==="login"?"Masuk":"Daftar";
 $("authMessage").textContent="Demo lokal: autentikasi online belum dikonfigurasi.";
}));
$("authForm").addEventListener("submit",e=>{
 e.preventDefault();
 toast("Form tampilan siap. Hubungkan Supabase untuk login online yang sebenarnya.");
});
renderStock();renderHistory();
