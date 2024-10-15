"use client";

import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

const DocView = ({ onBackClick }) => {
  const viewer = useRef(null); // DOM element for WebViewer
  const instanceRef = useRef(null); // WebViewer instance reference

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
      instanceRef.current = instance; // Store WebViewer instance

      const { documentViewer, annotationManager } = instance.Core;

      // Define the download function within the instance
      instanceRef.current.downloadPDF = async () => {
        const doc = documentViewer.getDocument();
        const xfdfString = await annotationManager.exportAnnotations();
        const data = await doc.getFileData({
          xfdfString, // Merge annotations into the PDF
        });
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });

        // Create a link to download the PDF
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "annotated-document.pdf";
        link.click(); // Trigger the download
      };
    });
  }, []);

  return (
    <div>
      <button onClick={onBackClick}>Back</button>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
      {/* Trigger the download function using the WebViewer instance stored in instanceRef */}
      <button id="submit-btn" onClick={() => instanceRef.current?.downloadPDF()}>
        Submit Doc
      </button>
    </div>
  );
};

export default DocView;
