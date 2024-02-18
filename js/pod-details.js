let btn_back = document.querySelector(".back");
let btn_show = document.querySelector(".toggle-nav");
let btn_close = document.querySelector(".close");
let music = new Audio("./audio/1.mp3");
let musics = [
  "./audio/1.mp3",
  "./audio/2.mp3",
  "./audio/3.mp3",
  "./audio/4.mp3",
  "./audio/5.mp3",
  "./audio/6.mp3",
];
let podcastName = document.querySelector('article .podcasts-cont .podcast-name')

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

let cases = Array.from(document.querySelectorAll(".cases .case"));
let btn_play = Array.from(document.querySelectorAll(".cases .case .play"));
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


function ShowPlaylist(){
  let podcast = document.querySelector(".podcasts-cont");
  let playlist = document.querySelector(".playlist");
  podcast.classList.toggle('d-none')
  playlist.classList.toggle('d-none')
  window.scrollTo(0, 250);
}


let playAll = document.querySelector('.play-all');

playAll.onclick = function(){
  let playlist = document.querySelector(".playlist");
  playlist.innerHTML = "<h4>Play Next</h4>";

  for (let i = 0; i < cases.length; i++) {
    let caseDiv = document.createElement("div");
    caseDiv.classList.add("case");
    let img_container = document.createElement("div");
    img_container.classList.add("img-container");
    let img = document.createElement("img");
    let case_describtion = document.createElement("div");
    case_describtion.classList.add("case-describtion", "ps-2");
    let case_name = document.createElement("p");
    case_name.classList.add("case-name");
    let podcast_name = document.createElement("p");
    podcast_name.classList.add("podcast-name");

    img.src = "./img/case-img.png";
    img_container.append(img);

    case_name.innerHTML = cases[i].querySelector("h4").innerHTML;
    podcast_name.innerHTML = podcastName.innerHTML;
    case_describtion.append(case_name);
    case_describtion.append(podcast_name);

    caseDiv.append(img_container);
    caseDiv.append(case_describtion);

    playlist.append(caseDiv);
    if (i == 0) {
      caseDiv.classList.add("active");
      document.querySelector(".artist").innerHTML = cases[i].querySelector("h4").innerHTML;
      music.src = musics[i];
    }
  }
  PlayMusic();
}


let index = 0
function PrevMusic(){
  let PlayCases = document.querySelectorAll('.playlist .case')
  index--;
  if(PlayCases.length > 1){
    if(index < 0){
      index = PlayCases.length -1
    }
    PlayCases.forEach((p) => {
      p.classList.remove("active");
    });
    PlayCases[index].classList.add("active");
    document.querySelector(".artist").innerHTML = cases[index].querySelector("h4").innerHTML
    music.src = musics[index]
    PlayMusic();
  }
}
function NextMusic(){
  let PlayCases = document.querySelectorAll('.playlist .case')
  index++;
  if(PlayCases.length > 1){
    if(index >= PlayCases.length){
      index = 0
    }
    PlayCases.forEach((p) => {
      p.classList.remove("active");
    });
    PlayCases[index].classList.add("active");
    document.querySelector(".artist").innerHTML = cases[index].querySelector("h4").innerHTML
    music.src = musics[index]
    PlayMusic();
  }
}



function onKeyDown(event) {
  switch (event.keyCode) {
    case 32: //SpaceBar
      PlayMusic();
      break;
  }
  return false;
}

window.addEventListener("keydown", onKeyDown, false);
