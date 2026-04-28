const toggleDetailsBtn = document.getElementById("toggleDetails");
const tenderDetails = document.getElementById("tenderDetails");

if (toggleDetailsBtn && tenderDetails) {
  toggleDetailsBtn.addEventListener("click", () => {
    const isHidden = tenderDetails.hasAttribute("hidden");
    if (isHidden) {
      tenderDetails.removeAttribute("hidden");
      toggleDetailsBtn.textContent = "Ocultar detalles";
      toggleDetailsBtn.setAttribute("aria-expanded", "true");
      return;
    }

    tenderDetails.setAttribute("hidden", "");
    toggleDetailsBtn.textContent = "Ver mas detalles";
    toggleDetailsBtn.setAttribute("aria-expanded", "false");
  });
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const sendEmailBtn = document.getElementById("sendEmailBtn");

function showMessage(message, type) {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.classList.remove("error", "success");
  formMessage.classList.add(type);
}

function sanitizePhone(value) {
  return value.replace(/\s+/g, "").trim();
}

function buildWhatsAppText({ nombre, apellido, correo, telefono, mensaje }) {
  return [
    "Hola DATA LAB SA, les comparto mis datos:",
    `Nombre: ${nombre}`,
    `Apellido: ${apellido}`,
    `Correo: ${correo}`,
    `Telefono: ${telefono}`,
    `Mensaje: ${mensaje}`
  ].join("\n");
}

function buildEmailText({ nombre, apellido, correo, telefono, mensaje }) {
  return [
    "Hola DATA LAB SA,",
    "",
    "Comparto mis datos para contacto:",
    `Nombre: ${nombre}`,
    `Apellido: ${apellido}`,
    `Correo: ${correo}`,
    `Telefono: ${telefono}`,
    `Mensaje: ${mensaje}`
  ].join("\n");
}

function getFormValues() {
  return {
    nombre: document.getElementById("nombre")?.value.trim() || "",
    apellido: document.getElementById("apellido")?.value.trim() || "",
    correo: document.getElementById("correo")?.value.trim() || "",
    telefono: sanitizePhone(document.getElementById("telefono")?.value || ""),
    mensaje: document.getElementById("mensaje")?.value.trim() || ""
  };
}

function validateFormValues({ nombre, apellido, correo, telefono, mensaje }) {
  if (!nombre || !apellido || !correo || !telefono || !mensaje) {
    showMessage("Completa todos los campos del formulario.", "error");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(correo)) {
    showMessage("Ingresa un correo valido.", "error");
    return false;
  }

  if (telefono.length < 8) {
    showMessage("Ingresa un numero telefonico valido.", "error");
    return false;
  }

  return true;
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formValues = getFormValues();
    if (!validateFormValues(formValues)) {
      return;
    }

    const text = buildWhatsAppText(formValues);
    const url = `https://wa.me/595983159658?text=${encodeURIComponent(text)}`;

    showMessage("Abriendo WhatsApp con tu mensaje...", "success");
    window.open(url, "_blank", "noopener,noreferrer");
    contactForm.reset();
  });
}

if (sendEmailBtn) {
  sendEmailBtn.addEventListener("click", () => {
    const formValues = getFormValues();
    if (!validateFormValues(formValues)) {
      return;
    }

    const subject = "Contacto desde la web de DATA LAB SA";
    const body = buildEmailText(formValues);
    const mailtoUrl = `mailto:pierscotto000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showMessage("Abriendo cliente de correo...", "success");
    window.location.href = mailtoUrl;
  });
}
