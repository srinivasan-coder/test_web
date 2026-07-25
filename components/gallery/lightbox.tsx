"use client";

import LightboxLib from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import type { LightboxSlide } from "@/types";

interface LightboxProps {
  open: boolean;
  index: number;
  slides: LightboxSlide[];
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

/**
 * Fullscreen portfolio lightbox with next/previous, zoom, and keyboard support.
 * Arrow keys, Escape, and backdrop click are handled by the library.
 */
export function Lightbox({
  open,
  index,
  slides,
  onClose,
  onIndexChange,
}: LightboxProps) {
  return (
    <LightboxLib
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Fullscreen, Zoom, Captions]}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      animation={{
        fade: 320,
        swipe: 280,
        navigation: 280,
      }}
      carousel={{
        finite: false,
        preload: 2,
        padding: "16px",
        spacing: "16px",
      }}
      captions={{
        descriptionTextAlign: "start",
        descriptionMaxLines: 2,
      }}
      render={{
        buttonPrev: slides.length <= 1 ? () => null : undefined,
        buttonNext: slides.length <= 1 ? () => null : undefined,
      }}
      on={{
        view: ({ index: next }) => onIndexChange?.(next),
      }}
      styles={{
        container: {
          backgroundColor: "rgba(17, 24, 39, 0.96)",
        },
      }}
    />
  );
}
