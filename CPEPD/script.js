// ================= LOGOUT FUNCTION =================
function logout() {
    // 1. Clear sessionStorage (if used for session info)
    sessionStorage.clear();

    // 2. Clear localStorage (optional, if needed)
    localStorage.clear();

    // 3. Redirect to logout page to show "Logging out..."
    // This page can then redirect to login after a short delay
    window.location.href = 'logout.html';
}

// ================= SIDEBAR NAV ITEMS =================
const sidebarItems = document.querySelectorAll('#sidebar .nav-item');
const currentPage = window.location.pathname.split("/").pop(); // current page filename

sidebarItems.forEach(item => {
    const page = item.getAttribute('onclick')?.match(/'(.+?)'/)?.[1];

    // Highlight active page
    if (page === currentPage) item.classList.add('active');
    else item.classList.remove('active');

    // Handle click
    item.addEventListener('click', e => {
        e.preventDefault();

        // Remove active from all, add to clicked
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // If logout is clicked
        if (page === 'logout' || item.onclick?.toString().includes('logout')) {
            logout(); // Call our logout function
            return;
        }

        // Navigate to other page
        if (page && page !== currentPage) {
            window.location.href = page;
        }
    });
});