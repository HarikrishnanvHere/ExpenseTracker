let signUp = document.getElementById("signupForm");



function signUpUser(e){
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let obj = {
        name,email,password
    }
    console.log(obj);
    axios.post("http://localhost:3000/user/signup",obj)
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>console.log(err));
}

signUp.addEventListener("submit",signUpUser)
