function AddTransaction(){
    var desc=document.getElementById('description').value;
    var amount=document.getElementById('amount').value;
    var date=document.getElementById('date').value;
    var ele = document.getElementsByName('flexRadioDefault');
              
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                var category=ele[i].value;
            }
            fetch('http://localhost:3000/transactions',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                   desc:desc,
                   amount:amount,
                   date:date,
                   category:category
                })
            }).then(res=>res.json())
            .then(data=>console.log(data));
}
var total_income=0;
var total_expense=0;

function getTransaction(){
    fetch('http://localhost:3000/transactions')
    .then(res=>res.json())
    .then(data=>{
        let transactions='';
                data.map(item=>{
                    if(item.category=='income'){
                        var sign="+";
                        total_income+=Number(item.amount);
                    }
                    else{
                        var sign="-";
                        total_expense+=Number(item.amount);
                    }
                    transactions+= `<li class="list-group-item mb-2"><h5>${sign} ${item.amount}<i onclick="deleteTransaction(${item.id})" style="float:right" class="fa fa-trash text-danger" aria-hidden="true"></i></h5>
                    <p class="ml">${item.desc}</p>
                    </li>`
                    document.getElementById('transactionList').innerHTML=transactions;
                    document.getElementById('income_value').innerHTML=total_income;
                    document.getElementById('expense_value').innerHTML=total_expense;
                    document.getElementById('balance').innerHTML=(total_income-total_expense);
                })
    });
}
getTransaction();

function deleteTransaction(id){
    fetch(`http://localhost:3000/transactions/${id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
}

console.log(total_expense+total_income);

