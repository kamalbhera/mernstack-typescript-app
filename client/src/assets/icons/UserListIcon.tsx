import * as React from 'react';

function UserListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2375541/svg" {...props}>
      <rect fill="none" height="256" width="256" />
      <circle
        cx="80"
        cy="104"
        fill="none"
        r="40"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="152"
        x2="248"
        y1="80"
        y2="80"
      />
      <line
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="152"
        x2="248"
        y1="128"
        y2="128"
      />
      <line
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="176"
        x2="248"
        y1="176"
        y2="176"
      />
      <path
        d="M18,192a64,64,0,0,1,124,0"
        fill="none"
        stroke="#375541"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

export default UserListIcon;
