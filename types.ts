
export interface HardwareItem {
  category: string;
  name: string;
  description: string;
  highlight?: boolean;
  image: string;
}

export interface FeatureCardProps {
  image: string;
  tag: string;
  title: string;
  description: string;
  meta: string;
}
