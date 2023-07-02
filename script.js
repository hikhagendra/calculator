let screen = document.getElementById('screen');
let keys = document.getElementById('keys');

keys.addEventListener('click', function(e) {
    if(e.target.classList[0] === 'number') {
        addToScreen(e.target.getAttribute('data-value'));
    } else if (e.target.classList[0] === 'operator') {
        let currentVal = screen.textContent;
        
        if(currentVal[currentVal.length - 1] === ('+' || '-' || '/' || '*')) {
            // Double operator clicked
        } else if (currentVal === '') {
            // Directly operator clicked
        } else {
            addToScreen(e.target.getAttribute('data-value'));
        }
    }
});

function addToScreen(value) {
    screen.textContent += value;
}