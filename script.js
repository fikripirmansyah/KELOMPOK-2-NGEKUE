const ADMIN_WA = "6285718017758";

const IG_URL = "https://instagram.com/ngekue.id";
const TIKTOK_URL = "https://www.tiktok.com/@ngekue.id";

const PRODUCTS = {
  nastar: {
    emoji: "🍍",
    image: "assets/img/nastar.jpg",
    title: "Nastar Premium",
    price: 85000,
    detail: "500g • Isian nanas asli • Lumer di mulut • Butter premium",
    desc: "Nastar lembut dengan isian nanas legit, wangi butter, manisnya pas, nggak bikin enek."
  },
  kastengel: {
    emoji: "🧀",
    image: "assets/img/kastengel.jpg",
    title: "Kastengel Keju",
    price: 90000,
    detail: "500g • Keju edam & gouda • Gurih dan wangi • Taburan keju melimpah",
    desc: "Kastengel gurih dengan keju melimpah, renyah, wangi, dan aftertaste kejunya nendang."
  },
  putri: {
    emoji: "❄️",
    image: "assets/img/putri.jpg",
    title: "Putri Salju",
    price: 80000,
    detail: "500g • Buttery • Gula halus lembut • Lumer dan ringan",
    desc: "Putri salju super lumer bertabur gula halus, lembut, creamy, dan cocok buat hampers."
  },
  lidah: {
    emoji: "🐱",
    image: "assets/img/lidah.jpg",
    title: "Lidah Kucing",
    price: 75000,
    detail: "450g • Renyah tipis • Aroma vanila-butter • Favorit semua umur",
    desc: "Lidah kucing tipis renyah—aroma butter-vanila yang wangi, sekali gigit langsung nagih."
  },
  kacang: {
    emoji: "🥜",
    image: "assets/img/kacang.jpg",
    title: "Kue Kacang",
    price: 70000,
    detail: "500g • Gurih kacang • Manis pas • Classic nostalgic",
    desc: "Kue kacang klasik yang gurih, manis, tekstur remah lembut dan rasa kacangnya terasa."
  },
  hampers: {
    emoji: "🎁",
    image: "assets/img/hampers.jpg",
    title: "Hampers Lebaran",
    price: 180000,
    detail: "Mix varian • Box premium • Kartu ucapan • Cocok hadiah",
    desc: "Hampers siap kirim: packaging elegan, bisa mix varian + kartu ucapan—tinggal kasih!"
  },
  sagu: {
    emoji: "🧈",
    image: "assets/img/sagu.jpg",
    title: "Sagu Keju",
    price: 78000,
    detail: "500g • Lumer • Aroma keju • Tekstur renyah halus",
    desc: "Sagu keju yang ringan dan lumer, renyah di luar, melt di mulut, kejunya berasa."
  },
  semprit: {
    emoji: "🌼",
    image: "assets/img/semprit.jpg",
    title: "Semprit Butter",
    price: 76000,
    detail: "500g • Wangi butter • Manis pas • Bentuk cantik",
    desc: "Semprit klasik yang wangi butter, renyah cantik, manisnya pas, favorit keluarga."
  },
  coklat: {
    emoji: "🍫",
    image: "assets/img/coklat.jpg",
    title: "Choco Cookies",
    price: 79000,
    detail: "500g • Choco chips • Renyah • Manis legit",
    desc: "Cookies coklat chewy-renyah dengan choco chips melimpah, cocok buat semua umur."
  },
  almond: {
    emoji: "🌰",
    image: "assets/img/almond.jpg",
    title: "Almond Cookies",
    price: 88000,
    detail: "500g • Almond panggang • Renyah • Aroma kacang",
    desc: "Almond crispy cookies: renyah, wangi panggang, topping almond yang bikin makin premium."
  },
  snowball: {
    emoji: "⛄",
    image: "assets/img/snowball.jpg",
    title: "Snowball",
    price: 82000,
    detail: "500g • Bulat mini • Salju gula • Lumer",
    desc: "Snowball coklat: bulat mungil lumer dengan taburan gula, manisnya lembut dan elegan."
  },
  palm: {
    emoji: "🧀",
    image: "assets/img/palm.jpg",
    title: "Palm Cheese",
    price: 86000,
    detail: "500g • Keju gurih • Manis palm sugar • Unik",
    desc: "Palm cheese cookies: perpaduan manis gula aren + gurih keju, unik dan bikin ketagihan."
  },
  brownies: {
    emoji: "🍫",
    image: "assets/img/brownies.jpg",
    title: "Brownies Kering",
    price: 84000,
    detail: "450g • Coklat pekat • Renyah • Tidak mudah remuk",
    desc: "Brownies kering renyah dengan rasa coklat pekat, enak buat camilan & teman teh/kopi."
  }
};

