import * as React from 'react';

function TemplateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Icons"
      version="1.1"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path d="M11,8h18c0.6,0,1-0.4,1-1s-0.4-1-1-1H11c-0.6,0-1,0.4-1,1S10.4,8,11,8z" />
        <path d="M11,17h11c0.6,0,1-0.4,1-1s-0.4-1-1-1H11c-0.6,0-1,0.4-1,1S10.4,17,11,17z" />
        <path d="M29,24H11c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S29.6,24,29,24z" />
        <path d="M5,4C3.3,4,2,5.3,2,7s1.3,3,3,3s3-1.3,3-3S6.7,4,5,4z" />
        <path d="M5,13c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S6.7,13,5,13z" />
        <path d="M5,22c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S6.7,22,5,22z" />
      </g>
    </svg>
  );
}

export default TemplateIcon;
