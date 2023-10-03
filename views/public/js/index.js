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
const imageNameArr = ["1", "2", "3", "4", "5"];
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

function slideImage(idx) {
  slide.innerHTML = `<div class="image-wrapper"><img class="slide-image-${idx}" src="image/${imageNameArr[idx]}.png" /></div>`;
  createCircles();
}

slideImage(imageIdx);

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
      slideImage(imageIdx);
      befXPos = aftXPos = 0;
    } else if (befXPos > aftXPos) {
      imageIdx++;
      if (imageIdx > imageNameArr.length - 1) {
        imageIdx = 0;
      }
      slideImage(imageIdx);
      befXPos = aftXPos = 0;
    } else {
      slideImage(imageIdx);
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
  slideImage(imageIdx);
}, 5000);