const CART_KEY = "ngekue_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(key, qty = 1) {
  const cart = getCart();
  const found = cart.find(i => i.key === key);
  if (found) found.qty += qty;
  else cart.push({ key, qty });
  setCart(cart);
}
function clearCart() {
  setCart([]);
  renderCartPage();
}
function updateQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    const idx = cart.findIndex(i => i.key === key);
    if (idx >= 0) cart.splice(idx, 1);
  }
  setCart(cart);
  renderCartPage();
}
function removeItem(key) {
  const cart = getCart().filter(i => i.key !== key);
  setCart(cart);
  renderCartPage();
}

function formatIDR(num){
  try{
    return new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(Number(num) || 0);
  }catch{
    return 'Rp ' + (Number(num) || 0).toLocaleString('id-ID');
  }
}

function thumbHTML(p, cls="thumb-img"){
  const src = p && p.image ? p.image : null;
  const alt = (p && p.title) ? p.title : "Produk";
  if(src){
    return `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" onerror="this.style.display='none'; this.parentElement?.classList.add('thumb-fallback')" />`;
  }
  return `<span class="thumb-emoji" aria-hidden="true">${(p && p.emoji) ? p.emoji : "🍪"}</span>`;
}
function cartCount() {
  return getCart().reduce((a, b) => a + (b.qty || 0), 0);
}
function updateCartBadge() {
  const badgeEls = document.querySelectorAll("#cartBadge, #footerCartBadge");
  const n = cartCount();
  badgeEls.forEach(el => {
    el.textContent = String(n);
    el.style.display = n > 0 ? "flex" : "none";
  });
  try{ renderMiniCart(); }catch(e){}
}
function renderCartPage() {
  const wrap = document.getElementById("cartWrap");
  const empty = document.getElementById("cartEmpty");
  const itemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  if (!wrap || !empty || !itemsEl || !subtotalEl) return;

  const cart = getCart();
  if (!cart.length) {
    empty.style.display = "block";
    wrap.style.display = "none";
    return;
  }
  empty.style.display = "none";
  wrap.style.display = "block";

  itemsEl.innerHTML = "";
  let subtotal = 0;

  cart.forEach(({ key, qty }) => {
    const p = PRODUCTS[key];
    if (!p) return;

    const price = (p.price || 0);
    const line = price * qty;
    subtotal += line;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-thumb">${thumbHTML(p,'thumb-img')}</div>
      <div class="cart-info">
        <h4>${p.title}</h4>
        <div class="muted">${p.detail || p.desc || ""}</div>
        <div class="cart-line" style="margin-top:6px; display:flex; gap:10px; align-items:baseline; flex-wrap:wrap;">
          <div class="price">${formatIDR(price)}</div>
          <div class="muted" style="font-size:12px;">• Subtotal: <strong style="color:var(--text)">${formatIDR(line)}</strong></div>
        </div>
      </div>
      <div class="cart-controls">
        <div class="qty" aria-label="Atur jumlah">
          <button type="button" onclick="updateQty('${key}',-1)" aria-label="Kurangi">−</button>
          <span>${qty}</span>
          <button type="button" onclick="updateQty('${key}',1)" aria-label="Tambah">+</button>
        </div>
        <button class="btn-outline" type="button" onclick="removeItem('${key}')" aria-label="Hapus">Hapus</button>
      </div>
    `;
    itemsEl.appendChild(row);
  });

  subtotalEl.textContent = formatIDR(subtotal);
}

function prefillOrderFromCart(e) {
  const a = e.currentTarget;
  if (!a) return;
  a.href = "order.html?cart=1";
}


const $ = (id) => document.getElementById(id);
const rupiah = (n) => formatIDR(n);

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const target = href.split("/").pop();
    if (target === path) a.classList.add("active");
  });
}

function hydrateSocialLinks() {
  const waLink = `https://wa.me/${ADMIN_WA}`;
  document.querySelectorAll("[data-social='ig']").forEach(a => (a.href = IG_URL));
  document.querySelectorAll("[data-social='tiktok']").forEach(a => (a.href = TIKTOK_URL));
  document.querySelectorAll("[data-social='wa']").forEach(a => (a.href = waLink));
  document.querySelectorAll(".social-links a").forEach(a => {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");
  initMiniCart();
  setActiveNav();
  hydrateSocialLinks();
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  setMinDate();
  hydrateOrderFromQuery();
  calcTotal();

  updateCartBadge();
  renderCartPage();

  enhanceProductCards();

  document.querySelectorAll('.product-card[role="button"]').forEach((el)=>{
    el.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  ["change", "input"].forEach((evt) => {
    $("productSelect")?.addEventListener(evt, calcTotal);
    $("qty")?.addEventListener(evt, calcTotal);
    $("delivery")?.addEventListener(evt, calcTotal);
  });

  setupScrollTop();

  $("modal")?.addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });

  $("orderForm")?.addEventListener("submit", handleSubmit);
  $("orderForm")?.addEventListener("reset", () => {
    setTimeout(() => {
      clearAlert();
      calcTotal();
      document.querySelectorAll(".field.error").forEach((el) => el.classList.remove("error"));
    }, 0);
  });
  $("contactForm")?.addEventListener("submit", handleContact);
});

window.openProductModal = openProductModal;
window.closeModal = closeModal;
window.chooseProduct = chooseProduct;
window.scrollToTop = scrollToTop;
window.scrollToOrder = scrollToOrder;
window.scrollToProducts = scrollToProducts;

function scrollToOrder() {
  const section = document.querySelector("#order");
  if (section) section.scrollIntoView({ behavior: "smooth" });
  else window.location.href = "order.html";
}
function scrollToProducts() {
  const section = document.querySelector("#products");
  if (section) section.scrollIntoView({ behavior: "smooth" });
  else window.location.href = "produk.html";
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupScrollTop() {
  const btn = $("scrollTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) btn.classList.add("show");
    else btn.classList.remove("show");
  });
}

let selectedProductKey = null;

function openProductModal(key) {
  const p = PRODUCTS[key];
  if (!p) return;
  selectedProductKey = key;

  const modalEl = $("modal");
  const titleEl = $("modalTitle");
  const descEl = $("modalDesc");
  const emojiEl = $("modalEmoji");
  const nameEl = $("modalName");
  const specEl = $("modalSpec");
  const detailEl = $("modalDetail");
  const priceEl = $("modalPrice");
  if (!modalEl || !titleEl || !descEl || !nameEl || !detailEl || !priceEl) return;

  titleEl.textContent = "Detail Produk";
  descEl.textContent = p.desc;

  if (emojiEl){
    emojiEl.innerHTML = thumbHTML(p,'thumb-img');
  }

  nameEl.textContent = p.title;

  if (specEl){
    specEl.innerHTML = "";
    const parts = String(p.detail || "")
      .split("•")
      .map(s => s.trim())
      .filter(Boolean);
    if (parts.length){
      parts.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        specEl.appendChild(li);
      });
      specEl.style.display = "";
      detailEl.style.display = "none";
    }else{
      specEl.style.display = "none";
      detailEl.style.display = "";
      detailEl.textContent = p.detail || "";
    }
  }else{
    detailEl.textContent = p.detail || "";
  }

  priceEl.textContent = rupiah(p.price);

  document.body.classList.add("modal-open");
  modalEl.classList.add("show");
  try{ $("modal").focus?.(); }catch(e){}
}

function enhanceProductCards(){
  const cards = Array.from(document.querySelectorAll('.product-item[data-key]'));
  if(!cards.length) return;

  const palettes = [
    ['rgba(255,204,102,.18)', 'rgba(124,243,208,.10)'],
    ['rgba(124,243,208,.16)', 'rgba(255,107,107,.10)'],
    ['rgba(255,159,26,.16)', 'rgba(124,243,208,.08)'],
    ['rgba(168,85,247,.16)', 'rgba(255,204,102,.08)']
  ];

  cards.forEach((card, idx)=>{
    const key = card.getAttribute('data-key');
    const p = PRODUCTS[key];
    if(!p) return;

    const imgBox = card.querySelector('.product-item-img');
    if(imgBox){
      imgBox.setAttribute('data-name', String(key||'').toUpperCase());
      imgBox.innerHTML = thumbHTML(p,'thumb-img');
    }
    const titleEl = card.querySelector('h3');
    if(titleEl) titleEl.textContent = p.title;
    const descEl = card.querySelector('.product-desc');
    if(descEl) descEl.textContent = p.detail;
    const priceEl = card.querySelector('.product-price');
    if(priceEl) priceEl.textContent = formatIDR(p.price);

    const pal = palettes[idx % palettes.length];
    const img = card.querySelector('.product-item-img');
    if(img) img.style.background = `linear-gradient(135deg, ${pal[0]}, ${pal[1]})`;

    card.addEventListener('click', (e)=>{
      const t = e.target;
      if(t && (t.closest('button') || t.closest('a'))) return;
      openProductModal(key);
    });

    const addBtn = card.querySelector('button[data-action="add"]');
    if(addBtn){
      addBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        addToCart(key, 1);
      });
    }
    const detailBtn = card.querySelector('button[data-action="detail"]');
    if(detailBtn){
      detailBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        openProductModal(key);
      });
    }
  });
}
function closeModal() {
  $("modal").classList.remove("show");
  document.body.classList.remove("modal-open");
}
function chooseProduct() {
  if (!selectedProductKey) return;

  const sel = $("productSelect");
  if (sel) {
    sel.value = selectedProductKey;
    calcTotal();
    closeModal();
    sel.focus();
    return;
  }

  addToCart(selectedProductKey, 1);
  closeModal();
  renderCartPage();
}

