let logIn = document.getElementById("logInForm");
let messageElement = document.getElementById("message");
messageElement.style.display = "none";

function fetchLogInCredentials(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let obj = {
        email,password
    }
    axios.post("http://localhost:3000/user/login",obj)
    .then((res)=>{
        messageElement.style.display = "block";
        messageElement.textContent = res.data;
        if(messageElement.textContent === "LogIn Successful"){
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            alert ("login successful!!");
            window.location.href = "expenseForm.html";
        }
    })
    .catch(err=>console.log(err))
}


logIn.addEventListener("submit",fetchLogInCredentials)