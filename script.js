// Sidebar Fucntionality
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const toggleIcon = document.querySelector('.toggleIcon');

let showSidebar = false;

toggleBtn.addEventListener('click', toggleSidebar)

function toggleSidebar () {
    if(!showSidebar){
        sidebar.classList.add('show-sidebar');
        toggleIcon.src = 'icon-close.svg'
        showSidebar = true;
    } else {
        sidebar.classList.remove('show-sidebar');
        toggleIcon.src = 'icon-hamburger.svg'
        showSidebar = false
    }
}

// API Functionality

const outputNew = document.querySelector('.output');
const inputURL = document.querySelector('.input-text');
const urlApi = 'https://api.shrtco.de/v2/shorten?url=';
const form = document.querySelector('.link-form');
const shortBtn = document.querySelector('.short-btn');

shortBtn.addEventListener('click', (e) => {
    // console.log('hello')
    e.preventDefault();

    async function createCard() {
        let data = await shorternURL();
        let card = document.createElement('div');
        card.classList.add('api-card');

        card.innerHTML = `
        <p class="og-link">${data.result.original_link}</p>
          <div class="mobile-line"></div>
          <p class="new-link">${data.result.full_short_link}</p>
          <button class="copy">Copy</button>`;

          outputNew.append(card);

          let btnCopy = document.querySelectorAll('.copy');
          btnCopy.forEach((button) => {
            let shortURL = button.previousElementSibling.textContent;
            button.addEventListener('click', () => {
                button.style.backgroundColor = 'var(--Dark-Violet)';
                button.innerText = 'Copied';
                // alert(`${shortURL} is now copied to clipboard`)
            });
          });
    };

    createCard();

    inputURL.value = "";
});


const errorMsg = document.querySelector('error-msg');

async function shorternURL() {
    let response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${inputURL.value}`
    );
    if (!response.ok) {
        errorMsg.classList.remove('error-hidden');
        alert('Link is invalid')
    }
    let data = await response.json();
    return data;
}