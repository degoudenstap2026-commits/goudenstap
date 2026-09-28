const grid=document.querySelector('#products'), search=document.querySelector('#search'), category=document.querySelector('#category');
const cartBtn=document.querySelector('#cartBtn'), modal=document.querySelector('#modal'), close=document.querySelector('#close');
let cart=JSON.parse(localStorage.getItem('goudenstap-cart')||'[]');

[...new Set(products.map(p=>p.category))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c[0].toUpperCase()+c.slice(1);category.appendChild(o)});

function euro(n){return new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n)}
function render(){
 const q=search.value.toLowerCase();
 const cat=category.value;
 const list=products.filter(p=>(p.name.toLowerCase().includes(q)||p.category.includes(q))&&(cat==='all'||p.category===cat));
 grid.innerHTML=list.map(p=>`<article class="product"><div class="img-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.category}</span></div><div class="product-info"><h3>${p.name}</h3><div class="product-bottom"><strong>${euro(p.price)}</strong><button onclick="addToCart(${p.id})">+ Mand</button></div></div></article>`).join('')||'<p>Geen producten gevonden.</p>';
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);saveCart();openCart()}
function saveCart(){localStorage.setItem('goudenstap-cart',JSON.stringify(cart));document.querySelector('#cartCount').textContent=cart.length}
function openCart(){renderCart();modal.classList.remove('hidden')}
function renderCart(){document.querySelector('#cartItems').innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><span>${p.name}</span><b>${euro(p.price)}</b><button onclick="removeItem(${i})">×</button></div>`).join(''):'<p>Je winkelmand is leeg.</p>';document.querySelector('#total').textContent=euro(cart.reduce((s,p)=>s+p.price,0))}
function removeItem(i){cart.splice(i,1);saveCart();renderCart()}
search.addEventListener('input',render);category.addEventListener('change',render);cartBtn.onclick=openCart;close.onclick=()=>modal.classList.add('hidden');modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden')};
document.querySelector('#checkout').onclick=()=>alert('Dit is een demo-winkelmand. Je kunt later je eigen betaal- of bestelfunctie koppelen.');
saveCart();render();
