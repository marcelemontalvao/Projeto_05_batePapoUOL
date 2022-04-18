let messages = []

function getMessages() {
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then(function (response) {
        messages = response.data;
        renderMessages()
    })
}

getMessages();

const ulMessages = document.querySelector(".messages");

function renderMessages() {
    for (let i = 0; i < messages.length; i++) {
        ulMessages.innerHTML += `
        <li class="${messages[i].type}">
            <span class="timestamp">(${messages[i].time})</span>
            <span class="user">${messages[i].from}</span> para <span class="user">${messages[i].to}</span>: ${messages[i].text}
        </li>
        `
    }
}