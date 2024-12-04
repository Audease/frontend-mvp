// components/DocView/DialogRender.tsx
import React from "react";
import { FinalSubmissionAlert } from "../applicationForm/components/DialogueBox";
import { AccessorDialogueBox } from "../applicationForm/components/AccessorDialogueBox";

interface DialogRenderProps {
  useRole: string;
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  handleSubmit: () => void;
  accessorApprove: () => Promise<void>;
  accessorReject: () => Promise<void>;
}

const DialogRender: React.FC<DialogRenderProps> = ({
  useRole,
  showDialog,
  setShowDialog,
  handleSubmit,
  accessorApprove,
  accessorReject,
}) => (
  <>
    {useRole !== "Admin" && showDialog && (
      useRole === "accessor" ? (
        <AccessorDialogueBox
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          approve={accessorApprove}
          reject={accessorReject}
        />
      ) : (
        <FinalSubmissionAlert
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          handleSubmit={handleSubmit}
        />
      )
    )}
  </>
);

export default DialogRender;
