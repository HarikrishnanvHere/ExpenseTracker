let expenseForm = document.getElementById("expenseForm");
let expenseList = document.getElementById("expenseEntries");




function removeExpenseEntry(id){
    let url = `http://localhost:3000/expense/deleteexpense/${id}`;
    axios.get(url)
    .then((res)=>console.log("entry successfully removed"))
    .catch(err=>console.log(err));
}


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
        removeExpenseEntry(expense.id);
        expenseList.removeChild(listElement);
    });
}



function extractElements(data){
    console.log(data);
    for(let i=0;i<data.length;i++){
        displayElement(data[i]);
    }
}


axios.get("http://localhost:3000/expense/getexpense")
.then((res)=>{
    extractElements(res.data);
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
    axios.post("http://localhost:3000/expense/addexpense",obj)
    .then((res)=>displayElement(res.data))
    .catch(err=>console.log(err));

}

expenseForm.addEventListener("submit",addExpense);