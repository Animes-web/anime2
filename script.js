const animeList = [
    { id: 1, title: 'Naruto', ratings: [] },
    { id: 2, title: 'Attack on Titan', ratings: [] },
    { id: 3, title: 'Demon Slayer', ratings: [] }
];

let currentUser = null;

document.getElementById('auth-button').addEventListener('click', login);
document.getElementById('register-button').addEventListener('click', register);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulando um login (poderia ser uma API real)
    if (username && password) {
        currentUser = username;
        document.getElementById('auth-message').textContent = `Bem-vindo, ${username}!`;
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('anime-list').classList.remove('hidden');
        renderAnimeList();
    } else {
        document.getElementById('auth-message').textContent = 'Por favor, preencha todos os campos.';
    }
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem(username, password); // Simula o armazenamento de usuário
        document.getElementById('auth-message').textContent = 'Usuário registrado com sucesso! Agora, faça login.';
    } else {
        document.getElementById('auth-message').textContent = 'Por favor, preencha todos os campos.';
    }
}

function renderAnimeList() {
    const listContainer = document.getElementById('anime-list');
    listContainer.innerHTML = '';

    animeList.forEach(anime => {
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime');
        animeDiv.innerHTML = `
            <h2>${anime.title}</h2>
            <div class="rating" data-id="${anime.id}">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
            </div>
            <div class="average-rating">Avaliação Média: ${getAverageRating(anime.ratings)}</div>
        `;
        
        listContainer.appendChild(animeDiv);

        const stars = animeDiv.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const ratingValue = star.getAttribute('data-value');
                addRating(anime.id, Number(ratingValue));
                renderAnimeList(); // Re-render the list to show updated ratings
            });
        });
    });
}

function addRating(animeId, rating) {
    const anime = animeList.find(a => a.id === animeId);
    if (anime && currentUser) {
        anime.ratings.push(rating);
    } else {
        alert('Você precisa estar logado para avaliar.');
    }
}

function getAverageRating(ratings) {
    if (ratings.length === 0) return 'N/A';
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    return (total / ratings.length).toFixed(1);
}
