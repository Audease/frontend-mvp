"use client";

import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

const DocView = ({ onBackClick }) => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/lib",
        licenseKey:
          "demo:1728336135511:7e0822ba0300000000124c8de53f6ded5a04a00fe79b444c43ab075380",
        initialDoc: "/file/FormSample.pdf",
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager } = instance.Core;

      // Function to trigger PDF download
      const downloadPDF = async () => {
        const doc = documentViewer.getDocument();
        const xfdfString = await annotationManager.exportAnnotations(); 
        const data = await doc.getFileData({
          // Merges annotations into the PDF
          xfdfString,
        });
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });

        // Create a link to download the PDF
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "annotated-document.pdf";
        link.click(); // Programmatically click the link to trigger the download
      };

      // Attach the download function to the Submit Doc button
      document
        .getElementById("submit-btn")
        .addEventListener("click", downloadPDF);
    });
  }, []);

  return (
    <div>
      <button onClick={onBackClick}>Back</button>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
};

export default DocView;
