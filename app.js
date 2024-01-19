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
        div.innerHTML = `
        <img class="photo" src="${user.picture.large}">
        <div class="employee-info">
        <h2 class="name">${user.name.first} ${user.name.last}</h2>
        <p class="email">${user.email}</p>
        <p class="city">${user.location.city}</p>
 
        `
    })
}

function generateModal(data) {
    data.map(user => {
        const div = document.createElement('div');
        div.className = "employee-card"
        directory.appendChild(div);
        userBirthday = convertBirthday(user.dob.date);
        div.innerHTML = `
        <img class="photo" src="${user.picture.large}">
        <div class="employee-info">
        <h2 class="name">${user.name.first} ${user.name.last}</h2>
        <p class="email">${user.email}</p>
        <p class="city">${user.city}</p>
        <hr>
        <p class="phone-number">${user.cell}</p>
        <p class="street">${user.location.street.number} ${user.location.street.name}</p>
        <p class="address">${user.location.city}, ${user.location.state} ${user.location.postcode}</p>

        <p class="birthday">Birthday: ${userBirthday}</p>
        </div>
        `
    })
}

function convertBirthday(dob) {
    const birthdate = new Date(dob).toLocaleDateString("en-US");
    return birthdate;
    

}



getUsers(usersUrl)
    .then(generateModal)
    .catch(e => {
        directory.innerHTML = '<h3>Something went wrong!</h3>';
        console.error(e);
    })

