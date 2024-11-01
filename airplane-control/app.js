// Set up the canvas
const canvas = document.getElementById("flightCanvas");
const ctx = canvas.getContext("2d");

// Initial values
const initialX = 0; // Start exactly at the left edge
const initialY = canvas.height / 2;
const initialYaw = 0;
const initialSpeed = 40;

let airplaneX = initialX;
let airplaneY = initialY;
let yawAngle = initialYaw; // Yaw in degrees
let airspeed = initialSpeed; // Initial airspeed set to 40 knots
let isFlying = false; // Start/Stop flag

// Conversion factor for airspeed to pixels per update
const knotsToPixels = 0.1;

// Load airplane image
const airplaneImage = new Image();
airplaneImage.src = "airplane.png"; // Ensure this file is in the same directory

// Update yaw and speed displays
const yawDisplay = document.getElementById("yawDisplay");
const speedDisplay = document.getElementById("speedDisplay");

// Array to store flight path points, starting exactly at the left edge
let flightPath = [{ x: 0, y: initialY }]; // Initial starting point at the left edge

// Function to update yaw and speed display
function updateDisplay() {
    // Set displayYaw to positive or negative based on direction
    const displayYaw = airplaneY > initialY ? -Math.abs(yawAngle) : Math.abs(yawAngle);
    yawDisplay.textContent = displayYaw + '°';
    speedDisplay.textContent = airspeed + ' knots';
}

// Increase/decrease yaw functions
function increaseYaw() {
    yawAngle = Math.min(180, yawAngle + 5); // Limit to 180 degrees upward
    updateDisplay();
    drawAirplane();
}

function decreaseYaw() {
    yawAngle = Math.max(-180, yawAngle - 5); // Limit to -180 degrees downward
    updateDisplay();
    drawAirplane();
}

// Increase/decrease speed functions
function increaseSpeed() {
    airspeed += 10;
    updateDisplay();
}

function decreaseSpeed() {
    airspeed = Math.max(0, airspeed - 15); // Prevent negative speed
    updateDisplay();
}

// Start/stop the animation
function toggleStartStop() {
    isFlying = !isFlying;
    document.querySelector("button[onclick='toggleStartStop()']").textContent = isFlying ? "Stop" : "Start";
    if (isFlying) animate();
}

// Reset the canvas to its initial load state
function resetCanvas() {
    // Stop the airplane if it's flying
    isFlying = false;
    document.querySelector("button[onclick='toggleStartStop()']").textContent = "Start";

    // Reset position, yaw, speed, and flight path to initial values
    airplaneX = initialX;
    airplaneY = initialY;
    yawAngle = initialYaw;
    airspeed = initialSpeed;
    flightPath = [{ x: 0, y: initialY }]; // Restart flight path at the exact left edge

    // Update displays
    updateDisplay();

    // Redraw the canvas to the initial state
    drawAirplane();
}

// Calculate new position based on yaw and speed
function updatePosition() {
    const angleRad = (yawAngle * Math.PI) / 180;
    const dx = Math.cos(angleRad) * airspeed * knotsToPixels;
    const dy = Math.sin(angleRad) * airspeed * knotsToPixels;

    airplaneX += dx;
    airplaneY += dy;

    // Check for canvas boundaries; reset airplane position and yaw if crossing
    if (airplaneX > canvas.width || airplaneY < 0 || airplaneY > canvas.height) {
        airplaneX = 0; // Reset to the exact left edge of the canvas
        airplaneY = initialY; // Reset to center vertically
        yawAngle = initialYaw; // Reset yaw angle to 0
        flightPath = [{ x: 0, y: airplaneY }]; // Restart flight path from the exact left edge
        return;
    }

    // Add current position to flight path
    flightPath.push({ x: airplaneX, y: airplaneY });
}

// Clear canvas, draw flight path, update position, and draw the airplane image
function drawAirplane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

    // Draw the flight path
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    if (flightPath.length > 0) {
        ctx.moveTo(flightPath[0].x, flightPath[0].y);
        for (let i = 1; i < flightPath.length; i++) {
            ctx.lineTo(flightPath[i].x, flightPath[i].y);
        }
    }
    ctx.stroke();

    // Save the context state, apply rotation, and draw the airplane image at 60x60 pixels
    ctx.save();
    ctx.translate(airplaneX, airplaneY); // Move origin to airplane's position
    ctx.rotate((yawAngle * Math.PI) / 180); // Rotate to match yaw angle
    ctx.drawImage(airplaneImage, -30, -30, 60, 60); // Center and draw at 60x60 pixels
    ctx.restore();
}

// Main animation loop
function animate() {
    if (!isFlying) return; // Stop animation if not flying

    updatePosition();
    drawAirplane();
    requestAnimationFrame(animate);
}

// Initial display of airplane on page load
airplaneImage.onload = () => {
    updateDisplay(); // Initial display update
    drawAirplane(); // Draw airplane immediately on load
};
