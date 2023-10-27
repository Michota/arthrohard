import "./styles/global.css";

const api_link = "https://brandstestowy.smallhost.pl/api/random";
let pageNumber = 1;
const pageSize = 4;

async function fetchData() {
  const parameters = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await fetch(`${api_link}?${parameters}`).then((res) =>
    res.json()
  );
  pageNumber++;
  return response;
}

async function loadContent(containerElement) {
  const { data } = await fetchData();
  console.log(data);

  data.forEach(function (productData) {
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBox.innerHTML = `
          <span>ID: <span class="product-id">${productData.id}</span></span>
    `;
    containerElement.appendChild(productBox);
  });
}

const sectionProducts = document.querySelector(".section-products");
const products = sectionProducts.querySelector(".products");

// const options = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.2,
// };

// const callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       // Sprawdź, czy użytkownik jest blisko końca listy produktów
//       try {
//         const lastProduct = products.lastElementChild;
//         const lastProductBottom = lastProduct.getBoundingClientRect().bottom;
//         const sectionProductsBottom = entry.boundingClientRect.bottom;

//         if (lastProductBottom <= sectionProductsBottom) {
//           loadContent(products);
//           // Kontynuuj obserwację, aby umożliwić nieskończone ładowanie
//           observer.observe(lastProduct);
//         }
//         // ... reszta kodu ...
//       } catch (error) {
//         console.error("Wystąpił błąd:", error);
//       }
//     }
//   });
// };

// const sectionObserver = new IntersectionObserver(callback, options);
// sectionObserver.observe(products)
const btn = document.querySelector("#click");
btn.addEventListener("click", () => {
  loadContent(products);
});

loadContent(products);
