import { savedData as productsData } from "./services/fetchData";
import { settings } from "./services/fetchSettings";
import "./styles/global.css";
import { renderProducts } from "./utilities/renderProducts";

/* Selecting Elements */
const navbar = document.querySelector(".navbar");
const selectQuantityEl = document.querySelector(".product-quantity-box");
// const sectionWhyEl = document.querySelector(".section-why");
// const sectionIngredientsEl = document.querySelector(".section-ingredients");
const sections = document.querySelectorAll("section");
const sectionProductsEl = document.querySelector(".section-products");
const productsContainerEl = sectionProductsEl.querySelector(
  ".products-container"
);

/* === NAVIGATION === */
function changeActiveNavLink(section) {
  const links = navbar.querySelectorAll("li");
  const linkToBeActivated = Array.from(links).find(
    (link) => link.dataset.section === section.id
  );

  links.forEach((link) => link.classList.remove("active"));

  linkToBeActivated.classList.add("active");
}

function handleIntersections(payload) {
  const { isIntersecting, target } = payload[0];
  if (isIntersecting) changeActiveNavLink(target);
}

sections.forEach((section) => {
  if (!section.id) return;
  const sectionObserver = new IntersectionObserver(handleIntersections);
  sectionObserver.observe(section);
});

/* === PRODUCTS === */
const sectionObserver = new IntersectionObserver(lazyLoadProducts);
sectionObserver.observe(sectionProductsEl);

let wasIntersected = false;

// Lazy-Load first data

async function lazyLoadProducts(payload) {
  const { isIntersecting } = payload[0];
  if (isIntersecting) {
    if (!wasIntersected) {
      await renderProducts(productsContainerEl);
      observeLastItem();
    }
    wasIntersected = true;
  }
}

// Observe last element in container

const getLastItem = () =>
  productsContainerEl.querySelector(".product-box:last-child");

function observeLastItem() {
  lastItemObserver.observe(getLastItem());
}

// Load new data when last item was seen by user

async function infiniteLoader(payload) {
  const { isIntersecting } = payload[0];
  if (isIntersecting) {
    await renderProducts(productsContainerEl);
    observeLastItem();
  }
}
const lastItemObserver = new IntersectionObserver(infiniteLoader);

// Listen to click to product-box

productsContainerEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("product-box")) return;
  renderPopup(
    productsData.find((product) => product.id === Number(e.target.dataset.id))
  );
});

function renderPopup(data) {
  const markup = `
  <div class="popup">
    <div class="popup-window">
      <div>ID: <span class="id_number">${data.id}</span></div>
      <div>Nazwa: <span class="id_name">${data.name}</span></div>
      <div>Wartość: <span>${data.value}</span></div>
      <button class="close-popup">x</button>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", markup);

  const closeButton = document.querySelector(".close-popup");
  const popup = document.querySelector(".popup");
  closeButton.addEventListener("click", function () {
    popup.outerHTML = "";
  });
}

// Change Page Size
selectQuantityEl.addEventListener("change", (e) => {
  const newPageSize = Number(e.target.value);
  settings.pageSize = newPageSize;
});

// Handle Hamburger Menu
const hamburgerMenuEl = document.querySelector(".hamburger-menu");

function hamburgerToggle(btn) {
  btn.classList.toggle("isActive");
}

hamburgerMenuEl.addEventListener("click", (e) => hamburgerToggle(e.target));
