import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sparkles, Eye } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-10 text-center space-y-6">
          <div className="flex justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-dashboardButtons" />
          </div>

          <h1 className="text-4xl font-bold text-dashboardButtons bg-clip-text ">
            Coming Soon!
          </h1>

          <p className="text-slate-600 text-lg">
            We&apos;re working hard to bring you this exciting new feature.
          </p>

          <p className="text-slate-600">
            Stay tuned for updates and get ready to experience something amazing!
          </p>

          <div className="flex justify-center mt-8">
            <div className="w-full max-w-md bg-slate-200 rounded-full h-2">
              <div 
                className="bg-dashboardButtons h-2 rounded-full w-2/3 animate-pulse"
                role="progressbar"
                aria-valuenow={66}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="flex items-center justify-center text-2xl space-x-2 text-slate-700">
            <Eye className="w-6 h-6" />
            <span>Watch out for it!</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;