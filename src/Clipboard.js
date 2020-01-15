import React from "react";
import _ from "lodash";
import styled from "styled-components";

const Clipper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
function Clipboard(props) {
  return (
    <Clipper>
      <svg width="377px" height="631px" viewBox="0 0 377 631" {...props}>
        <title>{"clipboard"}</title>
        <desc>{"Created with Sketch."}</desc>
        <defs>
          <radialGradient
            cx="69.3665029%"
            cy="1.72535929%"
            fx="69.3665029%"
            fy="1.72535929%"
            r="148.276542%"
            gradientTransform="translate(0.693665,0.017254),scale(1.000000,0.674416),rotate(90.000000),translate(-0.693665,-0.017254)"
            id="radialGradient-1"
          >
            <stop stopColor="#FFFFFF" offset="0%" />
            <stop
              stopColor="#FFFFFF"
              stopOpacity={0.51783371}
              offset="23.3399557%"
            />
            <stop stopColor="#FFFFFF" stopOpacity={0} offset="100%" />
          </radialGradient>
          <filter
            x="-7.0%"
            y="-4.7%"
            width="114.1%"
            height="109.5%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feGaussianBlur stdDeviation={10} in="SourceGraphic" />
          </filter>
        </defs>
        <g
          id="clipboard"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
        >
          <polygon
            id="light-overlay"
            fill="url(#radialGradient-1)"
            filter="url(#filter-2)"
            points="113.02855 16 -15 107.580478 -15 648.955603 264.940708 648.999212 411.904487 648.955603 411.904487 124.189791 248.004001 16"
          />
          <rect
            id="black-light-blockout"
            fill="#000000"
            x={113}
            y={9}
            width={135}
            height={29}
          />
        </g>
      </svg>
    </Clipper>
  );
}
export default Clipboard;
