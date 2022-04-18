let messages = []
let userName = prompt("Qual o seu nome?")
let TIME5s = 5*1000;
let data = []

registerUser();

function getMessages() {
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then(function (response) {
        messages = response.data;
        renderMessages()
        newMessages()
    })
}

function renderMessages() {
    const ulMessages = document.querySelector(".messages");
    ulMessages.innerHTML = "";
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type == "private_message") {
            if (userName == messages[i].from || userName == messages[i].to) {
                ulMessages.innerHTML += `
                <li class="${messages[i].type}">
                <span class="timestamp">(${messages[i].time})</span>
                <span class="user">${messages[i].from}</span> para <span class="user">${messages[i].to}</span>: ${messages[i].text}
                </li>
                `
            }
        } else {
            ulMessages.innerHTML += `
                <li class="${messages[i].type}">
                <span class="timestamp">(${messages[i].time})</span>
                <span class="user">${messages[i].from}</span> para <span class="user">${messages[i].to}</span>: ${messages[i].text}
                </li>
                `
        }
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
        {status: 200}
       getMessages()
       setInterval(keepOn, TIME5s)
    }).catch(function(value) {
        {status: 400}
        prompt("Digite outro nome. Este já está em uso.")
    })
}

function keepOn () {
let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: userName})
promise.then(function(response){
    console.log("Continua presente")
}).catch(function(value){
      console.log("Saiu da sala")
})
}

function sendMessages () {
    const message = document.querySelector(".footer > input").value
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
        from: userName,
        to: "Todos",
        text: message,
        type: "message"
    })

    promise.then(function(response){
    getMessages()
    }).catch(function(value){
    window.location.reload()
    })
}
