// Toggle sidebar function
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('active');
    
    // Push main content to the right when sidebar is active
    if (sidebar.classList.contains('active')) {
        mainContent.style.marginLeft = '250px';
    } else {
        mainContent.style.marginLeft = '0';
    }
}

// Toggle dark mode function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Load dispensary staff name from localStorage
document.addEventListener('DOMContentLoaded', () => {
    let userName = localStorage.getItem('userName') || 'Dispensary Staff';
    document.getElementById('user-name').textContent = userName;

    // Add sample tasks
    const tasks = [
        { time: '09:00 AM', details: 'Restock medication shelves' },
        { time: '11:00 AM', details: 'Process and fulfill new orders' },
        { time: '01:00 PM', details: 'Update inventory records' },
        { time: '03:00 PM', details: 'Verify supplier deliveries' },
        { time: '04:30 PM', details: 'Report any discrepancies or issues' }
    ];

    // Populate tasks
    const tasksList = document.getElementById('tasks-list');
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <div class="time">${task.time}</div>
            <div class="details">${task.details}</div>
        `;
        tasksList.appendChild(taskDiv);
    });
});

// Logout function
function logout() {
    localStorage.clear();
    location.href = 'login.html';
}
