declare module 'hover-effect' {
    import * as THREE from 'three';
  
    interface HoverEffectOptions {
      parent: HTMLElement;
      intensity: number;
      imagesRatio?: number;
      image1: string;
      image2: string;
      displacementImage: string;
      speedIn?: number;
      speedOut?: number;
      hover?: boolean;
      easing?: string;
      video?: boolean;
      intensity1?: number;
      intensity2?: number;
      angle?: number;
      angle1?: number;
      angle2?: number;
    }
  
    class HoverEffect {
      constructor(options: HoverEffectOptions);
      next(): void;
      previous(): void;
      dispose(): void;
    }
  
    export default HoverEffect;
  }
  