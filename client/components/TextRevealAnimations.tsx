import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

// Note: SplitText is a premium GSAP plugin, so we'll implement our own text splitting
const splitTextIntoSpans = (
  element: HTMLElement,
  splitBy: "chars" | "words" | "lines" = "words",
) => {
  const text = element.textContent || "";

  if (splitBy === "chars") {
    element.innerHTML = text
      .split("")
      .map(
        (char) =>
          `<span class="char-reveal" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");
  } else if (splitBy === "words") {
    element.innerHTML = text
      .split(" ")
      .map(
        (word) =>
          `<span class="word-reveal" style="display: inline-block; overflow: hidden; vertical-align: top;"><span style="display: inline-block;">${word}</span></span>`,
      )
      .join(" ");
  } else if (splitBy === "lines") {
    const words = text.split(" ");
    element.innerHTML = words
      .map(
        (word) =>
          `<span class="line-reveal" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`,
      )
      .join(" ");
  }
};

export default function TextRevealAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initTextAnimations = () => {
      // 1. Heading Reveal Animations (h1, h2, h3, h4, h5, h6)
      const headingSelectors = ["h1", "h2", "h3", "h4", "h5", "h6"];

      headingSelectors.forEach((selector) => {
        gsap.utils.toArray(selector).forEach((heading: any) => {
          // Skip if already processed or has specific class to avoid
          if (
            heading.classList.contains("no-reveal") ||
            heading.querySelector(".word-reveal")
          )
            return;

          splitTextIntoSpans(heading, "words");

          gsap.fromTo(
            heading.querySelectorAll(".word-reveal span"),
            {
              y: 100,
              opacity: 0,
              skewY: 10,
              scale: 0.8,
            },
            {
              y: 0,
              opacity: 1,
              skewY: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      // 2. Paragraph Text Reveals
      gsap.utils.toArray("p").forEach((paragraph: any) => {
        if (
          paragraph.classList.contains("no-reveal") ||
          paragraph.querySelector(".word-reveal") ||
          paragraph.closest(".lightbox") ||
          paragraph.closest(".cursor-info")
        )
          return;

        splitTextIntoSpans(paragraph, "words");

        gsap.fromTo(
          paragraph.querySelectorAll(".word-reveal span"),
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // 3. Special Text Animations for Different Elements

      // Hero Title Animation (Large Impact)
      gsap.utils.toArray(".hero-title").forEach((title: any) => {
        if (title.querySelector(".char-reveal")) return;

        splitTextIntoSpans(title, "chars");

        gsap.fromTo(
          title.querySelectorAll(".char-reveal"),
          {
            y: 200,
            opacity: 0,
            rotationX: -90,
            scale: 0,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "back.out(1.7)",
            delay: 0.5,
          },
        );
      });

      // Section Titles (Medium Impact)
      gsap.utils.toArray(".section-title").forEach((title: any) => {
        if (title.querySelector(".word-reveal")) return;

        splitTextIntoSpans(title, "words");

        gsap.fromTo(
          title.querySelectorAll(".word-reveal span"),
          {
            y: 50,
            opacity: 0,
            rotationY: 45,
            z: -100,
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            z: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Card Titles (Subtle Animation)
      gsap.utils.toArray(".card-title").forEach((title: any) => {
        if (title.querySelector(".word-reveal")) return;

        splitTextIntoSpans(title, "words");

        gsap.fromTo(
          title.querySelectorAll(".word-reveal span"),
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Typewriter Effect for Special Text
      gsap.utils.toArray(".typewriter-text").forEach((element: any) => {
        const text = element.textContent;
        element.textContent = "";

        let cursor = document.createElement("span");
        cursor.textContent = "|";
        cursor.style.opacity = "1";
        cursor.style.animation = "blink 1s infinite";
        element.appendChild(cursor);

        gsap.to(
          {},
          {
            duration: text.length * 0.08,
            ease: "none",
            onUpdate: function () {
              const progress = this.progress();
              const currentLength = Math.floor(progress * text.length);
              element.textContent = text.slice(0, currentLength);
              element.appendChild(cursor);
            },
            onComplete: () => {
              cursor.remove();
            },
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      // Glitch Text Effect
      gsap.utils.toArray(".glitch-text").forEach((element: any) => {
        const text = element.textContent;

        // Create glitch layers
        const glitchLayer1 = element.cloneNode(true);
        const glitchLayer2 = element.cloneNode(true);

        glitchLayer1.style.position = "absolute";
        glitchLayer1.style.left = "2px";
        glitchLayer1.style.color = "#ff0000";
        glitchLayer1.style.opacity = "0.8";
        glitchLayer1.style.clipPath = "inset(0 0 0 0)";

        glitchLayer2.style.position = "absolute";
        glitchLayer2.style.left = "-2px";
        glitchLayer2.style.color = "#00ffff";
        glitchLayer2.style.opacity = "0.8";
        glitchLayer2.style.clipPath = "inset(0 0 0 0)";

        element.style.position = "relative";
        element.appendChild(glitchLayer1);
        element.appendChild(glitchLayer2);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        timeline
          .set([glitchLayer1, glitchLayer2], { opacity: 0 })
          .to(element, {
            duration: 0.1,
            skewX: 10,
            repeat: 3,
            yoyo: true,
          })
          .to(
            [glitchLayer1, glitchLayer2],
            {
              duration: 0.1,
              opacity: 0.8,
              x: () => Math.random() * 10 - 5,
              repeat: 5,
              yoyo: true,
            },
            0,
          )
          .to(element, { skewX: 0, duration: 0.1 });
      });

      // Gradient Text Reveal
      gsap.utils.toArray(".gradient-reveal").forEach((element: any) => {
        const text = element.textContent;
        splitTextIntoSpans(element, "chars");

        gsap.set(element.querySelectorAll(".char-reveal"), {
          background: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          color: "transparent",
          backgroundSize: "300% 300%",
          backgroundPosition: "100% 0%",
        });

        gsap.fromTo(
          element.querySelectorAll(".char-reveal"),
          {
            opacity: 0,
            scale: 0,
            rotationY: 180,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              gsap.to(element.querySelectorAll(".char-reveal"), {
                backgroundPosition: "0% 0%",
                duration: 2,
                ease: "power2.inOut",
                stagger: 0.1,
              });
            },
          },
        );
      });

      // 3D Flip Text Animation
      gsap.utils.toArray(".flip-3d-text").forEach((element: any) => {
        splitTextIntoSpans(element, "words");

        gsap.set(element.querySelectorAll(".word-reveal"), {
          transformStyle: "preserve-3d",
          perspective: 1000,
        });

        gsap.fromTo(
          element.querySelectorAll(".word-reveal span"),
          {
            rotationX: -90,
            opacity: 0,
            z: -200,
          },
          {
            rotationX: 0,
            opacity: 1,
            z: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Bouncy Text Animation
      gsap.utils.toArray(".bouncy-text").forEach((element: any) => {
        splitTextIntoSpans(element, "chars");

        gsap.fromTo(
          element.querySelectorAll(".char-reveal"),
          {
            y: -100,
            opacity: 0,
            scale: 0,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Add blinking cursor animation via CSS
      const style = document.createElement("style");
      style.textContent = `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      ScrollTrigger.refresh();
    };

    const timeoutId = setTimeout(initTextAnimations, 200);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      isInitialized.current = false;
    };
  }, []);

  return null;
}

