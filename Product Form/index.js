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
        console.log(data[a].pro_img);
        let block = document.getElementById("myBlock");
        block.innerHTML += `<div>
        <div class="dis">
        <div style="display: flex;">
        <div class="imageData" ><img src="../shopping-cart-main/uploads/${data[a].pro_img}" alt="product_image" width="200px" height="150px"/></div>
        <p></p>
        <div>
        <div class="data">
        <p><b>Product Name:</b></p>&nbsp
        <p id="pname">${data[a].pro_name}</p>
        </div>
        <div class="data">
        <p><b>Product Price:</b></p> &nbsp
        <p id="price">${data[a].pro_price}</p>
        </div>
        <a href= "update.html" onclick="toUpdatedata(${data[a].pro_id})" class ="edit">Edit</a>
        <button class="delete" onclick="deletedata(${data[a].pro_id})">Delete</button>
        </div>
        </div>
        </div>
        </div>`;
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

//Delete data
function deletedata(productId) {
  del = new XMLHttpRequest();
  url = `http://localhost:4000/products/${productId}`;
  del.open("DELETE", url, true);
  del.send();
  del.onload = () => location.assign("./create.html");
}

//Create data
const form = document.getElementById("form");
form.addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData);
  fetch("http://localhost:4000/products", {
    method: "POST",
    body: formData,
  })
    .then((res) => console.log(res))
    .catch((err) => ("Error occured", err));
}

function toUpdatedata(i) {
  localStorage.setItem("id", i);
  location.assign("/update.html");
}

function updataData() {
  const prID = localStorage.getItem("id");
  console.log(prID);
  let request = new XMLHttpRequest();
  let url = `http://localhost:4000/products/${prID}`;
  request.open("GET", url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      document.getElementById("uname").value = data[0].pro_name;
      document.querySelector("#uprice").value = data[0].pro_price;
      document.getElementById("imgData").innerText = data[0].pro_img;
    }
  };
}

function updatedResult() {
  const formData = new FormData(form);
  let upn = document.getElementById("uname").value;
  let upp = document.getElementById("uprice").value;
  formData.append("upn", pro_name);
  formData.append("upp", pro_price);
  console.log(upn, upp);
  console.log(formData);
  fetch("http://localhost:4000/products", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  // location.assign("/create.html");
}
