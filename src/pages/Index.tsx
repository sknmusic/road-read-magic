import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { UploadSection, type PredictionResult } from "@/components/UploadSection";
import { PredictionResult as ResultDisplay } from "@/components/PredictionResult";
import { Categories } from "@/components/Categories";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrediction = (result: PredictionResult) => {
    setPredictionResult(result);
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <Categories />
      <div ref={uploadRef}>
        <UploadSection onPrediction={handlePrediction} />
      </div>
      {predictionResult && <ResultDisplay result={predictionResult} />}
    </div>
  );
};

export default Index;
