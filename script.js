const inputField = document.getElementById("userValue");
const lineOne = document.getElementById("lineOne");
const lineTwo = document.getElementById("lineTwo");
const button = document.getElementById("add");
const arrayContainer = document.getElementById("arrayContainer");
const objectContainer = document.getElementById("objectContainer");
const fixedContainer = document.querySelector(".container-two");
const dyContainer = document.querySelector(".container");






//Scroll Effect

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

window.addEventListener('resize', init);

let containerWidth;
let current = 0;
let target = 0;
let ease = .05;

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function setTransform(el, transform) {
  el.style.transform = transform;
}
function setBorderRadius(el, bordeRadius) {
  el.style.borderRadius = bordeRadius;
}

function init() {
  containerWidth = fixedContainer.getBoundingClientRect().width * 2;
  document.body.style.height = `${containerWidth - (window.innerWidth - window.innerHeight)}px`;

}

function animate() {
  current = parseFloat(lerp(current, target, ease).toFixed(2));
  target = window.scrollY;
  setTransform(dyContainer, `translateX(-${current}px)`);
  setBorderRadius(dyContainer, `0 ${current}px ${current}px 0`)
  requestAnimationFrame(animate);
}

init();
animate();

//Animation for button
button.addEventListener("click", () => {
  if (inputField.value !== "") {
    lineOne.classList.add("lineOneAdded");
    lineTwo.classList.add("lineTwoAdded");
    inputField.value = "";

    setTimeout(() => {
      lineOne.classList.remove("lineOneAdded");
      lineTwo.classList.remove("lineTwoAdded");
    }, 1500)
  }
})

//Creating memory slots
for (let i = 0; i < 800; i++) {
  const memorySlot = document.createElement("div");
  memorySlot.setAttribute("class", "memory");
  arrayContainer.appendChild(memorySlot);
}