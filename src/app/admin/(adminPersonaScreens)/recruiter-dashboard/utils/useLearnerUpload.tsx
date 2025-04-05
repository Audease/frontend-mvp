import { useState, useCallback } from 'react';
import axios from 'axios';

export const useLearnerImport = (randomFunction) => {
  const [fileName, setFileName] = useState("File Name");
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadingError, setUploadingError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  // Create a reusable function for clearing error messages
  const clearError = useCallback(() => {
    setUploadingError("");
  }, []);

  // Create a function to reset all states
  const resetStates = useCallback(() => {
    setUploaded(false);
    setUploading(false);
    setFile(null);
    setFileName("File Name");
    setFileSelected(false);
    setUploadProgress(0);
    setUploadingError("");
  }, []);

  const handleFileUpload = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSelected(true);
      clearError();
    }
  }, [clearError]);

  const handleFileRemove = useCallback(() => {
    resetStates();
  }, [resetStates]);

  const onUploadClick = useCallback(() => {
    if (!file) {
      setUploadingError("No file selected for upload.");
      setTimeout(clearError, 5000);
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append("file", file);
    
    uploadFile(formData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, clearError]);

  const uploadFile = async (formData) => {
    try {
      setUploading(true);
      const response = await axios.post("/api/uploadLearners", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      

      if (response.status === 201) {
        setUploaded(true);
        setUploading(false);
        setUploadProgress(100);

        // After successful upload, reset the form and call the callback
        setTimeout(() => {
          resetStates();
          randomFunction();
        }, 3000);
      } else {
        setUploadingError(`Upload failed: ${response.data.message.message || 'Unknown error'}`);
        setTimeout(clearError, 15000);
        setFile(null);
        setFileName("File Name");
        setUploaded(false);
        setUploading(false);
      }
    } catch (error) {
      setUploadingError(error.response.data.message.message || "Failed to upload the file. Please try again.");
      setTimeout(clearError, 15000);
      setUploaded(false);
      setUploading(false);
      setFile(null);
    }
  };

  return {
    file,
    fileName,
    fileSelected,
    uploadingError,
    uploadProgress,
    uploaded,
    uploading,
    handleFileUpload,
    onUploadClick,
    handleFileRemove,
  };
};