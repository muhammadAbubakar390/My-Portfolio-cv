// DARK / LIGHT MODE
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = toggleBtn.querySelector("i");
  if (document.body.classList.contains("light")) {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
});

// SCROLL ANIMATION
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  revealOnScroll();

  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

revealOnScroll();

// CERTIFICATE MODAL
const modal = document.getElementById("cert-modal");
const modalViewer = document.getElementById("modal-viewer");
const closeModal = document.querySelector(".close-modal");
const modalContent = document.querySelector(".modal-content");

// Function to handle showing the certificate
document.querySelectorAll(".view-cert").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const certPath = btn.getAttribute("data-cert");

    // Clear existing viewer and create a new one based on the file type
    const isImage = certPath.toLowerCase().endsWith('.jpg') ||
                    certPath.toLowerCase().endsWith('.png') ||
                    certPath.toLowerCase().endsWith('.jpeg');

    if (isImage) {
      // Create an image element if it's an image
      modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <img id="modal-image" src="${certPath}" style="width:100%; height:100%; object-fit:contain; display:block; margin:auto;">
      `;
    } else {
      // Create an iframe for PDFs or other documents
      // Added #view=Fit to make PDFs fit the screen automatically
      const pdfPath = certPath + "#view=Fit&toolbar=0&navpanes=0&scrollbar=0";
      modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <iframe id="modal-viewer" src="${pdfPath}" style="width:100%; height:100%; border:none;"></iframe>
      `;
    }

    // Re-attach close event because the element was replaced
    document.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none";
      modalContent.innerHTML = ""; // Clear content to stop loading/performance
    });

    modal.style.display = "flex";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalContent.innerHTML = "";
  }
});

// =============================================
// EMAILJS — CONTACT FORM
// Replace the three strings below with your
// real EmailJS credentials (see setup steps).
// =============================================
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // e.g. "abc123XYZ"
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. "service_xxxxxx"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xxxxxx"

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";
    formStatus.style.display = "none";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(() => {
        formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
        formStatus.style.color = "#4ade80";
        formStatus.style.display = "block";
        contactForm.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        formStatus.textContent = "❌ Something went wrong. Please try again or email me directly.";
        formStatus.style.color = "#ff3b3b";
        formStatus.style.display = "block";
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Message";
      });
  });
}