function hydrateOrderFromQuery() {
  const sel = $("productSelect");
  if (!sel) return;
  const params = new URLSearchParams(window.location.search);
  const key = params.get("product");
  if (key && PRODUCTS[key]) {
    sel.value = key;
  }

  if (params.get("cart") === "1") {
    const cart = getCart();
    if (cart.length) {
      const firstKey = cart[0].key;
      const sel = $("productSelect");
      if (sel) sel.value = firstKey;

      const totalQty = cart.reduce((a, b) => a + (b.qty || 0), 0);
      const qtyEl = $("qty");
      if (qtyEl) qtyEl.value = String(Math.max(1, totalQty));

      const notes = $("notes");
      if (notes) {
        const summary = cart
          .map(i => `${PRODUCTS[i.key]?.title || i.key} x${i.qty}`)
          .join(", ");
        notes.value = (notes.value ? notes.value + "\n" : "") + `Keranjang: ${summary}`;
      }
    }
  }
}

function setMinDate() {
  const shipDate = $("shipDate");
  if (!shipDate) return;

  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  shipDate.setAttribute("min", `${yyyy}-${mm}-${dd}`);
}

function getSelectedPrice() {
  const sel = $("productSelect");
  const opt = sel?.options[sel.selectedIndex];
  return Number(opt?.dataset?.price || 0);
}
function getDeliveryFee() {
  const sel = $("delivery");
  const opt = sel?.options[sel.selectedIndex];
  return Number(opt?.dataset?.fee || 0);
}
function calcTotal() {
  const sel = $("productSelect");
  const qty = $("qty");
  const delivery = $("delivery");

  if (!sel || !qty || !delivery) return;

  const price = getSelectedPrice();
  const q = Math.max(1, Number(qty.value || 1));
  qty.value = q;

  const ship = getDeliveryFee();

  $("priceText").textContent = price ? rupiah(price) : "—";
  $("qtyText").textContent = String(q);
  $("shipText").textContent = rupiah(ship);

  const total = price ? price * q + ship : 0;
  $("totalText").textContent = total ? rupiah(total) : "—";
}

