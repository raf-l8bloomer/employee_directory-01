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
    data.map(user => {
        const div = document.createElement('div');
        div.className = "employee-card"
        directory.appendChild(div);
        console.log(user.id);
        let userBirthday = convertBirthday(user.dob.date);
        div.innerHTML = `
        <img class="photo" src="${user.picture.large}">
        <div class="employee-info">
        <h2 class="name">${user.name.first} ${user.name.last}</h2>
        <p class="email">${user.email}</p>
        <p class="city">${user.location.city}</p>
        
        <div class="modal">
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
        </div>
        `;
        // const modal = document.createElement('div');
        // modal.className = "modal";
        // directory.appendChild(modal)

    })
}

// function generateModal(data) {
//     data.map(user => {
//         const div = document.createElement('div');
//         div.className = "modal"
//         directory.appendChild(div);
//         userBirthday = convertBirthday(user.dob.date);
//         div.innerHTML = `
//         <div class="modal-content">
//         <span class="close-btn">&times;</span>
//         <img class="photo" src="${user.picture.large}">
//         <div class="employee-info">
//         <h2 class="name">${user.name.first} ${user.name.last}</h2>
//         <p class="email">${user.email}</p>
//         <p class="city">${user.location.city}</p>
//         <hr>
//         <p class="phone-number">${user.cell}</p>
//         <p class="street">${user.location.street.number} ${user.location.street.name}</p>
//         <p class="address">${user.location.city}, ${user.location.state} ${user.location.postcode}</p>

//         <p class="birthday">Birthday: ${userBirthday}</p>
//         </div>
//         </div>
//         `
//     })
// }



function convertBirthday(dob) {
    const birthdate = new Date(dob).toLocaleDateString("en-US");
    return birthdate;
}

function clickableCards() {
    const employeeCards = document.querySelectorAll('.employee-card');
    console.log(employeeCards);
    const employeeCardsArray = [...employeeCards];
    console.log(employeeCardsArray);
    const employeeModal = document.querySelector('.modal')



    employeeCardsArray.forEach(card =>
        card.addEventListener('click', () => {
            employeeModal.style.display = 'block';
        }
        ))
    const exit = document.querySelectorAll('.close-btn');
    const exitArray = [...exit];
    console.log(exitArray)
    
    exitArray.forEach(exitBtn =>
        exitBtn.addEventListener('click', () => {
            console.log('exit btn should work')
            employeeModal.style.display = 'none';

        }))

}




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
 * Add Exit button
 * + click outside window to exit
 * 
 * 
 * Add hover state on employee cards
 * 
 * 
 * EXTRA CREDIT
 * 
 * Add a filter by name
 * Add pagination on modal window
 */