import { fetchData } from "../services/fetchData";

export async function renderProducts(containerElement) {
  const { data } = await fetchData();
  data.forEach(function (productData) {
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBox.dataset.id = productData.id;
    productBox.innerHTML = `
          <span>ID: <span class="product-id">${productData.id}</span></span>
    `;
    containerElement.appendChild(productBox);
  });
}
