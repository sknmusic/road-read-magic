import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UploadSectionProps {
  onPrediction: (result: PredictionResult) => void;
}

export interface PredictionResult {
  sign_type: string;
  category: string;
  confidence: number;
  description: string;
}

export const UploadSection = ({ onPrediction }: UploadSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-traffic-sign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ image: selectedImage }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Prediction failed");
      }

      const result = await response.json();
      onPrediction(result);
      toast.success("Traffic sign identified!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container px-4 py-12">
      <Card className="mx-auto max-w-2xl p-8 shadow-elegant">
        <h2 className="mb-6 text-center text-3xl font-bold">Upload Traffic Sign</h2>
        
        <div className="space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-all hover:border-primary hover:bg-muted/50"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-[300px] rounded-lg object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <ImageIcon className="h-16 w-16 transition-transform group-hover:scale-110" />
                <p className="text-center text-sm">
                  Click to upload or drag and drop
                  <br />
                  <span className="text-xs">PNG, JPG up to 5MB</span>
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          <Button
            onClick={handlePredict}
            disabled={!selectedImage || isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Predict Sign
              </>
            )}
          </Button>
        </div>
      </Card>
    </section>
  );
};
