let screen = document.getElementById('screen');
let keys = document.getElementById('keys');
let userInput = [];

keys.addEventListener('click', function(e) {
    if(e.target.classList[0] === 'number' || e.target.classList[0] === 'operator') {
        addToScreen(e.target.getAttribute('data-value'));
    } else if(e.target.classList[0] === 'clear') {
        clearScreen();
    }
});

function addToScreen(value) {
    let isPvNum = !isNaN(Number(value));
    let isSvNum = !isNaN(Number(screen.textContent[screen.textContent.length - 1]));
    
    if((isSvNum === false && isPvNum) || (isSvNum && isPvNum) || (isSvNum && isPvNum === false)) {
        userInput.push(value);
        screen.textContent = userInput.join('');
    } else if (isSvNum === false && isPvNum === false) {
        userInput.pop();
        userInput.push(value);
        screen.textContent = userInput.join('');
    }
}

function clearScreen() {
    userInput = [];
    screen.textContent = '';
}

