let InPassword = document.querySelector(".InPassword");
let InEmail = document.querySelector(".InEmail");
let key = document.querySelector(".key-off")

key.onclick = function(){
    if(InPassword.type === 'password'){
        InPassword.type = 'text'
    }else{
        InPassword.type = "password";
    }
}

InPassword.onfocus = function(){
    let key = document.querySelector("main .key-con svg.key");
    key.style.cssText = 'top: 40px;left: -275px;transform: rotate(38deg);'
}
InEmail.onfocus = function () {
  let key = document.querySelector("main .key-con svg.key");
  key.style.cssText = "position: absolute;top: 12px;left: -285px;transform: rotate(19deg);";
};
