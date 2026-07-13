import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer, CustomEase);

// Ease "buttery" compartido por todo el sitio (ver plan.md > Reveals transversales).
CustomEase.create("buttery", "0.16, 1, 0.3, 1");

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer, CustomEase };
