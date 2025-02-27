// Matrix Rain Effect Canvas
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startBtn");
const exitBtn = document.getElementById("exitBtn");
const message = document.getElementById("message");
const hackingSound = document.getElementById("hackingSound");

// Custom alert elements
const alertBox = document.getElementById("customAlert");
const closeAlert = document.getElementById("closeAlert");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Function to draw Matrix Rain Effect
function drawMatrixRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
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

// Function to detect Windows version accurately
function getWindowsVersion() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows NT 10.0")) {
        if (navigator.userAgentData && navigator.userAgentData.platform === "Windows") {
            return "Windows 11";
        }
        return "Windows 10";
    }
    return "Unknown OS";
}

// Function to detect browser properly
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (/Edg/i.test(userAgent)) return "Microsoft Edge";
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) return "Google Chrome";
    if (/Brave/i.test(navigator.userAgentData?.brands?.map(b => b.brand).join(" "))) return "Brave";
    if (/Firefox/i.test(userAgent)) return "Mozilla Firefox";
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return "Safari";
    return "Unknown Browser";
}

// Function to create typewriter effect
function typeWriterEffect(element, htmlContent, speed = 50, callback = null) {
    element.innerHTML = ""; // Clear existing content
    let index = 0;
    let tempText = "";
    
    function type() {
        if (index < htmlContent.length) {
            if (htmlContent[index] === "<") {
                let closingTagIndex = htmlContent.indexOf(">", index);
                if (closingTagIndex !== -1) {
                    tempText += htmlContent.substring(index, closingTagIndex + 1);
                    index = closingTagIndex + 1;
                }
            } else {
                tempText += htmlContent[index];
                index++;
            }
            element.innerHTML = tempText;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }
    type();
}

// Modify the button click event to use the typewriter effect
btn.addEventListener("click", () => {
    alertBox.classList.remove("hidden"); 
    btn.style.display = "none"; 

    canvas.style.display = "block";  
    setInterval(drawMatrixRain, 50);
    hackingSound.play();

    setTimeout(() => {
        alertBox.classList.add("hidden");

        // Fetch system details
        const os = getWindowsVersion();
        const browser = getBrowserName();
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const currentTime = new Date().toLocaleString();

        const systemMessage = `
            <strong>System Compromised Successfully!</strong><br><br>
            <b>OS:</b> ${os}<br>
            <b>Browser:</b> ${browser}<br>
            <b>Screen Resolution:</b> ${screenWidth} x ${screenHeight}<br>
            <b>Time:</b> ${currentTime}
        `;

        message.classList.remove("hidden");

        // Apply typewriter effect
        typeWriterEffect(message, systemMessage, 50, () => {
            exitBtn.classList.remove("hidden");
        });

    }, 2000);
});

// Cursor effect function
function cursorEffect(event) {
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    document.body.appendChild(trail);
    
    trail.style.left = `${event.clientX}px`;
    trail.style.top = `${event.clientY}px`;
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

document.addEventListener("mousemove", cursorEffect);

// Ensure the alert box is hidden on page load
alertBox.classList.add("hidden");

// Close alert when clicking OK
closeAlert.addEventListener("click", () => {
    alertBox.classList.add("hidden");
});

// Exit button event
exitBtn.addEventListener("click", () => {
    canvas.style.display = "none";
    message.classList.add("hidden");
    exitBtn.classList.add("hidden");
    btn.style.display = "block";
});
