import { Card } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export type InfoCardProps = {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  number: string;
  description: string[];
};
export const InfoCard: React.FC<InfoCardProps> = (props) => {
  return (
    <Card className="makcu-proof-card">
      <div className="makcu-proof-card-header">
        {props.Icon && <span><props.Icon /></span>}
        {props.title && <div>{props.title}</div>}
      </div>
      <div className="makcu-proof-card-body">
        <strong>{props.number}</strong>
        <ul>
          {props.description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default InfoCard;
