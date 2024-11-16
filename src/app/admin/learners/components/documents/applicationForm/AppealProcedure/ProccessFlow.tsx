import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import { appealData } from './data/AppealProcedure';

const AppealsFlow = () => {


  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      {appealData.diagram.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className="flex justify-center">
            <Card className={`w-96 ${item.bgColor}`}>
              <CardHeader className="text-center font-bold">
                {item.title}
              </CardHeader>
              <CardContent className="text-sm">
                <div className="text-center whitespace-pre-line">
                  {item.text}
                  {item.subText && (
                    <div className="mt-2 text-xs italic">
                      {item.subText}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {index < appealData.diagram.length - 1 && (
            <div className="flex justify-center">
              <ArrowDown className="text-gray-500" size={24} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AppealsFlow;