import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";

  
  interface FinalSubmissionAlertProps {
    isOpen: boolean; 
    onClose: () => void; 
    handleSubmit: () => void; 
  }
  
  export function FinalSubmissionAlert({
    isOpen,
    onClose,
    handleSubmit,
  }: FinalSubmissionAlertProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Your Form</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this form? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  