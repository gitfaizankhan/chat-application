async function signup(){
    console.log("hello")
    try{
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('phone_no').value;
        const password = document.getElementById('password').value;
        const data = {
            name,
            email,
            mobile,
            password
        }
        await axios.post('http://localhost:3000/user/signup', data);
        alert("User Registered Successfully");
        window.location.href = '';
    }catch(error){
        console.log(error);
    }
}