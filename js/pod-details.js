let btn_back = document.querySelector(".back");
let btn_show = document.querySelector(".toggle-nav");
let btn_close = document.querySelector(".close");
let music = new Audio('../audio/1.mp3')



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

let cases = document.querySelectorAll('.cases .case');
let btn_play = Array.from(document.querySelectorAll(".cases .case .play"));
let masterPlay = document.getElementById("masterPlay");
let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");





for(let i =0;i<btn_play.length;i++){
    btn_play[i].onclick = function(){
        document.querySelector(".artist").innerHTML = cases[i].children[1].innerHTML;
        window.scrollTo(0, document.body.scrollHeight);
        music.src = `../audio/${btn_play[i].id}.mp3`;
        PlayMusic();
    }
}

function PlayMusic(){
  let ele = document.querySelector(".play-pause");
  if(music){
    if (music.paused || music.currentTime <= 0) {
      music.play();
      ele.classList.replace("fa-play", "fa-pause");
    } else {
      music.pause();
      ele.classList.replace("fa-pause", "fa-play");
    }
  }
}


let range = document.getElementById("music");
let vol = document.getElementById("vol");

music.addEventListener('timeupdate' , ()=>{
  let music_current = music.currentTime
  let min1 = Math.floor(music_current / 60)
  let sec1 = Math.floor(music_current % 60)
  let music_duration = music.duration;
  let min2 = Math.floor(music_duration / 60);
  let sec2 = Math.floor(music_duration % 60);


  if(music_current && music_duration){
    if(music_current == music_duration){
    document
      .querySelector(".play-pause")
      .classList.replace("fa-pause", "fa-play");
  }

  if(sec1 < 10){
    sec1 = `0${sec1}`
  }
  currentStart.innerHTML = `${min1}:${sec1}`

  if (sec2 < 20) {
    sec2 = `0${sec2}`;
  }
  currentEnd.innerHTML = `${min2}:${sec2}`;

  let width = parseInt((music_current / music_duration) * 100);
  range.value = width

  let progress = (document.querySelector(
    ".progress-container .progress")
  )
  progress.style.width = `${width}%`;
  }
})


range.onchange = function () { 
  music.currentTime = this.value * music.duration / 100
 }


vol.onchange = function () { 
  music.volume = vol.value / parseInt(vol.max);
  let progress = document.querySelector(".other-features .progress");
  progress.style.width = `${vol.value}px`;
 }
