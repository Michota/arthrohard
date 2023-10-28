import { fetchData } from "./fetchData";
import "./styles/global.css";

const sectionProducts = document.querySelector(".section-products");
const productsContainer = sectionProducts.querySelector(".products-container");

// btn.addEventListener("click", () => {
//   console.log(getLastItem());
// });

let wasIntersected = false;

const getLastItem = () =>
  productsContainer.querySelector(".product-box:last-child");

async function renderProducts(containerElement) {
  const { data } = await fetchData();
  data.forEach(function (productData) {
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBox.innerHTML = `
          <span>ID: <span class="product-id">${productData.id}</span></span>
    `;
    containerElement.appendChild(productBox);
  });
}

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

// Observe last element

// Load new data when last item was seen by user
async function renderNewData(payload) {
  const { isIntersecting } = payload[0];
  if (isIntersecting) {
    await renderProducts(productsContainer);
    observeLastItem();
  }
}

const lastItemObserver = new IntersectionObserver(renderNewData);

function observeLastItem() {
  lastItemObserver.observe(getLastItem());
}
