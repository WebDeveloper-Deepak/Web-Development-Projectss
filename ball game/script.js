var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var blocksCleared = 0; // Tracks blocks cleared for each level
var currentBlocks = [];
let level = 1; // Added Level Variable
let speed = 0.5; // Initial Speed
let score = 0; // Added Score Variable

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 2 + "px";
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380) {
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});

function getBlockColor(level) {
    const colors = ["black", "green", "yellow", "blue", "purple", "red"];
    return colors[(level - 1) % colors.length]; // Cycle through colors for each level
}

// Function to display the level-up message
function showLevelMessage(level) {
    const messageDiv = document.getElementById("level-message");
    messageDiv.innerText = `Level ${level} - Blocks are now ${getBlockColor(level)}!`; // Display level and block color
    messageDiv.style.display = "block"; // Show the message
    setTimeout(() => {
        messageDiv.style.display = "none"; // Hide the message after 3 seconds
    }, 3000); // 3 seconds
}

var blocks = setInterval(function () {
    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if (blockLastTop < 400 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = (blockLastTop || 0) + 100 + "px";
        hole.style.top = (holeLastTop || 0) + 100 + "px";
        block.style.backgroundColor = getBlockColor(level); // Set block color based on level
        var random = Math.floor(Math.random() * 360); // Randomize Hole Position
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
        score += 1; // Update Score
        document.getElementById("score-display").innerText = "Score: " + score;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = false;

    if (characterTop <= 0) {
        alert("Game over. Score: " + score);
        clearInterval(blocks);
        location.reload();
    }

    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        // Move blocks and holes upward
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";

        // Remove blocks that move off-screen
        if (iblockTop < -20) {
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
            blocksCleared++; // Increment cleared blocks
        }

        // Check if character is above a block and not in a hole
        if (
            iblockTop - 20 < characterTop &&
            iblockTop > characterTop &&
            !(iholeLeft <= characterLeft && iholeLeft + 40 >= characterLeft)
        ) {
            drop = true;
            character.style.top = iblockTop - 20 + "px"; // Keep character on the block
        }
    }

    // Handle gravity when not supported by a block
    if (!drop) {
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + "px"; // Simulate gravity
        }
    }

     // Level Progression Logic
     if (blocksCleared >= 50) { // Every 50 blocks cleared
        level++;
        blocksCleared = 0; // Reset cleared block count for the next level
        speed += 0.5; // Increase speed with each level
        document.getElementById("level-display").innerText = "Level: " + level;
        showLevelMessage(level); // Show level-up message
    }
}, 1);



