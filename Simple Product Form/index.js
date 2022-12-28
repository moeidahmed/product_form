//Create data
function createData(event) {
  event.preventDefault();
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:4000/products";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  let productName = document.getElementById("pname").value;
  console.log(productName);
  let productPrice = document.querySelector("#price").value;
  console.log(productPrice);
  const data = `{
        "pro_name": "${productName}",
        "pro_price": "${productPrice}"
    }`;
  xhr.send(data);
  xhr.onload = () => location.assign("./create.html");
}

//Read data
function getData() {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:4000/products";
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      for (let a = 0; a < data.length; a++) {
        console.log(data[a].pro_name);
        console.log(data[a].pro_price);
        let block = document.getElementById("myBlock");
        block.innerHTML += `<div>
        <div class="dis">
        <div class="data">
        <p><b>Product Name:</b></p>&nbsp
        <p id="pname">${data[a].pro_name}</p>
        </div>
        <div class="data">
        <p><b>Product Price:</b></p> &nbsp
        <p id="price">${data[a].pro_price}</p>
        </div>
        <a onclick="UpdateData(${data[a].pro_id})" class ="edit">Edit</a>
        <button class="delete" onclick="deletedata(${data[a].pro_id})">Delete</button>
        </div>
        </div>`;
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

//Local Storage
function UpdateData(e) {
  localStorage.setItem("id", e);
  location.assign("/update.html");
}

//Update Data
const togetData = () => {
  const proID = localStorage.getItem("id");
  console.log(proID);
  let request = new XMLHttpRequest();
  let url = `http://localhost:4000/products/${proID}`;
  request.open("GET", url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let newArray = JSON.parse(this.responseText);
      //   console.log(newArray);
      document.getElementById("uname").value = newArray[0].pro_name;
      document.querySelector("#uprice").value = newArray[0].pro_price;
    }
  };
};
function updateData() {
  let productId = localStorage.getItem("id");
  let updateName = document.getElementById("uname").value;
  let updatePrice = document.querySelector("#uprice").value;
  let xhr = new XMLHttpRequest();
  let url = `http://localhost:4000/products/${productId}`;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  let data = `{
        "pro_name": "${updateName}",
        "pro_price": "${updatePrice}"
      }`;
  xhr.send(data);
  location.assign("/create.html");
}

//Delete data
function deletedata(p) {
  del = new XMLHttpRequest();
  url = `http://localhost:4000/products/${p}`;
  del.open("DELETE", url, true);
  del.send();
  del.onload = () => location.assign("./create.html");
}
