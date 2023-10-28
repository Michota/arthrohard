import { savedData as productsData } from "./services/fetchData";
import { settings } from "./services/fetchSettings";
import "./styles/global.css";
import { renderProducts } from "./utilities/renderProducts";

const selectQuantityEl = document.querySelector(".product-quantity-box");
const sectionProducts = document.querySelector(".section-products");
const productsContainer = sectionProducts.querySelector(".products-container");

let wasIntersected = false;

// Lazy-Load first data
async function lazyLoadProducts(payload) {
  const { isIntersecting } = payload[0];
  if (isIntersecting) {
    if (!wasIntersected) {
      await renderProducts(productsContainer);
      observeLastItem();
    }
    wasIntersected = true;
  }
}

const sectionObserver = new IntersectionObserver(lazyLoadProducts);
sectionObserver.observe(sectionProducts);

// Observe last element in container

const getLastItem = () =>
  productsContainer.querySelector(".product-box:last-child");

function observeLastItem() {
  lastItemObserver.observe(getLastItem());
}

// Load new data when last item was seen by user

async function infiniteLoader(payload) {
  const { isIntersecting } = payload[0];
  if (isIntersecting) {
    await renderProducts(productsContainer);
    observeLastItem();
  }
}
const lastItemObserver = new IntersectionObserver(infiniteLoader);

// Listen to click to product-box

productsContainer.addEventListener("click", (e) => {
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
