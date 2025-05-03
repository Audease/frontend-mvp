import { AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@radix-ui/react-dialog"

export function AccessorRejectDialog({ isOpen, onOpenChange, onReject }) {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReject = () => {
    onReject(rejectionReason);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Reject Access Request
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="rejectionReason" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Reason for Rejection
                </Label>
                <Input
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full"
                  placeholder="Please provide a reason..."
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleReject}
                  className="bg-red-600 hover:bg-red-700 text-black"
                >
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}