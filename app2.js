/* make cards clickable
upon click, generate modal

in generating the modal, you look up the user with their data-index
and pull the rest of their information
but where does the rest of the info come from?

*/

const usersUrl = 'https://randomuser.me/api/?nat=us&results=12'
const directory = document.querySelector('.directory')

let peopleJSON;


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
        </div>
        `;
    closeBtn();
}

// converts birthday format to ##/##/##
function convertBirthday(dob) {
    const birthdate = new Date(dob).toLocaleDateString("en-US");
    return birthdate;
}

// function toggleModal() {
//     modal.classList.toggle("show-modal");
// }

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
            // const targetIndex = e.target.getAttribute('data-index');
            // console.log(targetIndex);
            // generateModal(peopleJSON, targetIndex);
            // toggleModal();
        })
    })


}

// function removeModal(index){

// }

function closeBtn () {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        modal.remove();
    })
}


getUsers(usersUrl)
    .then(generateHTML)
    .then(clickableCards);
