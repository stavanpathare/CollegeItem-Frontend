import { getToken, removeToken, parseJwt, showToast } from "./utils.js";

export function initAuth() {
  const token = getToken();
  const navAuth = document.querySelector("#nav-auth");
  const navToggle = document.querySelector("#navToggle");
  const mainNav = document.querySelector("#mainNav");

  if (navAuth) {
    if (token) {
      navAuth.innerHTML = `
        <a href="profile.html">Profile</a>
        <button id="logoutBtn" class="btn btn-ghost">Logout</button>
      `;
      const logoutBtn = document.querySelector("#logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          removeToken();
          showToast("Logged out successfully", "success");
          window.location.href = "login.html";
        });
      }
    } else {
      navAuth.innerHTML = `
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
      `;
    }
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
      navAuth.classList.toggle("nav-open");
    });
  }
}

export function requireAuth() {
  if (!getToken()) {
    showToast("Please login to access this page", "warning");
    window.location.href = "login.html";
  }
}

export function getCurrentUser() {
  const token = getToken();
  return token ? parseJwt(token) : null;
}

window.addEventListener("DOMContentLoaded", () => {
  initAuth();
});
