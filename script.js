const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startBtn");

// Resize canvas to fill screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize;
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

btn.addEventListener("click", () => {
    btn.style.display = "none";  // Hide button
    canvas.style.display = "block"; // Show canvas
    setInterval(drawMatrixRain, 50); // Start effect
});
