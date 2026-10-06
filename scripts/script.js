// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestione Tema (Dark / Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.hasAttribute('data-theme');
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });

    // 2. Animazione di ingresso "Staggered" (a cascata) per la griglia Bento
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        // Aggiungiamo un leggero ritardo incrementale tra ogni box
        item.style.transition = `opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.08}s`;
        
        // Trigger reflow e avvio animazione
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
            // Ripuliamo la transizione dopo l'animazione iniziale per permettere l'hover
            setTimeout(() => {
                item.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
            }, 600 + (index * 80)); 
        }, 50);
    });
});
