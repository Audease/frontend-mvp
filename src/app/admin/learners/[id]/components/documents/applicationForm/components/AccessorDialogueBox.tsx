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

interface AccessorDialogueBoxProps {
  isOpen: boolean;
  onClose: () => void;
  approve: () => Promise<void>;
  reject: () => Promise<void>; 
}

export function AccessorDialogueBox({
  isOpen,
  onClose,
  approve,
  reject,
}: AccessorDialogueBoxProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve/Reject Application Form</AlertDialogTitle>
          <AlertDialogDescription>
            Kindly approve or reject the student&apos;s application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
             onClick={async () => {
              await reject(); 
              onClose(); 
            }}
            className="bg-red-600"
          >
            Reject
          </AlertDialogCancel>

          <AlertDialogAction
             onClick={async () => {
              await approve(); 
              onClose(); 
            }}
          >
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
