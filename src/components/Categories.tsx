import { Card } from "@/components/ui/card";
import { AlertTriangle, StopCircle, Info } from "lucide-react";

const categories = [
  {
    icon: AlertTriangle,
    title: "Warning Signs",
    description: "Alert drivers to potential hazards ahead",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: StopCircle,
    title: "Regulatory Signs",
    description: "Indicate traffic laws and regulations",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Info,
    title: "Informational Signs",
    description: "Provide helpful information to drivers",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

export const Categories = () => {
  return (
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
  );
};
