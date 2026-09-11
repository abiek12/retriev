import { useId, type SVGProps } from "react";

export const RetrievLogo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <mask id={maskId}>
          <rect width="120" height="120" fill="white" />
          <path
            d="M -10 60 L 46 60 A 14 14 0 0 1 60 74 L 60 130"
            stroke="black"
            strokeWidth="7"
            fill="none"
            strokeLinecap="butt"
          />
        </mask>
      </defs>

      <g fill="currentColor" mask={`url(#${maskId})`}>
        <rect x="51" y="10" width="14" height="100" rx="1" />
        <rect x="10" y="51" width="100" height="14" rx="1" />
        <rect
          x="51"
          y="10"
          width="14"
          height="100"
          rx="1"
          transform="rotate(45 60 60)"
        />
        <rect
          x="51"
          y="10"
          width="14"
          height="100"
          rx="1"
          transform="rotate(-45 60 60)"
        />
      </g>
    </svg>
  );
};
