/// <reference types="react-scripts" />

// Declare modules for any image files
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Ensure interface exists to prevent errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 