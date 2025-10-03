import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import type { PredictionResult as Result } from "./UploadSection";

interface PredictionResultProps {
  result: Result;
}

export const PredictionResult = ({ result }: PredictionResultProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "regulatory":
        return <CheckCircle2 className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <section className="container px-4 py-12">
      <Card className="mx-auto max-w-2xl p-8 shadow-elegant animate-fade-in">
        <h2 className="mb-6 text-center text-3xl font-bold">Prediction Results</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              {getCategoryIcon(result.category)}
              <div>
                <p className="text-sm text-muted-foreground">Sign Type</p>
                <p className="text-xl font-semibold">{result.sign_type}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg">
              {result.category}
            </Badge>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="mb-2 text-sm text-muted-foreground">Confidence Score</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>
              <span className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                {result.confidence}%
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="mb-2 text-sm text-muted-foreground">Description</p>
            <p className="text-foreground">{result.description}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};
