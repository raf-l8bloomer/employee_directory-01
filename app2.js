
const usersUrl = 'https://randomuser.me/api/?nat=us&results=12'
const directory = document.querySelector('.directory')
const input = document.querySelector('#search');
let peopleJSON;

input.addEventListener('keyup', e=> {
    let currentValue = e.target.value.toLowerCase();
    console.log(currentValue)
    let names = document.querySelectorAll('h2.name');
    names.forEach(name => {
        if (name.textContent.toLowerCase().includes(currentValue)){
            name.parentNode.parentNode.style.display = 'flex'
        } else (
            name.parentNode.parentNode.style.display = 'none'
        )
    })
    console.log(names);
})


async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();

    } catch {
        throw error
    }
}

async function getUsers(url) {
    peopleJSON = await getJSON(url);
    peopleJSON = peopleJSON.results;
    console.log(peopleJSON);
    return peopleJSON;
}


function generateHTML(data) {
    data.map(user => {
        const index = data.indexOf(user)
        const employeeCard = document.createElement('div');
        employeeCard.className = "employee-card";
        employeeCard.dataset.index = index;
        directory.appendChild(employeeCard);
        employeeCard.innerHTML = `
        <img class="photo" src="${user.picture.large}">
        <div class="employee-info">
        <h2 class="name">${user.name.first} ${user.name.last}</h2>
        <p class="email">${user.email}</p>
        <p class="city">${user.location.city}</p>
        </div>
        `
    })
}


function generateModal(data, index) {
    const user = data[index];
    console.log(user);
    const modal = document.createElement('div');
    modal.className = "modal";
    modal.setAttribute("id", index);
    directory.appendChild(modal)
    userBirthday = convertBirthday(user.dob.date);
    modal.innerHTML = `
        <div class="modal-content">
        <span class="close-btn">&times;</span>
        <img class="photo" src="${user.picture.large}">
        <div class="employee-info">
        <h2 class="name">${user.name.first} ${user.name.last}</h2>
        <p class="email">${user.email}</p>
        <p class="city">${user.location.city}</p>
        <hr>
        <p class="phone-number">${user.cell}</p>
        <p class="street">${user.location.street.number} ${user.location.street.name}</p>
        <p class="address">${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
        <p class="birthday">Birthday: ${userBirthday}</p>
        <div class='pagination'></div>
        </div>
        `;
    closeBtn();
    modalPagination();
}

// converts birthday format to ##/##/##
function convertBirthday(dob) {
    const birthdate = new Date(dob).toLocaleDateString("en-US");
    return birthdate;
}

function clickableCards() {
    const employeeCards = document.querySelectorAll('.employee-card');
    const employeeCardsArray = [...employeeCards];

    employeeCardsArray.forEach(card => {
        card.addEventListener('click', (e) => {
            const card = e.target.closest('.employee-card');
            if (card) {
                const targetIndex = card.getAttribute('data-index');
                generateModal(peopleJSON, targetIndex);
            }
        })
    })
}

function removeModal() {
    const modal = document.querySelector('.modal');
    modal.remove();
}

function closeBtn() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', (e) => {
        removeModal();
    })
}

window.addEventListener('click', (e) => {
    if (e.target.matches('.modal')) {
        removeModal();
    }
})

function modalPagination() {
    const modal = document.querySelector('.modal');
    let currentIndex = parseInt(modal.getAttribute('id'));
    const pagination = document.querySelector('.pagination');

    if (currentIndex > 0) {
        pagination.insertAdjacentHTML(
            'beforeend',
            "<button class='button' id='left'>Previous Employee</button>"
        )
        const left = document.querySelector('#left');
        left.addEventListener('click', () => {
            removeModal();
            currentIndex -= 1;
            console.log(currentIndex);
            generateModal(peopleJSON, currentIndex);
        })

    }
    if (currentIndex < 11) {
        pagination.insertAdjacentHTML(
            'beforeend',
            "<button class='button' id='right'>Next Employee</button>"
        )

        const right = document.querySelector('#right');
        right.addEventListener('click', () => {
            removeModal();
            currentIndex += 1;
            console.log(currentIndex);
            generateModal(peopleJSON, currentIndex);
        })
    }
}


getUsers(usersUrl)
    .then(generateHTML)
    .then(clickableCards);
