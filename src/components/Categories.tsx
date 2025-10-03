import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, StopCircle, Info } from "lucide-react";
import { CategoryModal } from "./CategoryModal";
import warningCurve from "@/assets/examples/warning-curve.jpg";
import warningPedestrian from "@/assets/examples/warning-pedestrian.jpg";
import warningSlippery from "@/assets/examples/warning-slippery.jpg";
import regulatoryStop from "@/assets/examples/regulatory-stop.jpg";
import regulatoryNoEntry from "@/assets/examples/regulatory-noentry.jpg";
import regulatorySpeed from "@/assets/examples/regulatory-speed.jpg";
import infoDirection from "@/assets/examples/info-direction.jpg";
import infoHospital from "@/assets/examples/info-hospital.jpg";
import infoParking from "@/assets/examples/info-parking.jpg";

const categories = [
  {
    icon: AlertTriangle,
    title: "Warning Signs",
    description: "Alert drivers to potential hazards ahead",
    detailedInfo: "Warning signs are typically yellow or orange with black symbols and borders. They're designed to alert drivers to potential hazards, dangerous conditions, or changes in road conditions ahead. These signs give you time to slow down, increase alertness, and prepare for the situation. Common examples include curves, intersections, pedestrian crossings, and adverse weather conditions.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    examples: [
      { image: warningCurve, label: "Curve Ahead" },
      { image: warningPedestrian, label: "Pedestrian Crossing" },
      { image: warningSlippery, label: "Slippery Road" },
    ],
  },
  {
    icon: StopCircle,
    title: "Regulatory Signs",
    description: "Indicate traffic laws and regulations",
    detailedInfo: "Regulatory signs are typically white, black, or red and inform drivers of traffic laws and regulations that must be obeyed. These signs tell you what you must do, what you must not do, and what restrictions apply. Failure to follow regulatory signs can result in traffic violations and fines. They include stop signs, speed limits, no entry signs, and lane usage indicators.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    examples: [
      { image: regulatoryStop, label: "Stop Sign" },
      { image: regulatoryNoEntry, label: "No Entry" },
      { image: regulatorySpeed, label: "Speed Limit" },
    ],
  },
  {
    icon: Info,
    title: "Informational Signs",
    description: "Provide helpful information to drivers",
    detailedInfo: "Informational signs are typically blue, green, or brown and provide useful information to drivers. They don't require specific actions but help with navigation and locating services. These signs include directional information, distance markers, points of interest, and available services like hospitals, parking, rest areas, and tourist attractions.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    examples: [
      { image: infoDirection, label: "Highway Direction" },
      { image: infoHospital, label: "Hospital" },
      { image: infoParking, label: "Parking" },
    ],
  },
];

interface CategoriesProps {
  onScrollToUpload?: () => void;
}

export const Categories = ({ onScrollToUpload }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  return (
    <>
      <section className="container px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Sign Categories</h2>
          <p className="text-xl text-muted-foreground">
            Our AI can identify three main types of traffic signs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="group cursor-pointer p-6 transition-all hover:shadow-elegant"
                onClick={() => setSelectedCategory(category)}
              >
                <div className={`mb-4 inline-block rounded-lg ${category.bgColor} p-3`}>
                  <Icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {selectedCategory && (
        <CategoryModal
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          title={selectedCategory.title}
          description={selectedCategory.description}
          detailedInfo={selectedCategory.detailedInfo}
          examples={selectedCategory.examples}
          icon={selectedCategory.icon}
          color={selectedCategory.color}
          onScrollToUpload={onScrollToUpload || (() => {})}
        />
      )}
    </>
  );
};
