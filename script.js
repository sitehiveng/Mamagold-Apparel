/* ==========================================================================
   MAMAGOLD APPAREL — script.js
   - PRODUCTS array: edit this list to add/remove/update featured products.
     No prices are included per business instruction; WhatsApp enquiry only.
   - Handles: product rendering, broken-image fallback, scroll reveal,
     sticky header shrink, mobile menu close-on-click.
   ========================================================================== */

const WHATSAPP_NUMBER = "2348032517026";

/* Edit this array to change what appears in "The Mamagold Collection".
   image: primary hotlinked photo. fallback: shown automatically if the
   primary image fails to load, so a broken image is never visible. */
const PRODUCTS = [
  {
    name: "Classic Heeled Shoes",
    category: "Shoes",
    image: "https://images.pexels.com/photos/35754615/pexels-photo-35754615.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Shoes"
  },
  {
    name: "Signature Gold-Chain Bag",
    category: "Bags",
    image: "https://images.pexels.com/photos/28775829/pexels-photo-28775829.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Bags"
  },
  {
    name: "Premium Lace Wig",
    category: "Wigs",
    image: "https://images.pexels.com/photos/4718638/pexels-photo-4718638.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Wigs"
  },
  {
    name: "Gold Statement Earrings",
    category: "Jewellery",
    image: "https://images.pexels.com/photos/32989030/pexels-photo-32989030.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Jewellery"
  },
  {
    name: "Elegant Native Apparel",
    category: "Apparel",
    image: "https://images.pexels.com/photos/33968170/pexels-photo-33968170.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Apparel"
  },
  {
    name: "Everyday Clothing Pieces",
    category: "Clothing",
    image: "https://images.pexels.com/photos/5424922/pexels-photo-5424922.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Clothing"
  },
  {
    name: "Evening Clutch Bag",
    category: "Bags",
    image: "https://images.pexels.com/photos/20591024/pexels-photo-20591024.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Bags"
  },
  {
    name: "Fine Gold Bracelet",
    category: "Jewellery",
    image: "https://images.pexels.com/photos/16853521/pexels-photo-16853521.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/700x740/1D1A15/C9A344?text=Jewellery"
  }
];

function buildWhatsAppLink(productName){
  const text = encodeURIComponent(
    `Hello MAMAGOLD APPAREL, I'd like to enquire about: ${productName}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  const html = PRODUCTS.map((p) => `
    <div class="col-6 col-lg-3" data-reveal>
      <div class="mg-product-card">
        <div class="mg-product-media">
          <span class="mg-product-cat">${p.category}</span>
          <img src="${p.image}" data-fallback="${p.fallback}" alt="${p.name} — ${p.category}, MAMAGOLD APPAREL" loading="lazy">
        </div>
        <div class="mg-product-body">
          <h3 class="mg-product-name">${p.name}</h3>
          <a class="mg-product-enquire" href="${buildWhatsAppLink(p.name)}" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  `).join("");

  grid.innerHTML = html;
  attachRevealObserver();
}

/* Any image with data-fallback quietly swaps to a placeholder if the
   hotlinked photo fails — visitors never see a broken-image icon. */
function attachImageFallbacks(){
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", function handler(){
      if(this.src !== this.dataset.fallback){
        this.src = this.dataset.fallback;
      }
      this.removeEventListener("error", handler);
    });
  });
}

function attachRevealObserver(){
  const items = document.querySelectorAll("[data-reveal]:not(.mg-visible)");
  if(!("IntersectionObserver" in window)){
    items.forEach((el) => el.classList.add("mg-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add("mg-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el) => observer.observe(el));
}

function closeMobileMenuOnLinkClick(){
  const nav = document.getElementById("mgNav");
  if(!nav) return;
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if(nav.classList.contains("show")){
        const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
        collapse.hide();
      }
    });
  });
}

function shrinkHeaderOnScroll(){
  const header = document.getElementById("siteHeader");
  if(!header) return;
  const toggle = () => {
    header.style.boxShadow = window.scrollY > 12 ? "0 8px 24px rgba(0,0,0,0.25)" : "none";
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  attachImageFallbacks();
  attachRevealObserver();
  closeMobileMenuOnLinkClick();
  shrinkHeaderOnScroll();
});
