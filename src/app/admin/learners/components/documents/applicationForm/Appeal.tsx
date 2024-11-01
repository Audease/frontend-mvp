import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { applicationForm } from "../dummyForm";
import { Button } from "@/components/ui/button";

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize" },
  section: { textAlign: "center", margin: 30 },
});

type AppealProps = {
  onNextClick?: () => void;
};

const Appeal: React.FC<AppealProps> = ({ onNextClick }) => {
  return (
    <div>
      {applicationForm.map((section) => (
        <div key={section.id} style={styles.page}>
          <div className="text-xl">
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {section.appeal.title}
            </Text>
          </div>
          <div className="text-lg">
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              {section.appeal.description}
            </Text>
          </div>
          <div className="text-lg">
            {section.appeal.diagram.map((list) => (
              <div key={list.id} style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12 }}>{list.title}</Text>
                <Text style={{ fontSize: 10, marginLeft: 5 }}>{list.text}</Text>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={onNextClick}>Proceed</Button>
    </div>
  );
};

export default Appeal;

