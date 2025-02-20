import { Button } from '@/components/ui/button';
import React from 'react';
import { FiUploadCloud } from "react-icons/fi";


type Props = {
  onUploadClick: () => void; 
};

const UploadFileBtn = ({ onUploadClick }: Props) => {
  return (
    <div>
      <Button
        onClick={onUploadClick}
        className="flex items-center text-center justify-center font-normal text-sm px-4 py-2 bg-dashboardButtons/10 text-dashboardButtons rounded hover:bg-tgrey5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 border-dashed border border-dashboardButtons"
      >
        <FiUploadCloud className="mr-2 text-dashboardButtons" /> 
        Upload File
      </Button>
    </div>
  );
};

export default UploadFileBtn;