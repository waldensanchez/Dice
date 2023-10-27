let images = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png"
  ];
  
  let dice = document.querySelectorAll("img");
  
  class Dice {
    constructor() {
      this.allDice = {
        1: [1, 2, 3, 4, 5, 6],
        2: [1, 2, 3, 3],
        3: [1, 2, 3, 6, 6, 6],
        4: [1, 2, 3, 4, 5, 6, 7, 7]
      };
    }
  
    choose(diceNumber) {
      this.selectedDice = this.allDice[diceNumber];
    }
  
    roll() {
      const randomIndex = Math.floor(Math.random() * this.selectedDice.length);
      return this.selectedDice[randomIndex];
    }
  }
  
  let throws = 0;
  
  // Add manual input field for the number of rolls
  const numRollsInput = document.getElementById("numRollsInput");
  const decrementButton = document.getElementById("decrement");
  const incrementButton = document.getElementById("increment");
  
  // Event listener for manual input
  numRollsInput.addEventListener("input", () => {
    let currentCount = parseInt(numRollsInput.value);
    if (currentCount < 1) {
      currentCount = 1;
    }
    numRollsInput.value = currentCount;
    updateRollCount(currentCount);
  });
  
  decrementButton.addEventListener("click", () => {
    let currentCount = parseInt(numRollsInput.value);
    if (currentCount > 1) {
      currentCount--;
      numRollsInput.value = currentCount;
      updateRollCount(currentCount);
    }
  });
  
  incrementButton.addEventListener("click", () => {
    let currentCount = parseInt(numRollsInput.value);
    currentCount++;
    numRollsInput.value = currentCount;
    updateRollCount(currentCount);
  });
  
  // Function to update the number of rolls and re-roll if needed
  function updateRollCount(newCount) {
    numRollsInput.value = newCount;
  }
  
  function rollDice(diceNumber) {
    // Select the specific die
    const die = dice[diceNumber - 1];
    throws++;
    die.classList.add("shake");
  
    setTimeout(function () {
      die.classList.remove("shake");
  
      const diceInstance = new Dice();
      diceInstance.choose(diceNumber);
      const dieValue = diceInstance.roll();
  
      // Update the image for the specific die
      die.setAttribute("src", images[dieValue - 1]); // Adjust the index
    }, 1000);
  }
  
  // Usage
  const myDice = new Dice();
  
  // You can't access a property named 'help' because it's not defined in the Dice class.
  // console.log(myDice.help); // Display usage instructions
  
  myDice.choose(1); // Select a 6-sided die
  myDice.roll(); // Roll the selected die
  
  // Function to create a table row with roll details
  function addTableRow(throws, rollNumber, diceNumber, rollResult) {
    const table = document.getElementById("resultTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
  
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = throws;
  
    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = rollNumber;
  
    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = diceNumber;
  
    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = rollResult;
  }
  
  // Add event listeners to the roll buttons
  const rollButtons = document.querySelectorAll(".carousel-caption button");
  
  rollButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const diceNumber = index + 1; // Dice numbers are 1-indexed
      const numRolls = parseInt(numRollsInput.value);
  
      for (let i = 0; i < numRolls; i++) {
        const diceInstance = new Dice();
        diceInstance.choose(diceNumber);
        const rollResult = diceInstance.roll();
  
        // Add the roll details to the table
        addTableRow(throws, i + 1, diceNumber, rollResult); // Added 'i + 1' for roll number
      }
  
      // Show the table after the rolls are added
      document.getElementById("resultTable").style.display = "table";
    });
  });

      // Function to export the table to Excel
  function exportTableToExcel() {
        const table = document.getElementById("resultTable");
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "DiceRollData");
        XLSX.writeFile(wb, "dice_roll_data.xlsx");
  }
  
  // Add an event listener to the export button
  document.getElementById("exportToExcel").addEventListener("click", exportTableToExcel);
  