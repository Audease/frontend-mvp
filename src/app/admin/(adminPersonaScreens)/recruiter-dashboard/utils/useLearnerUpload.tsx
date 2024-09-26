import { useState } from 'react';
import axios from 'axios';

export const useLearnerImport = (randomFunction) => {
  const [fileName, setFileName] = useState("File Name");
  const [fileSelected, setFileSelected] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [uploadingError, setUploadingError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSelected(true);
      setIsFile(true);
      setUploadingError("");
    }
  };

  const onUploadClick = () => {
    if (!file) {
      setUploadingError("No file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setIsFile(false);
    setUploading(true);
    setUploadProgress(0);
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    setIsFile(false);
  
    if (!file) {
      console.error('No file provided');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
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

        setTimeout(() => {
          setUploaded(false);
          setUploading(false);
          setFile(null);
          setUploadProgress(0);
          setUploadingError("");
          randomFunction();
        }, 3000);
      } else {
        console.error('Upload failed:', response.status, response.data);
        setUploadingError(`Upload failed: ${response.status}`);
        setUploaded(false);
        setUploading(false);
      }
    } catch (error) {
      console.error('Error in uploadFile:', error);
      setUploadingError("Failed to upload the file. Please try again.");
      setUploaded(false);
      setUploading(false);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setFileName("File Name");
    setFileSelected(false);
    setUploadingError("");
    setUploading(false);
    setUploaded(false);
    setUploadProgress(0);
  };

  return {
    fileName,
    fileSelected,
    isFile,
    uploadingError,
    uploadProgress,
    uploaded,
    uploading,
    handleFileUpload,
    onUploadClick,
    handleFileRemove,
  };
};
