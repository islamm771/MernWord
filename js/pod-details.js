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

let music = new Audio("./audio/1.mp3");
let musics = [
  "./audio/1.mp3",
  "./audio/2.mp3",
  "./audio/3.mp3",
  "./audio/4.mp3",
  "./audio/5.mp3",
  "./audio/6.mp3",
];
let podcastName = document.querySelector(
  "article .podcasts-cont .podcast-name"
);
let playlist = document.querySelector(".playlist");
let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");

let Cases;

function fetchData() {
  return fetch("./js/data.json")
    .then((response) => response.json())
    .then((data) => {
      Cases = data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData().then(() => {
  console.log(Cases.Podcast_Name_1);
  displayCases(Cases.Podcast_Name_1);
});

function displayCases(cases) {
  cases.forEach((obj, index) => {
    const markup = `<div class='case'>
                        <img class="img-fluid" src="${obj.img}" alt="">
                        <h4>${obj.name}</h4>
                        <span class="play" id="${obj.id}" onclick="Play(${obj.id},${index})">
                                <i class="fa-solid fa-play"></i>
                        </span>
                        </div>`;
    document.querySelector(".cases").insertAdjacentHTML("beforeend", markup);
  });
}

function Play(id, index) {
  window.scrollTo(0, document.body.scrollHeight);
  music.src = `./audio/${id}.mp3`;
  PlayOne(index);
  PlayMusic();
}

function PlayMusic() {
  let ele = document.querySelector(".play-pause");
  if (music) {
    if (music.paused || music.currentTime <= 0) {
      music.play();
      ele.classList.replace("fa-play", "fa-pause");
    } else {
      music.pause();
      ele.classList.replace("fa-pause", "fa-play");
    }
    let index = musics.indexOf(
      "." + music.src.slice(music.src.indexOf("/audio"))
    );
    document.querySelector(".artist").innerHTML =
      Cases.Podcast_Name_1[index].name;
  }
}

let range = document.getElementById("music");
let vol = document.getElementById("vol");
let index = 0;
music.addEventListener("timeupdate", () => {
  let music_current = music.currentTime;
  let min1 = Math.floor(music_current / 60);
  let sec1 = Math.floor(music_current % 60);
  let music_duration = music.duration;
  let min2 = Math.floor(music_duration / 60);
  let sec2 = Math.floor(music_duration % 60);

  if (music_current && music_duration) {
    if (music_current == music_duration) {
      if (playlist.children.length > 1) {
        index =
          musics.indexOf("." + music.src.slice(music.src.indexOf("/audio"))) +
          1;
        if (index < musics.length) {
          let PlayCases = document.querySelectorAll(".playlist .case");
          PlayCases.forEach((p) => {
            p.classList.remove("active");
          });
          PlayCases[index].classList.add("active");
          music.src = musics[index];
          PlayMusic();
        } else {
          document
            .querySelector(".play-pause")
            .classList.replace("fa-pause", "fa-play");
        }
      } else {
        document
          .querySelector(".play-pause")
          .classList.replace("fa-pause", "fa-play");
      }
    }

    if (sec1 < 10) {
      sec1 = `0${sec1}`;
    }
    currentStart.innerHTML = `${min1}:${sec1}`;

    if (sec2 < 10) {
      sec2 = `0${sec2}`;
    }
    currentEnd.innerHTML = `${min2}:${sec2}`;

    let width = parseInt((music_current / music_duration) * 100);
    range.value = width;

    let progress = document.querySelector(".progress-container .progress");
    progress.style.width = `${range.value}%`;
  }
});

range.onchange = function () {
  music.currentTime = (this.value * music.duration) / 100;
};

vol.onchange = function () {
  music.volume = vol.value / parseInt(vol.max);
  let progress = document.querySelector(".other-features .progress");
  progress.style.width = `${vol.value}%`;
  let volume = document.querySelector(".volume");
  if (vol.value == 0) {
    volume.classList.remove("fa-volume-low");
    volume.classList.remove("fa-volume-high");
    volume.classList.add("fa-volume-xmark");
  } else if (vol.value < 50) {
    volume.classList.remove("fa-volume-high");
    volume.classList.remove("fa-volume-xmark");
    volume.classList.add("fa-volume-low");
  } else {
    volume.classList.remove("fa-volume-low");
    volume.classList.remove("fa-volume-xmark");
    volume.classList.add("fa-volume-high");
  }
};

function Mute(ele) {
  let progress = document.querySelector(".other-features .progress");
  if (music.volume) {
    music.volume = 0;
    ele.classList.remove("fa-volume-low");
    ele.classList.remove("fa-volume-high");
    ele.classList.add("fa-volume-xmark");
    vol.value = 0;
    progress.style.width = `${vol.value}%`;
  } else {
    music.volume = 1;
    ele.classList.remove("fa-volume-low");
    ele.classList.remove("fa-volume-xmark");
    ele.classList.add("fa-volume-high");
    vol.value = 100;
    progress.style.width = `${vol.value}%`;
  }
}

function ShowPlaylist() {
  let podcast = document.querySelector(".podcasts-cont");
  let playlist = document.querySelector(".playlist-cont");
  podcast.classList.toggle("d-none");
  playlist.classList.toggle("d-none");
  // window.scrollTo(0, 250);
}

let playAll = document.querySelector(".play-all");

playAll.onclick = function () {
  playlist.innerHTML = "";
  for (let i = 0; i < Cases.Podcast_Name_1.length; i++) {
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

    img.src = Cases.Podcast_Name_1[i].img;
    img_container.append(img);

    case_name.innerHTML = Cases.Podcast_Name_1[i].name;
    podcast_name.innerHTML = podcastName.innerHTML;
    case_describtion.append(case_name);
    case_describtion.append(podcast_name);

    caseDiv.append(img_container);
    caseDiv.append(case_describtion);

    playlist.append(caseDiv);
    if (i == 0) {
      caseDiv.classList.add("active");
      music.src = musics[i];
    }
  }
  PlayMusic();
};

function PlayOne(index) {
  let img_case_playlist = document.querySelector(".playlist .case img");
  let caseName_case_playlist = document.querySelector(
    ".playlist .case .case-name"
  );
  let podcastName_case_playlist = document.querySelector(
    ".playlist .case .podcast-name"
  );

  img_case_playlist.src = Cases.Podcast_Name_1[index].img;
  caseName_case_playlist.innerHTML = Cases.Podcast_Name_1[index].name;
  podcastName_case_playlist.innerHTML = podcastName.innerHTML;
  music.src = musics[index];
}

function PrevMusic() {
  let PlayCases = document.querySelectorAll(".playlist .case");
  if (PlayCases.length > 1) {
    index--;
    if (index < 0) {
      index = PlayCases.length - 1;
    }
    PlayCases.forEach((p) => {
      p.classList.remove("active");
    });
    PlayCases[index].classList.add("active");
    document.querySelector(".artist").innerHTML =
      Cases.Podcast_Name_1[index].name;
    music.src = musics[index];
    PlayMusic();
  }
}
function NextMusic() {
  let PlayCases = document.querySelectorAll(".playlist .case");
  if (PlayCases.length > 1) {
    index++;
    if (index >= PlayCases.length) {
      index = 0;
    }
    PlayCases.forEach((p) => {
      p.classList.remove("active");
    });
    PlayCases[index].classList.add("active");
    document.querySelector(".artist").innerHTML =
      Cases.Podcast_Name_1[index].name;
    music.src = musics[index];
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

let search = document.querySelector(".search");
search.addEventListener("input", () => {
  window.removeEventListener("keydown", onKeyDown, false);
  let cases = document.querySelectorAll(".podcast .case");
  cases.forEach((c) => {
    c.style.display = "block";
  });
  let found = false;
  if (search.value) {
    cases.forEach((c) => {
      if (search.value.toLowerCase() != c.innerText.toLowerCase()) {
        c.style.display = "none";
      } else if (search.value.toLowerCase() == c.innerText.toLowerCase()) {
        found = true;
      }
    });
  } else {
    found = true;
  }

  if (!found) {
    document.querySelector(".validTxt").classList.remove("d-none");
  } else {
    document.querySelector(".validTxt").classList.add("d-none");
  }
});
search.onblur = function () {
  window.addEventListener("keydown", onKeyDown, false);
};
