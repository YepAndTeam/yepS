// Проверка и инициализация корзины
let card = JSON.parse(localStorage.getItem('card')) || []; 

document.addEventListener('DOMContentLoaded', () => {
   
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseInt(button.getAttribute('data-price'));

            
            const existingItem = card.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                card.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            
            localStorage.setItem('card', JSON.stringify(card));

            alert(`${productName} добавлен в корзину!`);
        });
    });
});
document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const review = document.getElementById('review').value;

 
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card'); 
    reviewCard.innerHTML = `
        <h3>${name}</h3>
        <p>${review}</p>
        <small>${email}</small>
    `;

    
    const reviewsWrapper = document.querySelector('.reviews-wrapper');
    reviewsWrapper.appendChild(reviewCard);

    // Проверяем количество карточек
    const reviewCards = reviewsWrapper.querySelectorAll('.review-card');
    if (reviewCards.length > 4) {
        reviewsWrapper.classList.add('scroll-enabled'); 
    }

    
    document.getElementById('reviewForm').reset();
});
let autoScroll;

function startAutoScroll() {
    const reviewsWrapper = document.querySelector('.reviews-wrapper');
    autoScroll = setInterval(() => {
        reviewsWrapper.scrollLeft += 1; 
        if (
            reviewsWrapper.scrollLeft + reviewsWrapper.offsetWidth >=
            reviewsWrapper.scrollWidth
        ) {
            reviewsWrapper.scrollLeft = 0; 
        }
    }, 20); 
}

function stopAutoScroll() {
    clearInterval(autoScroll); 
}


const reviewsWrapper = document.querySelector('.reviews-wrapper');
reviewsWrapper.addEventListener('mouseover', stopAutoScroll);
reviewsWrapper.addEventListener('mouseout', startAutoScroll);


startAutoScroll();
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const productCards = document.querySelectorAll('.product-card');

    
    function filterProducts() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        productCards.forEach(card => {
            const productName = card.getAttribute('data-name').toLowerCase();
            const productCategory = card.getAttribute('data-category');
            
            const matchesSearch = productName.includes(searchQuery);
            const matchesCategory = selectedCategory === '' || productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none'; 
            }
        });
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

    
    filterProducts();
});
