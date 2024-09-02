document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: 'Nike Air Max 270', price: '150€', imgSrc: 'assets/nike-air-max-270.jpg' },
        { name: 'Nike Air Force 1 Low', price: '110€', imgSrc: 'assets/nike-air-force-1.jpg' },
        { name: 'Nike React Element 55', price: '130€', imgSrc: 'assets/nike-react-element-55.jpg' },
        { name: 'Nike SB Dunk Low', price: '100€', imgSrc: 'assets/nike-sb-dunk-low.jpg' },
        { name: 'Nike Free RN 5.0', price: '120€', imgSrc: 'assets/nike-free-rn-5-0.jpg' },
        { name: 'Adidas Ultraboost 22', price: '180€', imgSrc: 'assets/adidas-ultraboost-22.jpg' },
        { name: 'Adidas Stan Smith', price: '100€', imgSrc: 'assets/adidas-stan-smith.jpg' },
        { name: 'Adidas NMD R1', price: '130€', imgSrc: 'assets/adidas-nmd-r1.jpg' },
        { name: 'Adidas Superstars', price: '110€', imgSrc: 'assets/adidas-superstars.jpg' },
        { name: 'Adidas Solar Glide 5', price: '140€', imgSrc: 'assets/adidas-solar-glide-5.jpg' },
        { name: 'New Balance 990v5', price: '200€', imgSrc: 'assets/new-balance-990v5.jpg' },
        { name: 'New Balance 574', price: '90€', imgSrc: 'assets/new-balance-574.jpg' },
        { name: 'New Balance Fresh Foam 1080v12', price: '150€', imgSrc: 'assets/new-balance-fresh-foam-1080v12.jpg' },
        { name: 'New Balance 327', price: '120€', imgSrc: 'assets/new-balance-327.jpg' },
        { name: 'New Balance 1080v11', price: '140€', imgSrc: 'assets/new-balance-1080v11.jpg' }
    ];

    const productContainer = document.getElementById('product-container');

    function renderProducts(products) {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.imgSrc}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button>Comprar</button>
            `;
            productContainer.appendChild(productElement);
        });
    }

    const modal = document.getElementById('filter-modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModal = document.querySelector('.close');
    const clearFiltersButton = document.getElementById('clear-filters');

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('filter-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const brand = document.getElementById('brand').value.toLowerCase();
        const maxPrice = parseInt(document.getElementById('max-price').value, 10);
        const filteredProducts = products.filter(product => {
            const isBrandMatch = product.name.toLowerCase().includes(brand);
            const isPriceMatch = isNaN(maxPrice) || parseInt(product.price, 10) <= maxPrice;
            return isBrandMatch && isPriceMatch;
        });

        if (filteredProducts.length === 0) {
            const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);
            renderProducts([{ name: 'Productos Sugeridos', price: '', imgSrc: '' }, ...randomProducts]);
        } else {
            renderProducts(filteredProducts);
        }
    });

    clearFiltersButton.addEventListener('click', () => {
        document.getElementById('brand').value = '';
        document.getElementById('max-price').value = '';
        renderProducts(products);
    });

    // Renderizar todos los productos al cargar la página
    renderProducts(products);
});
