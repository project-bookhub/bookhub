function searchAction() {
  const inputValue = document.getElementById("search-input").value;
  const newAction = "/books/search?bookSearch=" + inputValue + "&page=1";

  location.href = newAction;
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchAction();
  });

const slide = document.querySelector(".slide");
const img = new Image();
const imageNameArr = ["1", "2", "3", "4"];
let imageIdx = 0;

function createCircles() {
  slide.innerHTML += `<div class="circle-area"></div>`;
  const circleArea = document.querySelector(".circle-area");
  for (let i = 0; i < imageNameArr.length; i++) {
    if (imageIdx === i) {
      circleArea.innerHTML += `<div class="highlight-circle">&nbsp;⬤&nbsp;</div>`;
    } else {
      circleArea.innerHTML += `<div class="circle">&nbsp;⬤&nbsp;</div>`;
    }
  }
}

function runSlideImage(idx) {
  slide.innerHTML = "";
  slideImage(idx - 1);
  slideImage(idx);
  slideImage(idx + 1);
  createCircles();
  slide.innerHTML += `<div class="slide-wrapper"></div>`;
}
function slideImage(idx) {
  if (idx < 0) {
    idx = imageNameArr.length - 1;
  } else if (idx > imageNameArr.length - 1) {
    idx = 0;
  }
  slide.innerHTML += `<img class="image" src="image/${imageNameArr[idx]}.png" />`;
}
function gotoRight() {
  const images = document.querySelectorAll(".image");
  for (let i = 0; i < imageNameArr.length; i++) {
    setTimeout(() => {
      images[i].classList.remove("slide-left");
      images[i].classList.add("slide-right");
    }, 10);
  }
}
function gotoLeft() {
  const images = document.querySelectorAll(".image");
  for (let i = 0; i < imageNameArr.length; i++) {
    setTimeout(() => {
      images[i].classList.remove("slide-right");
      images[i].classList.add("slide-left");
    }, 10);
  }
}

runSlideImage(imageIdx);

slide.onmouseover = () => {
  let befXPos = 0;
  let aftXPos = 0;

  document.onmousedown = (e) => {
    befXPos = e.pageX;
    // console.log(e.pageX);
  };
  document.onmouseup = (e) => {
    aftXPos = e.pageX;
    // console.log(e.pageX);
    if (befXPos < aftXPos) {
      imageIdx--;
      if (imageIdx < 0) {
        imageIdx = imageNameArr.length - 1;
      }
      gotoLeft();
      setTimeout(() => {
        runSlideImage(imageIdx);
      }, 200);
      befXPos = aftXPos = 0;
    } else if (befXPos > aftXPos) {
      imageIdx++;
      if (imageIdx > imageNameArr.length - 1) {
        imageIdx = 0;
      }
      gotoRight();
      setTimeout(() => {
        runSlideImage(imageIdx);
      }, 200);
      befXPos = aftXPos = 0;
    } else {
      runSlideImage(imageIdx);
    }
  };
};
slide.onmouseout = () => {
  document.onmousedown = () => {};
  document.onmouseup = () => {};
};

setInterval(() => {
  imageIdx++;
  if (imageIdx > imageNameArr.length - 1) {
    imageIdx = 0;
  }
  gotoRight();
  setTimeout(() => {
    runSlideImage(imageIdx);
  }, 200);
}, 5000);
