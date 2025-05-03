import { useState, useRef, useEffect } from 'react';

// Component now accepts initialValue prop to display existing signatures
export default function SignaturePad({ onSignatureChange, initialValue }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Initial setup of canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set up line style
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
  }, []);
  
  // Handle displaying the initial value when component mounts or initialValue changes
  useEffect(() => {
    if (initialValue) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create an image to draw the saved signature
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialValue;
    }
  }, [initialValue]);
  
  // After any drawing action, update the parent form
  const updateSignatureData = () => {
    const canvas = canvasRef.current;
    // Convert canvas to data URL (base64 encoded PNG)
    const signatureData = canvas.toDataURL('image/png');
    // Pass signature data to parent component/form
    onSignatureChange(signatureData);
  };
  
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      updateSignatureData();
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSignatureData();
  };
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Signature Pad</h2>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border-2 border-black bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        className="mt-4 px-4 py-2 text-base cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
      >
        Clear Signature
      </button>
    </div>
  );
}