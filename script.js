document.getElementById("findLocation").addEventListener("click", () => {
  const ip = document.getElementById("ipInput").value;
  const resultDiv = document.getElementById("result");

  if (!ip) {
    resultDiv.innerHTML = "Please enter a valid IP address.";
    return;
  }

  // API URL
  const apiUrl = `https://ip-api.com/json/${ip}?fields=status,message,continent,country,regionName,city,zip,lat,lon,isp,query`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        resultDiv.innerHTML = `
          <p><strong>IP Address:</strong> ${data.query}</p>
          <p><strong>City:</strong> ${data.city}</p>
          <p><strong>Region:</strong> ${data.regionName}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>Continent:</strong> ${data.continent}</p>
          <p><strong>Latitude:</strong> ${data.lat}</p>
          <p><strong>Longitude:</strong> ${data.lon}</p>
          <p><strong>ZIP Code:</strong> ${data.zip}</p>
          <p><strong>ISP:</strong> ${data.isp}</p>
        `;
      } else {
        resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
      }
    })
    .catch((error) => {
      console.error(error);
      resultDiv.innerHTML = "Error retrieving data. Please try again later.";
    });
});
