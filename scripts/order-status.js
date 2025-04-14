document.addEventListener('DOMContentLoaded', () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];  // Load orders from localStorage
    const orderList = document.getElementById('orderList');

    // Function to render the order list
    function renderOrders() {
        orderList.innerHTML = '';  // Clear the list before rendering again

        if (orders.length === 0) {
            orderList.innerHTML = `<p>No orders placed yet.</p>`;
        } else {
            // Sort orders by orderId (or timestamp) to show the latest first
            orders.sort((a, b) => {
                // If orderId is numeric or timestamp, use this:
                return b.orderId - a.orderId; // For descending order
            });

            // Render the orders
            orders.forEach(order => {
                if (!order || !order.orderId || !order.status) return;  // Skip invalid orders

                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');

                // Add the status class based on order status
                let statusClass = 'status-pending';  // Default to pending
                if (order.status === 'Canceled') {
                    statusClass = 'status-canceled';
                } else if (order.status === 'Returned') {
                    statusClass = 'status-returned';
                }

                orderItem.innerHTML = `
                    <h2>Order ID: ${order.orderId}</h2>
                    <p class="status ${statusClass}">Status: ${order.status}</p>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
                    </ul>
                    <div>
                        ${order.cancelable ? `<button class="cancel" onclick="cancelOrder('${order.orderId}')">Cancel Order</button>` : ''}
                        ${order.returnable ? `<button class="return" onclick="returnOrder('${order.orderId}')">Return Order</button>` : ''}
                    </div>
                `;
                orderList.appendChild(orderItem);
            });
        }
    }

    // Handle cancel order action
    function cancelOrder(orderId) {
        const order = orders.find(order => order.orderId === orderId);
        if (order && order.cancelable) {
            order.status = 'Canceled';
            alert(`Order ${orderId} has been canceled.`);
            localStorage.setItem('orders', JSON.stringify(orders));  // Save the updated order list to localStorage
            renderOrders();  // Re-render the orders
        } else {
            alert("This order cannot be canceled.");
        }
    }

    // Handle return order action
    function returnOrder(orderId) {
        const order = orders.find(order => order.orderId === orderId);
        if (order && order.returnable) {
            order.status = 'Returned';
            alert(`Order ${orderId} has been returned.`);
            localStorage.setItem('orders', JSON.stringify(orders));  // Save the updated order list to localStorage
            renderOrders();  // Re-render the orders
        } else {
            alert("This order cannot be returned.");
        }
    }

    // Handle back button click
    function goBack() {
        window.history.back();  // Goes back to the previous page in browser history
    }

    // Render orders on page load
    renderOrders();
});
