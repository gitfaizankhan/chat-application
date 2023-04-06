async function login(){
    try{
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginData = {
            email,
            password
        };
        const result = await axios.post('http://localhost:3000/user/login', loginData);
        localStorage.setItem('token', result.data.token);
        alert("SuccessFully Login");
        window.location.href = '../deshboard/deshboard.html';
    }catch(error){
        console.log(error);
    }
}