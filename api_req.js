async function searchScribdLink() {
      const url_link = document.getElementById("placeInput").value.trim();
      if (!url_link) {
        alert("Please enter a Scribd link!");
        return;
      }

      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<p class="text-yellow-400">⏳ Fetching PDF...</p>`;

      try {
        const apiUrl = `https://5d43prcz-8000.asse.devtunnels.ms/pdf?url=${encodeURIComponent(url_link)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create status text (NOT clickable)
        const a = document.createElement("a");
        a.href = url;
        a.download = "scribd_document.pdf";
        a.textContent = "✅ PDF will download automatically...";
        a.className = "text-green-400 font-semibold text-lg";
        a.style.pointerEvents = "none"; // disable clicking
        a.style.textDecoration = "none"; // remove underline
        a.style.color = "#22c55e"; // force green color

        // ⭐ AUTO-DOWNLOAD
        setTimeout(() => {
          a.click();
          setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        }, 300);

      } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p class="text-red-400">❌ Failed to fetch PDF. Check your backend server.</p>`;
      }
    }