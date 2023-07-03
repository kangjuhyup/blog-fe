import { HEADER_HEIGHT } from '@/common/const';
import { useState } from 'react';

const HoverDiv = (props : {
    style : any
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={props.style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content */}
    </div>
  );
};

export default HoverDiv;
