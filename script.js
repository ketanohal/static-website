document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".logo", { duration: 1, y: -20, opacity: 0, ease: "power3.out" });
    gsap.from("nav ul li", { duration: 1, opacity: 0, y: -20, stagger: 0.2, ease: "power3.out" });
    gsap.from(".content", { duration: 1.5, opacity: 0, y: 50, ease: "power3.out" });

    const exploreBtn = document.querySelector(".btn");
    const newSection = document.querySelector(".hidden-section");

    exploreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(".container", {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                document.querySelector(".container").style.display = "none";
                newSection.style.display = "block";

                gsap.from(".hidden-section", {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power3.out"
                });

                gsap.from(".hidden-section h2", {
                    scale: 0.5,
                    rotationX: 360,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)"
                });

                startParticleAnimation(); // Start animated background
            }
        });
    });
    // Three.js 3D Cube Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    document.getElementById("cube-container").appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Function to create a futuristic animated background
    function startParticleAnimation() {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-1"; // Ensure it stays in the background

        const ctx = canvas.getContext("2d");
        const particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
        }

        Particle.prototype.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        };

        Particle.prototype.draw = function () {
            ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };

        for (let i = 0; i < 150; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
});
