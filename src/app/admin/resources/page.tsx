'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Folder {
  id: string;
  name: string;
  documents: Document[];
}

interface Document {
  id: string;
  name: string;
  content: string; 
  type: string;
}

const Resources: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Load folders from localStorage on component mount
  useEffect(() => {
    const storedFolders = localStorage.getItem('documentFolders');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, []);

  // Save folders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('documentFolders', JSON.stringify(folders));
  }, [folders]);

  const createFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      documents: []
    };

    setFolders([...folders, newFolder]);
    setNewFolderName('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedFolder) return;

    // Read file as base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const document: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        content: e.target?.result as string,
        type: file.type
      };

      // Update folders state
      const updatedFolders = folders.map(folder => 
        folder.id === selectedFolder 
          ? { ...folder, documents: [...folder.documents, document] }
          : folder
      );

      setFolders(updatedFolders);
    };

    reader.readAsDataURL(file);
  };

  const deleteDocument = (folderId: string, documentId: string) => {
    const updatedFolders = folders.map(folder => 
      folder.id === folderId 
        ? { 
            ...folder, 
            documents: folder.documents.filter(doc => doc.id !== documentId) 
          }
        : folder
    );

    setFolders(updatedFolders);
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        <Input 
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
        />
        <Button onClick={createFolder}>
          Create Folder
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Folder List */}
        <div className="border p-2">
          <h2 className="font-bold mb-2">Folders</h2>
          {folders.map(folder => (
            <div 
              key={folder.id}
              className={`
                p-2 mb-1 flex justify-between items-center
                cursor-pointer 
                ${selectedFolder === folder.id ? 'bg-blue-100' : 'hover:bg-gray-100'}
              `}
            >
              <span onClick={() => setSelectedFolder(folder.id)}>
                {folder.name} ({folder.documents.length} files)
              </span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteFolder(folder.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Document List */}
        <div className="border p-2">
          <h2 className="font-bold mb-2">
            {selectedFolder 
              ? `Documents in ${folders.find(f => f.id === selectedFolder)?.name}` 
              : 'Select a Folder'}
          </h2>
          
          {selectedFolder && (
            <>
              <Input 
                type="file" 
                onChange={handleFileUpload}
                className="mb-2"
              />

              {folders
                .find(f => f.id === selectedFolder)
                ?.documents.map(doc => (
                  <div 
                    key={doc.id} 
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <div>
                      {doc.name} 
                      <a 
                        href={doc.content}
                        download={doc.name}
                        className="text-blue-500 ml-2"
                      >
                        Download
                      </a>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteDocument(selectedFolder, doc.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;