function showAlert(type, msg) {
  const alertBox = $("formAlert");
  alertBox.className = `alert show ${type}`;
  alertBox.textContent = msg;
}
function clearAlert() {
  const alertBox = $("formAlert");
  alertBox.className = "alert";
  alertBox.textContent = "";
}

function isValidWA(wa) {
  const cleaned = wa.replace(/\s|-/g, "").trim();
  return /^(\+62|62|0)\d{8,14}$/.test(cleaned);
}
function normalizeWA(wa) {
  let w = wa.replace(/\s|-/g, "").trim();
  if (w.startsWith("+")) w = w.slice(1);
  if (w.startsWith("0")) w = "62" + w.slice(1);
  return w;
}

function handleSubmit(e) {
  e.preventDefault();
  clearAlert();

  const requiredIds = ["name", "wa", "productSelect", "qty", "address", "shipDate", "payment"];
  let firstInvalid = null;

  requiredIds.forEach((id) => {
    const el = $(id);
    el.classList.remove("error");
    if (!el.value && !firstInvalid) firstInvalid = el;
    if (!el.value) el.classList.add("error");
  });

  if (firstInvalid) {
    showAlert("error", "Mohon lengkapi semua kolom wajib (bertanda *).");
    firstInvalid.focus();
    return;
  }

  const waVal = $("wa").value;
  if (!isValidWA(waVal)) {
    $("wa").classList.add("error");
    showAlert("error", "Nomor WhatsApp tidak valid. Contoh: 08xxxxxxxxxx atau +62xxxxxxxxxx");
    $("wa").focus();
    return;
  }

  const productKey = $("productSelect").value;
  const p = PRODUCTS[productKey];
  const q = Number($("qty").value);
  const ship = getDeliveryFee();
  const total = p.price * q + ship;

  const data = {
    nama: $("name").value.trim(),
    wa: normalizeWA(waVal),
    alamat: $("address").value.trim(),
    produk: p.title,
    qty: q,
    tanggal: $("shipDate").value,
    pembayaran: $("payment").options[$("payment").selectedIndex].textContent.trim(),
    pengiriman: $("delivery").options[$("delivery").selectedIndex].textContent.trim(),
    catatan: $("notes").value.trim(),
    total
  };

  showAlert("success", "Pesanan siap dikirim ke WhatsApp admin. Mengarahkan…");

  const text =
    `Halo NGEKUE, saya mau pesan kue lebaran:\n\n` +
    `Nama: ${data.nama}\n` +
    `WA: ${data.wa}\n` +
    `Produk: ${data.produk}\n` +
    `Jumlah: ${data.qty}\n` +
    `Tanggal kirim/ambil: ${data.tanggal}\n` +
    `Pengiriman: ${data.pengiriman}\n` +
    `Pembayaran: ${data.pembayaran}\n` +
    `Alamat: ${data.alamat}\n` +
    (data.catatan ? `Catatan: ${data.catatan}\n` : "") +
    `\nEstimasi Total: ${rupiah(data.total)}\n` +
    `\nMohon konfirmasi stok & ongkir final. Terima kasih 🙏`;

  if (ADMIN_WA.includes("X")) {
    showAlert("error", "Gagal: nomor ADMIN_WA belum kamu isi. Buka script.js lalu ganti 62XXXXXXXXXXX.");
    return;
  }

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function handleContact(e) {
  e.preventDefault();
  const name = $("cName")?.value?.trim() || "";
  const wa = $("cWA")?.value?.trim() || "";
  const msg = $("cMsg")?.value?.trim() || "";

  if (!name || !msg || !wa) {
    alert("Mohon isi nama, WhatsApp, dan pesan.");
    return;
  }
  if (!isValidWA(wa)) {
    alert("Nomor WhatsApp tidak valid.");
    return;
  }

  const text =
    `Halo NGEKUE, saya ${name}.\n` +
    `WA: ${normalizeWA(wa)}\n\n` +
    `Pesan: ${msg}`;

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function toast(message){
  let el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=> el.classList.remove('show'), 1600);
}

function calcCartTotal(cart){
  return cart.reduce((sum, it)=>{
    const p = PRODUCTS[it.key]?.price || 0;
    return sum + p * it.qty;
  }, 0);
}

function renderMiniCart(){
  const box = document.getElementById('miniCart');
  if(!box) return;
  const cart = getCart();
  const total = calcCartTotal(cart);

  if(cart.length === 0){
    box.innerHTML = `
      <div class="mc-head">
        <div class="mc-title">Keranjang</div>
        <button class="mc-close" id="mcClose" type="button" aria-label="Tutup">✕</button>
      </div>
      <div class="muted" style="color:var(--muted); font-size:13px; padding: 6px 0 12px;">
        Keranjang kamu masih kosong. Yuk pilih kue dulu 😄
      </div>
      <div class="mc-actions">
        <a class="btn-outline" href="produk.html">Lihat Produk</a>
        <a class="btn-primary" href="order.html">Order</a>
      </div>
    `;
  }else{
    const itemsHtml = cart.map(it=>{
      const p = PRODUCTS[it.key];
      const title = p?.title || it.key;
      const line = p?.detail || '';
      return `
        <div class="mc-item">
          <div>
            <h4>${title}</h4>
            <p>${line}</p>
            <p style="margin-top:6px; font-weight:800;">${formatIDR((p?.price||0) * it.qty)}</p>
          </div>
          <div class="mc-qty">
            <button type="button" data-mc="-1" data-key="${it.key}" aria-label="Kurangi">−</button>
            <span>${it.qty}</span>
            <button type="button" data-mc="1" data-key="${it.key}" aria-label="Tambah">+</button>
          </div>
        </div>
      `;
    }).join('');

    box.innerHTML = `
      <div class="mc-head">
        <div class="mc-title">Keranjang</div>
        <button class="mc-close" id="mcClose" type="button" aria-label="Tutup">✕</button>
      </div>
      <div class="mc-items">${itemsHtml}</div>
      <div class="mc-foot">
        <div class="mc-total">
          <span>Total</span>
          <strong style="color:var(--text)">${formatIDR(total)}</strong>
        </div>
        <div class="mc-actions">
          <a class="btn-outline" href="keranjang.html">Lihat Keranjang</a>
          <a class="btn-primary" href="order.html">Checkout</a>
        </div>
      </div>
    `;
  }

  const closeBtn = document.getElementById('mcClose');
  if(closeBtn) closeBtn.onclick = () => closeMiniCart();

  box.querySelectorAll('button[data-mc]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.getAttribute('data-key');
      const delta = parseInt(btn.getAttribute('data-mc'), 10);
      updateQty(key, delta);
      renderMiniCart();
    });
  });
}

