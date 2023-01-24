import * as React from 'react';

function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
    height="20px"
      id="Layer_1_1_"
      version="1.1"
      viewBox="0 0 16 16"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8,0C7.448,0,7,0.448,7,1H0v2h1v11c0,1.105,0.895,2,2,2h10c1.105,0,2-0.895,2-2V3h1V1H9C9,0.448,8.552,0,8,0z M4,14H3V5h1  V14z M7,14H6V5h1V14z M10,14H9V5h1V14z M13,14h-1V5h1V14z" />
    </svg>
  );
}

export default DeleteIcon;
