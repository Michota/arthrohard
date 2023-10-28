import "./styles/global.css";
import { renderProducts } from "./utilities/renderProducts";

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