// Utility component to apply text reveal classes
export const TextReveal = ({
  children,
  type = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  type?:
    | "default"
    | "hero"
    | "section"
    | "card"
    | "typewriter"
    | "glitch"
    | "gradient"
    | "flip3d"
    | "bouncy";
  className?: string;
  [key: string]: any;
}) => {
  const getRevealClass = (type: string) => {
    switch (type) {
      case "hero":
        return "hero-title";
      case "section":
        return "section-title";
      case "card":
        return "card-title";
      case "typewriter":
        return "typewriter-text";
      case "glitch":
        return "glitch-text";
      case "gradient":
        return "gradient-reveal";
      case "flip3d":
        return "flip-3d-text";
      case "bouncy":
        return "bouncy-text";
      default:
        return "";
    }
  };

  const revealClass = getRevealClass(type);
  const combinedClassName = `${revealClass} ${className}`.trim();

  return React.createElement(
    "span",
    {
      className: combinedClassName,
      ...props,
    },
    children,
  );
};

// Pre-defined text animation classes
export const TextAnimationClasses = {
  hero: "hero-title",
  section: "section-title",
  card: "card-title",
  typewriter: "typewriter-text",
  glitch: "glitch-text",
  gradient: "gradient-reveal",
  flip3d: "flip-3d-text",
  bouncy: "bouncy-text",
  noReveal: "no-reveal",
};
