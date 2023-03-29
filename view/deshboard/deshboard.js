async function send(){
    const token = localStorage.getItem('token');
    try{
        const msg = document.getElementById('msg').value;
        await axios.post('http://localhost:3000/userChat/message', { msg: msg }, { headers: { 'Authorization': token } });
    }catch(error){
        console.log(error);
    }
}


showMessage();
async function showMessage(){
    try{
        const div = document.getElementById('userdata');
        const otherUser = document.getElementById('user_other');
        const token = localStorage.getItem('token');
        const message = await axios.get('http://localhost:3000/userChat/message', { headers: { 'Authorization': token } });
        const userId = message.data.userId;
        console.log(message)
        for(let msg in message.data.chats){
            console.log(message.data.chats[msg].msg)
            if (message.data.chats[msg].userId === userId){
                console.log(msg);
                const childDiv_1 = document.createElement('div');
                childDiv_1.className = "d-flex flex-row justify-content-end";
                const p = document.createElement('p');
                p.className = 'small p-2 me-3 mb-1 text-white rounded-3 bg-primary';
                p.innerText = message.data.chats[msg].msg;
                childDiv_1.appendChild(p);
                div.appendChild(childDiv_1);
            }else{
                const childDiv_2 = document.createElement('div');
                childDiv_2.className = "d-flex flex-row justify-content-start";
                const p = document.createElement('p');
                p.className = 'small p-2 ms-3 mb-1 rounded-3';
                p.style.backgroundColor = "#f5f6f7";
                p.innerText = message.data.chats[msg].msg;
                childDiv_2.appendChild(p);
                div.appendChild(childDiv_2);
            }
        }
    }catch(error){
        console.log(error);
    }
} 