function openMiniCart(){
  const box = document.getElementById('miniCart');
  if(!box) return;
  renderMiniCart();
  box.classList.add('open');
  box.setAttribute('aria-hidden','false');
}
function closeMiniCart(){
  const box = document.getElementById('miniCart');
  if(!box) return;
  box.classList.remove('open');
  box.setAttribute('aria-hidden','true');
}
function toggleMiniCart(){
  const box = document.getElementById('miniCart');
  if(!box) return;
  if(box.classList.contains('open')) closeMiniCart();
  else openMiniCart();
}
function initMiniCart(){
  const btn = document.getElementById('cartBtn');
  const box = document.getElementById('miniCart');
  if(!btn || !box) return;

  btn.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); toggleMiniCart(); });
  document.addEventListener('click', ()=> closeMiniCart());
  box.addEventListener('click', (e)=> e.stopPropagation());
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMiniCart(); });

  renderMiniCart();
}

(function(){
  function setHasLogo(){
    document.documentElement.classList.add('has-brand-logo');
  }
  const imgs = Array.from(document.querySelectorAll('img.logo-img'));
  if (!imgs.length) return;
  let decided = false;
  imgs.forEach((img) => {
    function ok(){
      if (decided) return;
      if (img.naturalWidth && img.naturalHeight) { decided = true; setHasLogo(); }
    }
    function fail(){
    }
    if (img.complete) ok();
    img.addEventListener('load', ok);
    img.addEventListener('error', fail);
  });
})();
