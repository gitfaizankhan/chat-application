async function send(){
    const token = localStorage.getItem('token');
    try{
        const msg = document.getElementById('msg');
        const newChat = await axios.post('http://localhost:3000/userChat/message', { msg: msg.value }, { headers: { 'Authorization': token } });
        msg.value = '';
    }catch(error){
        console.log(error);
    }
}


function addMessages(message) {
    console.log("hello");
}

// setInterval(() =>{
    // getMessage();
// }, 1000);


// async function getMessage(){
//     try{
//         const otherUser = document.getElementById('user_other');
//         const token = localStorage.getItem('token');
//         const message = await axios.get('http://localhost:3000/userChat/message', { headers: { 'Authorization': token, 'UserId': [1, 2] } });
//         showMessage(message);
//     }catch(error){
//         console.log(error);
//     }
// } 

function showMessage(message){
    console.log(message);
    const scbar = document.getElementById('scbar');
    const div = document.getElementById('userdata');
    div.innerHTML = "";
    const userId = message.data.userId;
    for (let msg in message.data.chats) {
        if (message.data.chats[msg].userId === userId) {
            const childDiv_1 = document.createElement('div');
            childDiv_1.className = "d-flex flex-row justify-content-end";
            const p = document.createElement('p');
            p.className = 'small p-2 me-3 mb-1 text-white rounded-3 bg-primary';
            p.innerText = message.data.chats[msg].msg;
            childDiv_1.appendChild(p);
            div.appendChild(childDiv_1);
        } else {
            const childDiv_2 = document.createElement('div');
            childDiv_2.className = "d-flex flex-row justify-content-start";
            const p = document.createElement('p');
            p.className = 'small p-2 ms-3 mb-1 rounded-3';
            p.style.backgroundColor = "#f5f6f7";
            p.innerText = message.data.chats[msg].msg;
            childDiv_2.appendChild(p);
            div.appendChild(childDiv_2);
        }
        scbar.scrollTop = scbar.scrollHeight - scbar.offsetHeight;
    }
}


showUsers()
async function showUsers(){
    const member = await axios.get('http://localhost:3000/group/chatUsers');
    for(let m of member.data){
        displayMember(m);
    }
}

function displayMember(member){
    const ul = document.getElementById('users');
    const li = document.createElement('li');
    const a = document.createElement('a');
    const divMain = document.createElement('div');
    const childDiv = document.createElement('div');
    const userName = document.createElement('p');
    const userId  = document.createElement('p');


    li.className = 'p-2 mb-2 border-bottom';
    li.style.backgroundColor = '#f0f8ff';
    li.style.borderRadius = '10px';


    a.className = 'd-flex justify-content-between';
    a.style.textDecoration = 'none';
    a.href = '#';

    divMain.className = 'row d-flex flex-row';
    divMain.style.margin = 'auto';

    childDiv.className = 'col-12 pt-1';

    userName.className = 'fw-bold mb-0';
    userName.id = 'username';
    userName.innerText = member.name;

    userId.className = 'col-12 pt-1';
    userId.id = 'userid';
    userId.style.display = 'none';
    console.log("member id ", member.id);
    userId.innerText = member.id;


    // a.addEventListener('click', async (e)=>{
    //     console.log(e);
    //     const username = document.getElementById('username').innerText;
    //     const userid = document.getElementById('userid').innerText;
    //     console.log("hrllo", username);
    //     const token = localStorage.getItem('token');
    //     const message = await axios.get('http://localhost:3000/userChat/message', { headers: { 'Authorization': token, 'UserId': userid } });
    //     showMessage(message);
    // })
    // a.addEventListener('click', async (event) => {
        // get the clicked a element
        // const clickedA = event.target;
        // console.log("hello", clickedA);
        // find the username and userid elements within the clicked a element
        // const usernameElem = clickedA.querySelector('#username');
        // const useridElem = clickedA.querySelector('#userid');
        // console.log("hello", clickedA.querySelector('#userid'));
        // get the text content of the username and userid elements
        // const username = usernameElem.innerText;
        // const userid = useridElem.innerText;

        // your axios code here
    // });


    a.addEventListener('click', async (e) => {
        e.preventDefault(); // prevent default link behavior
        const username = e.currentTarget.querySelector('.fw-bold.mb-0').innerText;
        const userid = e.currentTarget.querySelector('#userid').innerText;
        const token = localStorage.getItem('token');
        const message = await axios.get('http://localhost:3000/userChat/message', { headers: { 'Authorization': token, 'UserId': userid } });
        showMessage(message, username);
    });

    

    childDiv.appendChild(userName);
    childDiv.appendChild(userId);
    divMain.appendChild(childDiv);
    a.appendChild(divMain);
    li.appendChild(a);
    ul.appendChild(li);
}