import { useState } from 'react';

export const useFormNavigation = (formComponents: string[]) => {
  const [formContent, setFormContent] = useState('Appeal');
  const [sectionNumber, setSectionNumber] = useState(1);
  const totalSectionNumber = formComponents.length;
  const [ShowDialog, setShowDialog] = useState(false)

  const goToNextSection = () => {
    if (sectionNumber >= totalSectionNumber - 3) {
      setShowDialog(true);
    } else {
      setSectionNumber((prev) => {
        const nextSection = Math.min(prev + 1, totalSectionNumber);
        setFormContent(formComponents[nextSection - 1] || "Appeal");
        return nextSection;
      });
    }
    
  };

  const goToPreviousSection = () => {
    setSectionNumber((prev) => {
      const prevSection = Math.max(prev - 1, 1);
      setFormContent(formComponents[prevSection - 1] || 'Appeal');
      return prevSection;
    });
  };

  const goToSpecificSection = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalSectionNumber) {
      setSectionNumber(pageNumber);
      setFormContent(formComponents[pageNumber - 1] || 'Appeal');
    }
  };

  return {
    formContent,
    sectionNumber,
    totalSectionNumber,
    setShowDialog,
    ShowDialog,
    goToNextSection,
    goToPreviousSection,
    goToSpecificSection,
    setFormContent,
  };
};