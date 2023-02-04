const inputField = document.getElementById("userValue");
const lineOne = document.getElementById("lineOne");
const lineTwo = document.getElementById("lineTwo");
const button = document.getElementById("add");
const optionsContainer = document.getElementById("options")

const scrollContainer = document.querySelector("main");
scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});


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

