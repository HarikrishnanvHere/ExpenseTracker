let expenseForm = document.getElementById("expenseForm");
let expenseList = document.getElementById("expenseEntries");
let leaderboardList = document.getElementById("leaderboardEntries")

document.getElementById("leaderboard").style.display = "none";




function displayElement(expense){

    let listElement = document.createElement("li");
    expenseList.appendChild(listElement);

    let text = `${expense.amount} - ${expense.description} - ${expense.category}`;
    let expenseEntry = document.createElement("span");
    expenseEntry.textContent = text;
    listElement.appendChild(expenseEntry);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    listElement.appendChild(deleteButton);

    deleteButton.addEventListener("click",()=>{
        let url = `http://localhost:3000/expense/deleteexpense/${expense.id}`;
        axios.get(url,{headers:{"authorization": token}})
        .then((res)=>expenseList.removeChild(listElement))
        .catch(err=>console.log(err));
        
    });
}


function displayPremiumButton(premium){
    if(premium){
        document.getElementById('premium').style.display=('none');
        document.getElementById("premiumDisplay").textContent = "You are a premium user"
        document.getElementById("leaderboard").style.display = "block";
    }
}


function extractElements(data){
    console.log(data);
    for(let i=0;i<data.length;i++){
        displayElement(data[i]);
    }
}

let token = localStorage.getItem('token');
console.log(token);
axios.get("http://localhost:3000/expense/getexpense",{headers: {"authorization": token}})
.then((res)=>{
    console.log(res);
    extractElements(res.data.data);
    displayPremiumButton(res.data.premium);
})
.catch(err=>console.log(err));


function addExpense(e){
    e.preventDefault();
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;

    let obj = {
        amount,description,category
    }
    axios.post("http://localhost:3000/expense/addexpense",obj,{headers: {"authorization": token}})
    //.then(res=>console.log(res))
    .then((res)=>displayElement(res.data.data))
    .catch(err=>console.log(err));

}

expenseForm.addEventListener("submit",addExpense);

// >>>>>>> PREMIUM FEATURE 
//------------------------



document.getElementById('premium').onclick = async function (event) {

    
        //const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/purchase/purchasepremium", { headers: { "authorization": token } })
        console.log(response);
        const options = {
            "key": response.data.key_id_,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                    //console.log(response);
                    await axios.post("http://localhost:3000/purchase/updatetransactionstatus", {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    }, { headers: { "authorization": token } })
                    .then((res)=>{
                        displayPremiumButton(true);
                        alert("You are a Premuim user now!");
                    })
                    .catch(err=>console.log(err));
                    
                    
                 
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        event.preventDefault();
    
        rzp1.on('payment.failed', async function (response) {
            await axios.post("http://localhost:3000/purchase/updatetransactionstatus", {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id // if transaction is failed no payment key is generated
                }, { headers: { "authorization": token } })
                .then((res)=>{
                    alert('Transaction FAILED!');
                })
                
                
           
        });
}



function displayLeaderBoard(info){
    console.log(info);

    let childNodes = leaderboardList.childNodes;
    console.log(childNodes);
    
    if(childNodes.length===1){

        for(let i=0;i<info.length;i++){
            //console.log(key);
            let listElement = document.createElement("li");
            leaderboardList.appendChild(listElement);
    
            let text = `Name: ${info[i].name} --- Total Expense : ${info[i].total}`;
            let leaderboardEntry = document.createElement("span");
            leaderboardEntry.textContent = text;
            listElement.appendChild(leaderboardEntry);
        }

    }

    else{
        document.getElementById("leaderboard").textContent = "Leaderboard Already Present!"
    }
    
}







document.getElementById("leaderboard").onclick = async function(){
    axios.get("http://localhost:3000/premium/showleaderboard")
// .then(data=>console.log(data.data))
.then(res=>displayLeaderBoard(res.data.data))
.catch(err=>console.log(err));

    
}