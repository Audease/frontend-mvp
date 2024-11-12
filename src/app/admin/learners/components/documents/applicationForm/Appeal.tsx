import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { applicationForm } from "../dummyForm";
import { Button } from "@/components/ui/button";

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize", padding: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: {paddingVertical: 10, fontSize: 12, lineHeight:2.5 },
  list: {paddingVertical: 5, fontSize: 12, lineHeight:2.5 },
  section: { textAlign: "center", margin: 30 },
});

type AppealProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const Appeal: React.FC<AppealProps> = ({ onNextClick,onPrevClick }) => {
  return (
    <div>
      {applicationForm.map((section) => (
        <div key={section.id} style={styles.page}>
          <div className="text-xl py-3">
            <Text style={styles.title}>
              {section.appeal.title}
            </Text>
          </div>
          <div className="text-lg flex justify-start">
            <Text style={styles.description}>
              {section.appeal.description}
            </Text>
          </div>
          <div className="text-lg flex flex-col justify-start">
            {section.appeal.diagram.map((list) => (
              <li key={list.id} style={styles.list}>
                <span className="font-bold"><Text style={{ fontSize: 12 }}>{list.title}</Text></span>
                <Text style={{ fontSize: 12 }}>{list.text}</Text>
              </li>
            ))}
          </div>
        </div>
      ))}
       <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Appeal;

