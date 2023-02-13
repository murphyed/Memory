const inputField = document.getElementById("userValue");
const lineOne = document.getElementById("lineOne");
const lineTwo = document.getElementById("lineTwo");
const button = document.getElementById("add");
const arrayContainer = document.getElementById("arrayContainer");
const objectContainer = document.getElementById("objectContainer");
const fixedContainer = document.querySelector(".container-two");
const dyContainer = document.querySelector(".container");
const bitType = Number(document.getElementById("bit-type").value);
const dataType = document.getElementById("data-type").value;
const userValue = document.getElementById("userValue");
const arrayBtn = document.getElementById("arrayBtn");
const objectBtn = document.getElementById("objectBtn");
const closeBtn = document.getElementById("close");
const slotContainer = document.getElementById("slotContainer");
const slotNumber = document.getElementById("slotNumber");

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
  setBorderRadius(dyContainer, `0 ${current}px ${current}px 0`);
  requestAnimationFrame(animate);
}

init();
animate();

//Animation for button
button.addEventListener("click", () => {
  if (inputField.value !== "") {
    onSubmit();
    lineOne.classList.add("lineOneAdded");
    lineTwo.classList.add("lineTwoAdded");
    inputField.value = "";

    setTimeout(() => {
      lineOne.classList.remove("lineOneAdded");
      lineTwo.classList.remove("lineTwoAdded");
    }, 1500)
  }
})


//View buttons
arrayBtn.addEventListener("click", () => {
  if (!arrayBtn.classList.contains("activeBtn")) {
    arrayBtn.classList.add("activeBtn");
    arrayBtn.classList.remove("inactiveBtn");
    objectBtn.classList.add("inactiveBtn");
    objectBtn.classList.remove("activeBtn");
  }
})
objectBtn.addEventListener("click", () => {
  if (!objectBtn.classList.contains("activeBtn")) {
    objectBtn.classList.add("activeBtn");
    objectBtn.classList.remove("inactiveBtn");
    arrayBtn.classList.add("inactiveBtn");
    arrayBtn.classList.remove("activeBtn");
  }
})

//Close slot button
closeBtn.addEventListener("click", () => {
  document.querySelector(".decimalValue").innerHTML = "";
  document.querySelector(".binaryValue").innerHTML = "";
  slotContainer.classList.add("hidden");
})


//Creating memory slots
for (let i = 1; i < 801; i++) {
  const memorySlot = document.createElement("div");
  memorySlot.setAttribute("class", "memory");
  memorySlot.setAttribute("id", `slot${i}`);

  memorySlot.addEventListener("click", () => {
    slotContainer.classList.remove("hidden");
    slotNumber.innerText = `address: ${numberBinary(i)}`;
  })
  arrayContainer.appendChild(memorySlot);
}

//number to binary
function numberBinary(number) {
  const remainders = [];
  let numValue = number
  if (numValue === 0) {
    remainders.push(0);
  }
  while (numValue !== 0) {
    let quotient = Math.floor(numValue / 2);
    let remainder = numValue % 2;
    numValue = quotient;
    remainders.push(remainder);
  }
  const binaryValue = remainders.reverse().join('');
  return binaryValue
}

//String to binary
function stringBinary(string) {
  const stringChars = [...string];
  let binaryString = "";
  for (let i = 0; i < stringChars.length; i++) {
    let charInt = `${stringChars[i]}`.charCodeAt(0);
    let charBinary = numberBinary(charInt);
    binaryString += "0" + charBinary;
  }
  return binaryString
}


//Value retreival
function valueRetreival(value) {
  if (value === undefined) {
    document.querySelector(".decimalValue").innerHTML = "allocated";
    document.querySelector(".binaryValue").innerHTML = "...";
  } else {
    if (isNaN(value)) {
      const stringV = stringBinary(value);
      document.querySelector(".decimalValue").innerHTML = value;
      document.querySelector(".binaryValue").innerHTML = stringV;
    } else {
      const numberV = numberBinary(value);
      document.querySelector(".decimalValue").innerHTML = value;
      document.querySelector(".binaryValue").innerHTML = numberV;
    }
  }
}


//ARRAY ALGORITHM
//First we generate a random number 
let numbers = [];
function randomNumbersArray(amount) {
  //Resetting previous UI slots
  if (numbers.length !== 0) {
    for (let i = 0; i < numbers.length; i++) {
      const slot = document.getElementById(`slot${numbers[i]}`);
      slot.classList.remove("memoryInUse");
      slot.classList.remove("allocatedMemory");
      slot.classList.add("memory");
    }
    //Reseting numbers Array
    numbers = [];
  }

  let randomNumber = Math.floor(Math.random() * 801);

  if (amount > 256) {
    randomNumber = Math.floor(Math.random() * 10);
  }
  //Second increment generated number x times based on index
  for (let i = 0; i < amount; i++) {
    let sequencedNumber = randomNumber;
    sequencedNumber += i;
    numbers.push(sequencedNumber);
  }

  // Updating UI to show which memory slots are in use
  for (let i = 0; i < numbers.length; i++) {
    const slot = document.getElementById(`slot${numbers[i]}`);
    slot.classList.remove("memory");
    slot.classList.add("memoryInUse");

    if (i >= numbers.length / 2) {
      slot.classList.remove("memoryInUse");
      slot.classList.add("allocatedMemory");
    }
  }


  return numbers
}

//Re-allocate array space when elements array gets full
let allocation = 2;
function reallocate() {
  randomNumbersArray(allocation);
  allocation *= 2;
}

//Checking allocation status
const arrayValues = []
function checkMemoryStatus() {
  if (arrayValues.length === 1) {
    reallocate();
  } else if (arrayValues.length === allocation / 2) {
    reallocate();
  }
}

//Reading values from user inputs
function readingValues(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    let slot = document.getElementById(`slot${numbers[i]}`);
    slot.addEventListener("click", () => {
      valueRetreival(arrayValues[i]);
    })
  }
}

//Update allocated Slots
function updateAllocatedSlots(valuesArray) {
  let lastIndex = valuesArray.length;
  let allocatedSlot = numbers[lastIndex - 1];
  let slot = document.getElementById(`slot${allocatedSlot}`);
  slot.classList.remove("allocatedMemory");
  slot.classList.add("memoryInUse");
}

//Getting user input
function onSubmit() {
  // let bit = bitType;
  // let data = dataType;
  let value = userValue.value;
  arrayValues.push(value);
  checkMemoryStatus();
  readingValues(numbers);
  updateAllocatedSlots(arrayValues);
  // return bit, data, value;
}