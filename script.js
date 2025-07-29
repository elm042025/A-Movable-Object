const moveableObject = document.querySelector("#moveable-object");
const rect = moveableObject.getBoundingClientRect();
let x = rect.left;
let y = rect.top;

document.addEventListener("keydown", (e) => {
   switch (e.key) {
      case "ArrowUp":
         y = Math.max(0, y - 25);
         moveableObject.style.top = `${y}px`;
         leaveTrail(x, y); // Leave trail when moving up
         break;
      case "ArrowDown":
         y = Math.min(window.innerHeight - 50, y + 25);
         moveableObject.style.top = `${y}px`;
         leaveTrail(x, y); // Leave trail when moving down
         break;
      case "ArrowLeft":
         x = Math.max(0, x - 25);
         moveableObject.style.left = `${x}px`;
         leaveTrail(x, y); // Leave trail when moving left
         break;
      case "ArrowRight":
         x = Math.min(window.innerWidth - 50, x + 25);
         moveableObject.style.left = `${x}px`;
         leaveTrail(x, y); // Leave trail when moving right
         break;
   }
});

document.addEventListener("click", (e) => {
   const maxX = window.innerWidth - 50;
   const maxY = window.innerHeight - 50;

   const newX = Math.max(0, Math.min(e.clientX - 25, maxX));
   const newY = Math.max(0, Math.min(e.clientY - 25, maxY));

   // Trail settings:
   const steps = Math.max(Math.abs(newX - x), Math.abs(newY - y)) / 25; // adjust "10" for trail density

   for (let i = 0; i <= steps; i++) {
      const trailX = x + ((newX - x) * i) / steps;
      const trailY = y + ((newY - y) * i) / steps;
      leaveTrail(trailX, trailY);
   }

   // Move the object to the new position (and update x/y)
   x = newX;
   y = newY;
   moveableObject.style.left = `${x}px`;
   moveableObject.style.top = `${y}px`;
});

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

moveableObject.addEventListener("mousedown", (e) => {
   isDragging = true;
   dragOffsetX = e.clientX - x;
   dragOffsetY = e.clientY - y;
   moveableObject.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
   if (isDragging) {
      x = Math.max(0, Math.min(e.clientX - dragOffsetX, window.innerWidth - 50));
      y = Math.max(0, Math.min(e.clientY - dragOffsetY, window.innerHeight - 50));
      moveableObject.style.left = `${x}px`;
      moveableObject.style.top = `${y}px`;
      leaveTrail(x, y);
   }
});

document.addEventListener("mouseup", () => {
   if (isDragging) {
      isDragging = false;
      moveableObject.style.cursor = "grab";
   }
});

moveableObject.style.cursor = "grab";
//! --------- Change to "leaveTrail" to leave a trail instead of smoke ---------
function leaveTrail(x, y) {
   const trail = document.createElement("div");
   trail.className = "trail";
   trail.style.left = x + "px";
   trail.style.top = y + "px";
   // Random color!
   trail.style.background = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
   document.body.appendChild(trail);

   // Fade out after a short delay
   setTimeout(() => {
      trail.style.opacity = 0;
   }, 100); // Start fade after 100ms

   // Remove from DOM after fade (e.g. after 2s)
   setTimeout(() => {
      trail.remove();
   }, 1000);
}
