document.addEventListener('DOMContentLoaded', () => {
    const inventory = [
        { id: '001', name: 'Aspirin', shelfLife: '2025-12-31', quantity: 10 },
        { id: '002', name: 'Tylenol', shelfLife: '2024-09-30', quantity: 0 },
        { id: '003', name: 'Antibiotic X', shelfLife: '2026-05-15', quantity: 5 },
        { id: '004', name: 'Vitamin C', shelfLife: '2025-08-20', quantity: 20 },
        { id: '005', name: 'Ibuprofen', shelfLife: '2024-12-01', quantity: 8 },
        { id: '006', name: 'Naproxen', shelfLife: '2025-03-31', quantity: 12 },
        { id: '007', name: 'Cough Syrup', shelfLife: '2024-06-15', quantity: 15 },
        { id: '008', name: 'Antihistamine', shelfLife: '2026-01-10', quantity: 7 },
        { id: '009', name: 'Insulin', shelfLife: '2025-05-30', quantity: 6 },
        { id: '010', name: 'Loratadine', shelfLife: '2024-11-20', quantity: 13 },
        { id: '011', name: 'Omeprazole', shelfLife: '2025-07-01', quantity: 9 },
        { id: '012', name: 'Metformin', shelfLife: '2026-02-28', quantity: 22 },
        { id: '013', name: 'Amlodipine', shelfLife: '2025-09-15', quantity: 18 },
        { id: '014', name: 'Hydrochlorothiazide', shelfLife: '2024-12-31', quantity: 4 },
        { id: '015', name: 'Simvastatin', shelfLife: '2025-06-30', quantity: 11 },
        { id: '016', name: 'Cetirizine', shelfLife: '2024-10-05', quantity: 25 },
        { id: '017', name: 'Ranitidine', shelfLife: '2025-04-20', quantity: 14 },
        { id: '018', name: 'Azithromycin', shelfLife: '2024-11-30', quantity: 3 },
        { id: '019', name: 'Doxycycline', shelfLife: '2025-08-01', quantity: 17 },
        { id: '020', name: 'Prednisone', shelfLife: '2024-12-15', quantity: 2 }
    ];

    const tableBody = document.querySelector('#inventoryTable tbody');
    const searchInput = document.querySelector('#searchInput');
    const cartIcon = document.querySelector('#cartIcon');
    const cartModal = document.querySelector('#cartModal');
    const cartItemsList = document.querySelector('#cartItems');
    const closeCartButton = document.querySelector('#closeCart');
    let cart = [];

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(med => {
            const row = document.createElement('tr');
            let statusClass = '';
            let statusText = 'In Stock';
            if (med.quantity === 0) {
                statusClass = 'out-of-stock';
                statusText = 'Out of Stock';
            } else if (med.quantity < 10) {
                statusClass = 'low-stock';
                statusText = 'Low Stock';
            } else {
                statusClass = 'in-stock';
            }

            row.innerHTML = `
                <td>${med.id}</td>
                <td>${med.name}</td>
                <td>${med.shelfLife}</td>
                <td class="${statusClass}">${med.quantity}</td>
                <td class="${statusClass}">${statusText}</td>
            `;

            if (statusClass === 'out-of-stock' || statusClass === 'low-stock') {
                row.addEventListener('click', () => handleStockClick(med));
                row.style.cursor = 'pointer';
            }

            tableBody.appendChild(row);
        });
    }

    function filterTable() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredData = inventory.filter(med =>
            med.name.toLowerCase().includes(query) ||
            med.id.toLowerCase().includes(query)
        );

        if (filteredData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Medicine not available in inventory.</td></tr>';
        } else {
            renderTable(filteredData);
        }
    }

    function handleStockClick(medicine) {
        if (medicine.quantity === null) {
            alert(`The medicine ${medicine.name} is not available.`);
            return;
        }
        const quantity = prompt(`Enter the quantity for ${medicine.name} to add to cart:`, "1");
        if (quantity !== null && !isNaN(quantity) && parseInt(quantity) > 0) {
            addToCart(medicine, parseInt(quantity));
        } else if (quantity !== null) {
            alert("Please enter a valid number greater than 0.");
        }
    }

    function addToCart(medicine, quantity) {
        const cartItem = cart.find(item => item.id === medicine.id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ ...medicine, quantity });
        }
        updateCartIcon();
    }

    function updateCartIcon() {
        cartIcon.textContent = `🛒 Cart (${cart.length})`;
    }

    function showCart() {
        cartItemsList.innerHTML = '';
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} (ID: ${item.id}) - 
                Quantity: <span class="editable-quantity">${item.quantity}</span>
                <span class="edit-icon" data-index="${index}" title="Edit Quantity">🖉</span>
                <span class="delete-icon" data-index="${index}" title="Delete Item">❌</span>
            `;
            cartItemsList.appendChild(listItem);
        });

        document.querySelectorAll('.edit-icon').forEach(icon => {
            icon.addEventListener('click', handleEdit);
        });

        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', handleDelete);
        });

        cartModal.classList.remove('hidden');
    }

    function handleEdit(event) {
        const index = parseInt(event.target.dataset.index, 10);
        const newQuantity = prompt(`Enter new quantity for ${cart[index].name}:`, cart[index].quantity);
        if (newQuantity !== null && !isNaN(newQuantity) && parseInt(newQuantity) > 0) {
            cart[index].quantity = parseInt(newQuantity, 10);
            showCart();
        } else if (newQuantity !== null) {
            alert("Please enter a valid number greater than 0.");
        }
    }

    function handleDelete(event) {
        const index = parseInt(event.target.dataset.index, 10);
        if (confirm(`Are you sure you want to remove ${cart[index].name} from the cart?`)) {
            cart.splice(index, 1);
            updateCartIcon();
            showCart();
        }
    }

    function closeCart() {
        cartModal.classList.add('hidden');
    }

    function handleBuyItems() {
        if (cart.length === 0) {
            alert("Your cart is empty! Add items before placing an order.");
            return;
        }

        const confirmPurchase = confirm('Do you want to place the order for the items in your cart?');
        if (confirmPurchase) {
            const order = {
                orderId: 'ORD' + new Date().getTime(),
                items: [...cart],
                status: 'Pending'
            };

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            cart = [];
            updateCartIcon();
            showCart();
            alert("Your order has been placed successfully!");
            window.location.href = 'view-suppliers.html';
        }
    }

    searchInput.addEventListener('input', filterTable);
    cartIcon.addEventListener('click', showCart);
    closeCartButton.addEventListener('click', closeCart);
    document.querySelector('#buyItems').addEventListener('click', handleBuyItems);
    renderTable(inventory);
});
