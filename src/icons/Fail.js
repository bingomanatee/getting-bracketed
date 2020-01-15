import React from "react";

function SvgFail(props) {
  return (
    <svg width="58px" height="58px" viewBox="0 0 58 58" {...props}>
      <title>{"FAIL"}</title>
      <desc>{"Created with Sketch."}</desc>
      <g id="FAIL" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <circle id="Oval" fill="#FE0046" cx={29} cy={29} r={29} />
        <path
          d="M25.5003834,8.99997366 L25.5003834,49.5641888 C15.6004672,48.1126827 8,39.5849741 8,29.2820812 C8,18.9791884 15.6004672,10.4514798 25.5003834,8.99997366 Z M31.5006167,9.00012031 C41.4000447,10.4520541 49,18.9795354 49,29.2820812 C49,39.5846271 41.4000447,48.1121083 31.5006167,49.5640422 Z"
          id="Combined-Shape"
          fill="#000000"
          transform="translate(28.500000, 29.282081) rotate(-315.000000) translate(-28.500000, -29.282081) "
        />
      </g>
    </svg>
  );
}

export default SvgFail;
