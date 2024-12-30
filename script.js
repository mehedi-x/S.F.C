document.getElementById("findLocation").addEventListener("click", () => {
  const ip = document.getElementById("ipInput").value;
  const resultDiv = document.getElementById("result");

  if (!ip) {
    resultDiv.innerHTML = "Please enter a valid IP address.";
    return;
  }

  fetch(`https://ip-api.com/json/${ip}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        resultDiv.innerHTML = `
          <p><strong>IP Address:</strong> ${data.query}</p>
          <p><strong>City:</strong> ${data.city}</p>
          <p><strong>Region:</strong> ${data.regionName}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>ISP:</strong> ${data.isp}</p>
        `;
      } else {
        resultDiv.innerHTML = "Invalid IP address or data not found.";
      }
    })
    .catch((error) => {
      console.error(error);
      resultDiv.innerHTML = "Error retrieving data. Please try again later.";
    });
});
