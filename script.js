const moveableObject = document.querySelector("#moveable-object");
const rect = moveableObject.getBoundingClientRect();
let x = rect.left;
let y = rect.top;

document.addEventListener("keydown", (e) => {
   switch (e.key) {
      case "ArrowUp":
         y = Math.max(0, y - 25);
         moveableObject.style.top = `${y}px`;
         leaveSmoke(x, y); // Leave smoke when moving up
         break;
      case "ArrowDown":
         y = Math.min(window.innerHeight - 50, y + 25);
         moveableObject.style.top = `${y}px`;
         leaveSmoke(x, y); // Leave smoke when moving down
         break;
      case "ArrowLeft":
         x = Math.max(0, x - 25);
         moveableObject.style.left = `${x}px`;
         leaveSmoke(x, y); // Leave smoke when moving left
         break;
      case "ArrowRight":
         x = Math.min(window.innerWidth - 50, x + 25);
         moveableObject.style.left = `${x}px`;
         leaveSmoke(x, y); // Leave smoke when moving right
         break;
   }
});

document.addEventListener("click", (e) => {
   // Calculate max positions to keep the box inside the viewport
   const maxX = window.innerWidth - 50; // 50 = width of the object
   const maxY = window.innerHeight - 50; // 50 = height of the object

   // Clamp the positions
   let x = Math.max(0, Math.min(e.clientX - 25, maxX));
   let y = Math.max(0, Math.min(e.clientY - 25, maxY));

   moveableObject.style.left = `${x}px`;
   moveableObject.style.top = `${y}px`;
   leaveSmoke(x, y);
});
function leaveSmoke(x, y) {
   const smoke = document.createElement("div");
   smoke.className = "smoke";
   smoke.style.left = x + "px";
   smoke.style.top = y + "px";
   // Random color!
   smoke.style.background = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
   document.body.appendChild(smoke);

   // Fade out after a short delay
   setTimeout(() => {
      smoke.style.opacity = 0;
   }, 100); // Start fade after 100ms

   // Remove from DOM after fade (e.g. after 2s)
   setTimeout(() => {
      smoke.remove();
   }, 2000);
}
