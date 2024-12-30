document.getElementById("sendBtn").addEventListener("click", function () {
  const numbersField = document.getElementById("numbers");
  const messageField = document.getElementById("message");
  const statusDiv = document.getElementById("status");

  // Get input values
  const numbers = numbersField.value.split(",");
  const message = messageField.value.trim();

  // Clear the status field
  statusDiv.textContent = "";

  // Validation
  if (!numbers || !message) {
    statusDiv.textContent = "Please enter both phone numbers and a message.";
    statusDiv.style.color = "red";
    return;
  }

  // Process each number
  numbers.forEach((number) => {
    const trimmedNumber = number.trim();

    // Check if the number is valid
    if (trimmedNumber && /^\+\d{10,15}$/.test(trimmedNumber)) {
      // Generate the WhatsApp Web URL
      const whatsappUrl = `https://wa.me/${trimmedNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Open the link in a new tab
      window.open(whatsappUrl, "_blank");
    } else {
      // Show error for invalid numbers
      const errorMsg = `Invalid number: ${trimmedNumber}`;
      const errorElement = document.createElement("div");
      errorElement.textContent = errorMsg;
      errorElement.style.color = "orange";
      statusDiv.appendChild(errorElement);
    }
  });

  // Success message
  const successMsg = "Messages sent! Check your WhatsApp.";
  const successElement = document.createElement("div");
  successElement.textContent = successMsg;
  successElement.style.color = "green";
  statusDiv.appendChild(successElement);
});
