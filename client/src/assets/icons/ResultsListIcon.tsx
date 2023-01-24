import * as React from 'react';

function ResultsListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2375541/svg" {...props}>
      <rect fill="none" height="256" width="256" />
      <line
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128"
        x2="216"
        y1="128"
        y2="128"
      />
      <line
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128"
        x2="216"
        y1="64"
        y2="64"
      />
      <line
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128"
        x2="216"
        y1="192"
        y2="192"
      />
      <polyline
        fill="none"
        points="92 48 57.3 80 40 64"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        fill="none"
        points="92 112 57.3 144 40 128"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        fill="none"
        points="92 176 57.3 208 40 192"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

export default ResultsListIcon;
