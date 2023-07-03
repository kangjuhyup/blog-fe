import { useEffect, useState } from 'react';
import Link from 'next/link';

const HoverLink = (props: {
    style:any,
    href:string,
    children : any,
    hoverChildren : any,
    hoverEvent : any,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if(isHovered) {
      props.hoverEvent();
    }
  },[isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={props.href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={props.style}
    >
      {props.children}      
      {isHovered && props.hoverChildren}
    </Link>
  );
};

export default HoverLink;
