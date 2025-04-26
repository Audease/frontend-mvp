import React, { useState } from 'react';
import { Upload, X, File, Image, Video } from 'lucide-react';

// Shared utility functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileTypeIcon = (fileType) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  if (fileType?.startsWith('image/')) return <Image className="h-6 w-6" />;
  if (fileType?.startsWith('video/')) return <Video className="h-6 w-6" />;
  return <File className="h-6 w-6" />;
};

// Configuration constants
const CLOUD_NAME = 'dymu3tehf';
const UPLOAD_PRESET = 'audease';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Accepted file types
const ACCEPTED_TYPES = {
  // Images
  'image/jpeg': 'Image',
  'image/png': 'Image',
  'image/gif': 'Image',
  'image/webp': 'Image',

  // Videos
  'video/mp4': 'Video',
  'video/quicktime': 'Video',
  'video/webm': 'Video',

  // PDFs
  'application/pdf': 'PDF',

  // Documents
  'application/msword': 'Document', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Document', 
  'application/wps-office.docx': 'Document', 
  'application/octet-stream': 'Document', 
  'application/zip': 'Document', 
};


// Step 1: File Selection Component
const FileSelectScreen = ({ onFileSelect, error }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="file"
          onChange={onFileSelect}
          className="hidden"
          id="fileInput"
          accept={Object.keys(ACCEPTED_TYPES).join(',')}
        />
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-dashboardButtons transition-colors"
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              Supported files: Images, Videos, Documents
            </p>
            <p className="text-xs text-gray-500">
              Max file size: {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>
        </label>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

// Step 2: Preview and Upload Component
const PreviewScreen = ({ file, preview, uploadProgress, loading, error, onCancel, onUpload }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">File Preview</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* File Info */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {getFileTypeIcon(file.type)}
        <div>
          <p>File: {file.name}</p>
          <p>Type: {ACCEPTED_TYPES[file.type]}</p>
          <p>Size: {formatFileSize(file.size)}</p>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative border rounded-lg overflow-hidden">
          {file.type.startsWith('image/') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
          ) : file.type.startsWith('video/') ? (
            <video
              src={preview}
              controls
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
              {getFileTypeIcon(file.type)}
              <span className="ml-2 text-gray-600">{file.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {(loading || uploadProgress > 0) && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 my-4">
          <div
            className="bg-dashboardButtons h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
          <p className="text-sm text-gray-600 mt-1 text-center">
            {uploadProgress}% uploaded
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-dashboardButtons hover:bg-tgrey1'
          }`}
      >
        {loading ? 'Uploading...' : 'Upload Document'}
      </button>
    </div>
  );
};

// Main container component
const CloudinaryUploader = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(1); // 1: Select, 2: Preview & Upload

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setUploadProgress(0);
    
    if (selectedFile) {
      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      if (!ACCEPTED_TYPES[selectedFile.type]) {
        setError('Unsupported file type');
        return;
      }

      setFile(selectedFile);
      
      // Create preview based on file type
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setStep(2); // Move to preview step
        };
        reader.readAsDataURL(selectedFile);
      } else if (selectedFile.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(selectedFile);
        setPreview(videoUrl);
        setStep(2); // Move to preview step
      } else {
        setPreview(''); // Clear preview for non-media files
        setStep(2); // Move to preview step even without visual preview
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`);

      // Track upload progress
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      };

      const response = await new Promise((resolve, reject) => {
        xhr.onload = () => {
         
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(new Error('Upload failed'));
          }
        };

        // console.log(response)
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });

      // Clean up any object URLs
      if (file.type.startsWith('video/')) {
        URL.revokeObjectURL(preview);
      }
      
      // Reset state after successful upload
      setTimeout(() => {
        setFile(null);
        setPreview('');
        setUploadProgress(0);
        setStep(1);
        
        // Notify parent component of completion
        if (onUploadComplete) {
          onUploadComplete(response);
        }
      }, 1000); // Brief delay to show 100% completion
      // console.log('Upload response:', response);
      return (response as { secure_url: string }).secure_url;
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      onUploadComplete("Failed to upload file. Please try again.");
      // console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (file?.type.startsWith('video/') && preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview('');
    setUploadProgress(0);
    setStep(1);
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow ">
      {step === 1 && (
        <FileSelectScreen 
          onFileSelect={handleFileChange} 
          error={error} 
        />
      )}
      
      {step === 2 && file && (
        <PreviewScreen 
          file={file}
          preview={preview}
          uploadProgress={uploadProgress}
          loading={loading}
          error={error}
          onCancel={handleCancel}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default CloudinaryUploader;