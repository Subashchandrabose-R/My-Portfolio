document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
  });
});



const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

// Add close button if it doesn't exist
let closeBtn = document.querySelector(".close-btn");
if (!closeBtn) {
  closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  navLinks.prepend(closeBtn);
}

// Show menu
function toggleMenu(show) {
  if (show) {
    navLinks.classList.add("active");
    navOverlay.classList.add("active");
  } else {
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
  }
}

hamburger.addEventListener("click", () => toggleMenu(true));
closeBtn.addEventListener("click", () => toggleMenu(false));
navOverlay.addEventListener("click", () => toggleMenu(false));


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      console.log("Raw response:", response);

      if (!response.ok) {
        const errMsg = await response.text();
        console.error("Server error response:", errMsg);
        throw new Error("Server error: " + response.status);
      }

      const result = await response.json();
      messageBox.textContent = "✅ Message was successfully sent!";
      messageBox.style.color = "green";
      form.reset();
    } catch (err) {
      console.error("Fetch error:", err); // ✅ Shows exact reason
      messageBox.textContent = "❌ Something went wrong. Please try again.";
      messageBox.style.color = "red";
    }
  });
});