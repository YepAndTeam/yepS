document.addEventListener('DOMContentLoaded', () => {
    let card = JSON.parse(localStorage.getItem('card')) || []; 

    const cartContent = document.getElementById('cart-content');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    if (card.length === 0) {
        cartContent.innerHTML = '<p>Корзина пуста.</p>';
        totalPriceElement.textContent = '0 ₽';
        return;
    }


    card.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Цена: ${item.price} ₽</p>
            <p>Количество: ${item.quantity}</p>
            <button class="remove-item" data-id="${item.id}">Удалить</button>
        `;
        cartContent.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${totalPrice} ₽`;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            card = card.filter(item => item.id !== productId);
            localStorage.setItem('card', JSON.stringify(card));
            location.reload();
        });
    });
});
