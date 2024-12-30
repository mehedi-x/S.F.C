document.getElementById("sendBtn").addEventListener("click", function () {
  const numbers = document.getElementById("numbers").value.split(",");
  const message = document.getElementById("message").value;
  const statusDiv = document.getElementById("status");

  if (!numbers || !message) {
    statusDiv.textContent = "Please fill in both fields.";
    statusDiv.style.color = "red";
    return;
  }

  numbers.forEach((number) => {
    const formattedNumber = number.trim();
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });

  statusDiv.textContent = "Messages sent! Please check your WhatsApp.";
  statusDiv.style.color = "green";
});
