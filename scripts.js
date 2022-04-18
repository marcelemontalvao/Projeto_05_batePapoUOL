let messages = []
let userName = prompt("Qual o seu nome?")

registerUser()

function getMessages() {
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then(function (response) {
        messages = response.data;
        renderMessages()
        newMessages()
    })
}

getMessages();

function renderMessages() {
    const ulMessages = document.querySelector(".messages");
    for (let i = 0; i < messages.length; i++) {
        ulMessages.innerHTML += `
        <li class="${messages[i].type}">
            <span class="timestamp">(${messages[i].time})</span>
            <span class="user">${messages[i].from}</span> para <span class="user">${messages[i].to}</span>: ${messages[i].text}
        </li>
        `
    }
}

function updateServer() {
    setInterval(getMessages, 3000)
}

updateServer();

function newMessages () {
    const newMessages = document.querySelector(".messages li:last-child")
    newMessages.scrollIntoView();
}

function registerUser () {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: userName})
    promise.then(function(value) {
       return {status: 200}
       getMessages()
    }).catch(function(value) {
        return {status: 400}
        prompt("Nome já existente. Digite outro nome.")
    })
}
