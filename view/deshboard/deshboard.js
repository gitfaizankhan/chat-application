async function send(){
    const token = localStorage.getItem('token');
    try{
        const msg = document.getElementById('msg').value;
        await axios.post('http://localhost:3000/userChat/message', { msg: msg }, { headers: { 'Authorization': token } });
    }catch(error){
        console.log(error);
    }
}