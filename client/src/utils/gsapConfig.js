// Basic GSAP config file
// You can customize this as needed for your animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const defaultGsapConfig = {
  duration: 1,
  ease: "power2.out",
};

export { gsap, ScrollTrigger };
export default gsap;
