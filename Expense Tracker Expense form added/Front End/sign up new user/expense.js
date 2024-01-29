let signUp = document.getElementById("signupForm");
let errorElement = document.getElementById("error");
errorElement.style.display = "none"


function checkForError(res){
    if (res.data.name === "SequelizeUniqueConstraintError"){
        errorElement.style.display = "block"
    }
    else{
        errorElement.style.display = "none"
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        alert ("New User Created!");
        console.log(res);
    }

}






function signUpUser(e){
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let obj = {
        name,email,password
    }
    axios.post("http://localhost:3000/user/signup",obj)
    .then((res)=>{
        checkForError(res);
    })
    .catch(err=>console.log(err));
}

signUp.addEventListener("submit",signUpUser)
