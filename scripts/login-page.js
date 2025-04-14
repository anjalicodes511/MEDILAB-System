import { websiteInfoDetails } from "../data/info.js";

let loginClicked = document.querySelector('.login-button');
loginClicked.addEventListener('click', () => {
  let flag = 1;
  let password = document.querySelector('.js-password').value;
  let user_name = document.querySelector('.js-email').value;
  let role=document.querySelector('.input-as-selected').value;

  websiteInfoDetails.forEach((PersonID) => {
    if ((PersonID.email_id === user_name || PersonID.userName === user_name)&& PersonID.position=== role && PersonID.password === password) {
      flag = 0;
      // Save user info to local storage
      localStorage.setItem('userName', PersonID.userName);
      localStorage.setItem('userRole', PersonID.position); // Save the role
      // Redirect to role-specific dashboard
      switch (PersonID.position) {
        case 'admin':
          location.href = 'admin-dashboard.html';
          break;
        case 'doc':
          location.href = 'doctor-dashboard.html';
          break;
        case 'lab-staff':
          location.href = 'lab-staff-dashboard.html';
          break;
        case 'dis-staff':
          location.href = 'dis-staff-dashboard.html';
          break;
        default:
          location.href = 'dashboard.html';
      }
    }
  });

  if (flag !== 0)
    alert('WRONG INFO.');
});
