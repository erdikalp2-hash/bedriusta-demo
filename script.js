// ===== MENU DATA =====
const menuItems = {
    kebap: [
        {
            name: "Adana Kebabı",
            desc: "Bedri Usta'nın imzası. Özel baharatlarla yoğrulan kıyma, odun ateşinde ustalıkla pişirilir.",
            img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=700&auto=format&fit=crop"
        },
        {
            name: "Kuzu Şiş",
            desc: "Seçme kuzu etinden hazırlanan, köz ateşinde pişen enfes şiş kebabı.",
            img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=700&auto=format&fit=crop"
        },
        {
            name: "Patlıcanlı Kebap",
            desc: "Közlenmiş patlıcan ve özel kıyma harmanının muazzam uyumu.",
            img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=700&auto=format&fit=crop"
        }
    ],
    meze: [
        {
            name: "Bedri Usta Special",
            desc: "Şefin imza mezesi. Tarifi sır gibi saklanan, sadece burada tadabileceğiniz özel lezzet.",
            img: "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=700&auto=format&fit=crop"
        },
        {
            name: "Girit Ezmesi",
            desc: "Girit usulü hazırlanan, zeytinyağlı ve baharatlı enfes ezme.",
            img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?q=80&w=700&auto=format&fit=crop"
        },
        {
            name: "Vişneli Yaprak Sarma",
            desc: "Zeytinyağlı pirinç, fıstık ve vişne ile hazırlanan eşsiz yaprak sarma.",
            img: "https://images.unsplash.com/photo-1574626224-8c3c25f86dcc?q=80&w=700&auto=format&fit=crop"
        }
    ],
    balik: [
        {
            name: "Levrek Izgara",
            desc: "Günlük taze levrek, zeytinyağı ve otlar ile ızgarada hafifçe pişirilir.",
            img: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?q=80&w=700&auto=format&fit=crop"
        },
        {
            name: "Karides Güveç",
            desc: "Domates sosu ve sarımsakla pişen, közde kapanarak servis edilen karides güveç.",
            img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=700&auto=format&fit=crop"
        },
        {
            name: "Çıtır Kalamar",
            desc: "Taze kalamar, özel una bulanarak kızartılır; limon ve tarator ile servis edilir.",
            img: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?q=80&w=700&auto=format&fit=crop"
        }
    ]
};

let currentCategory = 'kebap';

function filterMenu(category) {
    currentCategory = category;

    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Render items
    renderMenu(category);
}

function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    const items = menuItems[category];

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(20px)';

    setTimeout(() => {
        grid.innerHTML = items.map(item => `
            <div class="menu-card">
                <img src="${item.img}" alt="${item.name}" class="menu-card-img" onerror="this.style.display='none'">
                <div class="menu-card-body">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                </div>
            </div>
        `).join('');

        grid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
    }, 200);
}

// ===== HEADER SCROLL =====
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
});

// ===== HERO BG PARALLAX =====
const heroBg = document.getElementById('hero-bg');
window.addEventListener('scroll', () => {
    if (heroBg) {
        heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
    }
});

setTimeout(() => {
    if (heroBg) heroBg.classList.add('loaded');
}, 100);

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== FORM SUBMIT =====
const resForm = document.getElementById('resForm');
if (resForm) {
    resForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = resForm.querySelector('.submit-btn');
        btn.textContent = 'Gönderiliyor...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = '✓ Rezervasyonunuz Alındı!';
            btn.style.background = '#27ae60';
            setTimeout(() => {
                btn.textContent = 'Rezervasyon Yap';
                btn.style.background = '';
                btn.disabled = false;
                resForm.reset();
            }, 3000);
        }, 1500);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('kebap');
});
