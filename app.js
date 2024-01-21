const usersUrl = 'https://randomuser.me/api/?nat=us&results=12'
const directory = document.querySelector('.directory')

console.log(usersUrl)


async function getJSON(url) {
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

async function getUsers(url) {
    const peopleJSON = await getJSON(url);
    console.log(peopleJSON.results)
    return peopleJSON.results;
}


function generateHTML(data) {
    console.log(data);
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
        // generateModal(user, index);
    })
}

// GENERATE MODAL
// takes the clicked users info and creates a modal 

function generateModal(index) {

    const modal = document.createElement('div');
    modal.className = "modal";
    modal.dataset.index = index;
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
    closeButton();
    // modal.toggle('.show-modal')
}

function toggleModal(modal) {
    modal.classList.toggle("show-modal");
}


function clickableCards() {
    const employeeCards = document.querySelectorAll('.employee-card')
    const employeeCardsArray = [...employeeCards];

    employeeCardsArray.forEach(card => {
        card.addEventListener('click', (e) => {
            const cardIndex = e.target.getAttribute('data-index');
            generateModal(cardIndex);
            console.log(cardIndex)
            const datasetModal = document.querySelectorAll('[data-index]')
            const datasetModalArray = [...datasetModal];
            datasetModalArray.forEach(modal => {
                console.log(modal);
                if (modal.dataset.index == cardIndex) {
                    console.log('modal should come on')
                    toggleModal(modal);
                }
            })
        })
    })
}
/* what if on click, you make another API request
and instead generate Modal with that data using dataset.index
if statement to make sure it matches the target
*/

function closeButton() {
    const closeButton = document.querySelector(".close-btn");
    const shownModal = document.querySelector('.show-modal')
    closeButton.addEventListener('click', () => {
        console.log('close should work')
        toggleModal(shownModal);
    })
}







// converts birthday format to ##/##/##
function convertBirthday(dob) {
    const birthdate = new Date(dob).toLocaleDateString("en-US");
    return birthdate;
}


// Takes created cards and makes them clickable to reveal modal with more information




// function clickableCards() {
//     const employeeCards = document.querySelectorAll('.employee-card');
//     console.log(employeeCards);
//     const employeeCardsArray = [...employeeCards];
//     console.log(employeeCardsArray);



//     employeeCardsArray.forEach(card =>
//         card.addEventListener('click', (e) => {
//             console.log(e.target)
//             const employeeModal = e.target.querySelector('.modal')
//             employeeModal.style.display = 'block';
//         }
//         ))
//     const exit = document.querySelectorAll('.close-btn');
//     const exitArray = [...exit];
//     console.log(exitArray)

//     exitArray.forEach(exitBtn =>
//         exitBtn.addEventListener('click', () => {
//             console.log('exit btn should work')
//             console.log(exitBtn);
//             employeeModal.style.display = 'none';

//         }))

// }

// closes modal if clicked outside of
// window.addEventListener('click', (e) => {
//     if (e.target.classList.contains('modal')) {
//         const employeeModal = document.querySelector('.modal')
//         employeeModal.style.display = 'none';
//     }
// })


// window.addEventListener('click', (e) => {
//     if (!e.target.matches('modal')) {
//         toggleModal();
//     }
// })
// function windowOnClick(e) {
//     if (e.target === modal) {
//         toggleModal();
//     }
// }



getUsers(usersUrl)
    .then(generateHTML)
    .then(clickableCards)
    .catch(e => {
        directory.innerHTML = '<h3>Something went wrong!</h3>';
        console.error(e);
    })

/*** TO DO
 * 
 * Create Modal pop up function
 * 
 * 
 * EXTRA CREDIT
 * 
 * Add a filter by name
 * Add pagination on modal window
 */