// index.js -  ChatGPT 


// handle the custom cursor:
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// play and stop sound effect when button is clicked.
function toggleSoundEffect() {
    let soundEffect = document.getElementById("soundEffect");

    if (soundEffect.paused) {
        soundEffect.play();
    } else {
        soundEffect.pause();
        soundEffect.currentTime = 0; // Reset the audio to the beginning
    }
}

// shop now button
document.getElementById('products_display.html').onclick = function () {
    window.location.href = 'products_display.html';
};
