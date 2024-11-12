import React from "react";
import { applicationForm } from "../dummyForm";
import { StyleSheet, Text } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";

const styles = StyleSheet.create({
  page: { marginBottom: 2, textTransform: "capitalize", padding: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: {paddingVertical: 10, fontSize: 12, lineHeight:2.5 },
  section: { textAlign: "center", margin: 30 },
});

type ComplaintProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};


const Complaint: React.FC<ComplaintProps> = ({onPrevClick, onNextClick}) => {
  return (
    <div>
      {applicationForm.map((section) => {
        return (
          <div key={section.id} style={styles.page}>
            <div className="text-xl py-3">
              <Text style={ styles.title }>
                {section.complaints.title}
              </Text>
            </div>
            {section.complaints.description.map((list) => {
              return (
                <div key={list.id} className="text-lg flex justify-start" style={styles.description}>
                  <Text style={{ fontSize: 12 }}>{list.paragraph}</Text>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Complaint;
