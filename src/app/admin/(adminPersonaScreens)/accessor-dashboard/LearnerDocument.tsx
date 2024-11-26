import React from "react";
import UserDetailsDocuments from "../../learners/[id]/components/documents/userDetailsDocuments";

type Props = {
  userId: string;
};

const LearnerDocument = ({ userId }: Props) => {
  return (
    <div>
      <UserDetailsDocuments userId={userId} />
    </div>
  );
};

export default LearnerDocument;
