let btn_back = document.querySelector(".back");
let btn_show = document.querySelector(".toggle-nav");
let btn_close = document.querySelector(".close");

btn_back.onclick = function () {
  document.querySelector("aside").classList.toggle("open");
  document.querySelectorAll("aside ul li a").forEach((c) => {
    c.classList.toggle("open");
  });
  // document.querySelector('.arrow').classList.toggle('d-none')
  // document.querySelector('.bars').classList.toggle('d-none')
};

btn_show.onclick = function () {
  document.querySelector("aside").classList.remove("close");
  this.classList.add("d-none");
};
btn_close.onclick = function () {
  document.querySelector("aside").classList.add("close");
  btn_show.classList.remove("d-none");
};

let btn_addDrug = document.querySelector(".add-drug");
let btn_clear = document.querySelector(".btn-clear");
// btn_addDrug.onclick = function () {
  
// };

function addDrug(){
  if (document.querySelector(".drug-name").value) {
    let s = document.createElement("span");
    s.innerText = document.querySelector(".drug-name").value;
    s.innerHTML += '<i class="fa-solid fa-check ms-2"></i>';
    document.querySelector(".drugs").appendChild(s);
    document.querySelector(".drugs").classList.add("mb-3");
  }
}


btn_clear.onclick = function () {
  document.querySelectorAll("form input").forEach((i) => {
    i.value = "";
  });
  document.querySelectorAll(".drugs span").forEach((s) => {
    s.remove();
  });
  document.querySelector(".drugs").classList.remove("mb-3");
};
