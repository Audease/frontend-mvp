const openFile = (fileUrl) => {
    if (!fileUrl) return;
  
    // Open a new blank tab first to bypass pop-up blockers
    const newTab = window.open("", "_blank", "noopener,noreferrer");
  
    if (newTab) {
      // Embed PDF directly if it's a PDF, otherwise navigate to the file URL
      if (fileUrl.endsWith(".pdf")) {
        newTab.document.write(`
          <html>
            <head><title>File Preview</title></head>
            <body style="margin:0;">
              <embed src="${fileUrl}" width="100%" height="100%" type="application/pdf"/>
            </body>
          </html>
        `);
        newTab.document.close();
      } else {
        // Redirect to the file URL for images and other file types
        newTab.location.href = fileUrl;
      }
    }
  };
  
  export default openFile;
  