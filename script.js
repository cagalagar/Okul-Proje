const urlParams = new URLSearchParams(window.location.search);
let token = urlParams.get('token');

if (token) {
    sessionStorage.setItem('userToken', token);
} else {
    token = sessionStorage.getItem('userToken');
}

const validUsers = {
    'TOKEN123ABC': {
        name: 'Aslan',
        surname: 'Yılmaz',
        tc: '12345678901',
        department: 'Gelir İdaresi Başkanlığı',
        position: 'Kimlik ve Yetkilendirme',
        photo: 'img/vesika.webp'
    },
    'TOKEN456DEF': {
        name: 'Ayşe',
        surname: 'Kaya',
        tc: '98765432109',
        department: 'Bilişim Teknolojileri',
        position: 'Yazılım Geliştirici',
        photo: 'img/vesika2.jpg'
    },
    'TOKEN789GHI': {
        name: 'Mehmet',
        surname: 'Demir',
        tc: '55544433322',
        department: 'İnsan Kaynakları',
        position: 'İK Uzmanı',
        photo: 'img/vesika3.jpg'
    }
};

function checkAccess() {
    const accessDenied = document.getElementById('accessDenied');
    const mainContent = document.getElementById('mainContent');

    if (!token || !validUsers[token]) {
        if (accessDenied) {
            accessDenied.style.display = 'flex';
        }
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            let countdown = 3;
            const timer = setInterval(() => {
                countdown--;
                countdownEl.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(timer);
                    window.location.href = 'index.html';
                }
            }, 1000);
        }
    } else {
        if (accessDenied) {
            accessDenied.style.display = 'none';
        }
        if (mainContent) {
            mainContent.style.display = 'block';
        }
        
        if (typeof loadUserData === 'function') {
            loadUserData(validUsers[token]);
        }
    }
}

function displayMenu() {
    document.getElementById("main-nav").classList.toggle("active");
}

function logout() {
    sessionStorage.removeItem('userToken');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    checkAccess();
});