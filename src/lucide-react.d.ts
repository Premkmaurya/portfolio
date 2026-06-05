declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const Send: Icon;
  export const Mail: Icon;
  export const ArrowUpRight: Icon;
}
