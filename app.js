// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '🌙' : '☀️';
    themeToggle.querySelector('.icon').textContent = icon;
}

// Navigation and Screen Management
const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Update Nav UI
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Switch Screens
        const screenId = item.getAttribute('data-screen');
        let targetScreen = document.getElementById(screenId);

        if (targetScreen) {
            screens.forEach(screen => screen.classList.remove('active'));
            targetScreen.classList.add('active');
        } else {
            renderPlaceholder(screenId);
        }
    });
});

function renderPlaceholder(id) {
    const main = document.getElementById('app-content');
    let screen = document.getElementById(id);

    if (!screen) {
        screen = document.createElement('section');
        screen.id = id;
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h1 style="font-size: 100px; margin-bottom: 20px;">🏗️</h1>
                <h2>${id.toUpperCase()} SCREEN</h2>
                <p style="color: var(--text-muted); margin-top: 10px;">Implementation in progress...</p>
                <button class="action-btn" style="margin-top: 30px; width: auto; padding: 12px 24px;" onclick="window.location.hash='#dashboard'; document.querySelector('[data-screen=dashboard]').click();">Back Home</button>
            </div>
        `;
        main.appendChild(screen);
    }
}

// Simple reveal animation for transaction items
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.transaction-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-out';
    observer.observe(item);
});
