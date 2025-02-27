const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startBtn");
const exitBtn = document.getElementById("exitBtn");
const message = document.getElementById("message");
const hackingSound = document.getElementById("hackingSound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array.from({ length: columns }).fill(1);

function drawMatrixRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Green color
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Glitch Effect
function glitchScreen() {
    document.body.style.backgroundColor = "#0F0";
    document.body.style.color = "black";
    setTimeout(() => {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "limegreen";
    }, 500);
}

// Start the Matrix Effect
btn.addEventListener("click", () => {
    btn.style.display = "none";  
    hackingSound.play(); // Play sound effect

    glitchScreen(); // Apply glitch effect

    setTimeout(() => {
        canvas.style.display = "block";
        setInterval(drawMatrixRain, 50); // Start Matrix rain
        setTimeout(() => {
            message.classList.remove("hidden"); // Show message
            exitBtn.classList.remove("hidden"); // Show exit button
        }, 5000);
    }, 1000);
});

// Exit the Matrix
exitBtn.addEventListener("click", () => {
    canvas.style.display = "none";
    message.classList.add("hidden");
    exitBtn.classList.add("hidden");
    btn.style.display = "block"; // Reset button
});
