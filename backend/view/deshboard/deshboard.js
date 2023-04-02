function showMessage(message, userchat, userid, category) {
    document.getElementById('userchat').innerText = `${userchat}`;
    document.getElementById('userchatID').innerText = `${userid}`;
    document.getElementById('userchatType').innerText = `${category}`;
    const scbar = document.getElementById('scbar');
    const div = document.getElementById('userdata');
    div.innerHTML = "";
    const userId = message.data.userId;
    const token = localStorage.getItem('token');
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
    console.log("hello Added")
    const token = localStorage.getItem('token');
    const member = await axios.get('http://localhost:3000/group/chatUsers', { headers: { 'Authorization': token } });
    document.getElementById('users').innerHTML = '';
    for(let m of member.data){
        displayMember(m);
    }
}

function displayMember(member){
    // document.getElementById('users').innerHTML = '';
    const ul = document.getElementById('users');
    const li = document.createElement('li');
    const a = document.createElement('a');
    const divMain = document.createElement('div');
    const childDiv = document.createElement('div');
    const userName = document.createElement('p');
    const userId  = document.createElement('p');
    const category = document.createElement('p');

    li.className = 'p-2 mb-2 border-bottom';
    li.style.backgroundColor = '#f0f8ff';
    li.style.borderRadius = '10px';


    a.className = 'd-flex justify-content-between';
    a.id = "getUsersChat"
    a.style.textDecoration = 'none';
    a.href = '#';

    divMain.className = 'row d-flex flex-row';
    divMain.style.margin = 'auto';

    childDiv.className = 'col-12 pt-1';

    userName.className = 'fw-bold mb-0 text-right';
    userName.id = 'username';

    category.className = 'fw-bold mb-0';
    category.id = 'category';
    category.style.display = 'none';
    category.innerText = member.category;

    userId.className = 'col-12 pt-1';
    userId.id = 'userid';
    userId.style.display = 'none';
    userId.innerText = member.id;

    childDiv.appendChild(userName);
    childDiv.appendChild(category);
    childDiv.appendChild(userId);
    divMain.appendChild(childDiv);
    a.appendChild(divMain);
    li.appendChild(a);

    if (member.category === 'me') {
        const chatdeshboardowner = document.getElementById('chatdeshboardowner');
        chatdeshboardowner.innerText = `${member.name}`;
        
    }
    if (member.category === 'user'){
        userName.innerText = `User : ${member.name}`;
        ul.appendChild(li);
    } if (member.category === 'group'){

        userName.innerText = `Group : ${member.name}`;
        ul.appendChild(li);
    }

    a.addEventListener('click', async (e) => {
        e.preventDefault();
        const username = e.currentTarget.querySelector('.fw-bold.mb-0').innerText;
        const userid = e.currentTarget.querySelector('#userid').innerText;
        const category = e.currentTarget.querySelector('#category').innerText;
        const token = localStorage.getItem('token');
        const message = await axios.get('http://localhost:3000/userChat/message', { headers: { 'Authorization': token, 'userid': userid, 'category': category } });
        console.log("message ", message)
        showMessage(message, username, userid, category);
        setInterval(async ()=>{
            liveChatMsg();
        }, 1000);
    });
}


async function liveChatMsg(){
    const username = document.getElementById('userchat').innerText;
    const userid = document.getElementById('userchatID').innerText;
    const category = document.getElementById('userchatType').innerText;
    const token = localStorage.getItem('token');
    const message = await axios.get('http://localhost:3000/userChat/message', { headers: { 'Authorization': token, 'userid': userid, 'category': category } });
    showMessage(message, username, userid, category);
}

const creategroupButton = document.getElementById("creategroup");
creategroupButton.addEventListener("click", async ()=>{
    const token = localStorage.getItem('token');
    const alluser = await axios.get('http://localhost:3000/user/alluser', { headers: { 'Authorization': token} });
    const checkboxes = {};
    const tbody = document.getElementById("userselect");
    for(let user of alluser.data){

        const tr = document.createElement('tr');
        const name = document.createElement('td');
        const check_td = document.createElement('td');
        const check_div = document.createElement('div');
        const input = document.createElement("input");

        check_div.className = 'form-check';
        name.innerText = user.name;
        input.className = 'form-check-input';
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "checkButton" + user.id);
        input.setAttribute("value", user.id);


        check_div.appendChild(input);
        check_td.appendChild(check_div);
        tr.appendChild(name);
        tr.appendChild(check_td);
        tbody.appendChild(tr);
        checkboxes[user.id] = input;
    }
    const submitgroupdata = document.getElementById("submitgroupdata");
    submitgroupdata.addEventListener('click', async (e) => {
        e.preventDefault();
        const group_name = document.getElementById('groupnameId').value;
        const userId = [];
        for(let i in checkboxes){
            
            if (checkboxes[i].checked){
                userId.push(checkboxes[i].value);
            }
        }
        groupInfo = {
            name: group_name,
            userId: userId
        }
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/group/addgroup', groupInfo, { headers: { 'Authorization': token } });
        const showUser = setInterval(showUsers(), 1000);
        clearInterval(showUser);
        // window.location.href = './deshboard.html';
    })

});

const messages = document.getElementById('sendmessages');
messages.addEventListener('click', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
        const msg = document.getElementById('msg');
        const userchatType = document.getElementById('userchatType').innerText;
        const userid = document.getElementById('userchatID').innerText;

        if (userchatType === 'user') {
            const newChat = await axios.post('http://localhost:3000/userChat/message', { msg: msg.value, user2: userid }, { headers: { 'Authorization': token } });
            msg.value = '';

        }
        if (userchatType === 'group') {
            const newChat = await axios.post('http://localhost:3000/userChat/message', { msg: msg.value, groupId: userid }, { headers: { 'Authorization': token } });
            msg.value = '';
        }

    } catch (error) {
        console.log(error);
    }
})
