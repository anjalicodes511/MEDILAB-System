document.addEventListener('DOMContentLoaded', () => {
  let userName = localStorage.getItem('userName');
  document.getElementById('user-name').textContent = userName;
})
let position = localStorage.getItem('posfull');
document.querySelector('.title-dashboard').innerText = position;
function logout() {
  localStorage.clear();
  location.href = 'home-page.html';
}