import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, type LucideIcon } from "lucide-react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  detailedInfo: string;
  examples: { image: string; label: string }[];
  icon: LucideIcon;
  color: string;
  onScrollToUpload: () => void;
}

export const CategoryModal = ({
  isOpen,
  onClose,
  title,
  description,
  detailedInfo,
  examples,
  icon: Icon,
  color,
  onScrollToUpload,
}: CategoryModalProps) => {
  const handleUploadClick = () => {
    onClose();
    setTimeout(() => onScrollToUpload(), 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="font-semibold mb-2">About {title}</h3>
            <p className="text-muted-foreground">{detailedInfo}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Example Signs</h3>
            <div className="grid grid-cols-3 gap-4">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all"
                >
                  <div className="aspect-square">
                    <img
                      src={example.image}
                      alt={example.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-sm text-white font-medium">{example.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleUploadClick}
            className="w-full"
            size="lg"
          >
            <Upload className="mr-2 h-5 w-5" />
            Try Identifying Your Sign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
