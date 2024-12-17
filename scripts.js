function checkPhishing() {
    const url = document.getElementById("urlInput").value.trim();
    const result = document.getElementById("result");

    if (!url) {
        result.textContent = "Please enter a URL.";
        return;
    }

    // Simple suspicious keyword list (expand as needed)
    const phishingKeywords = ["login", "verify", "secure", "update", "account", "confirm", "bank"];
    const urlLower = url.toLowerCase();

    // Check if URL contains suspicious keywords
    let isSuspicious = phishingKeywords.some(keyword => urlLower.includes(keyword));

    // Check for HTTP instead of HTTPS
    if (urlLower.startsWith("http://")) {
        isSuspicious = true;
    }

    if (isSuspicious) {
        result.textContent = "⚠️ Warning: This link may be a phishing link!";
        result.style.color = "red";
    } else {
        result.textContent = "✅ This link looks safe.";
        result.style.color = "green";
    }
}
