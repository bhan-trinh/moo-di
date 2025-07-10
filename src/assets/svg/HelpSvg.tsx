import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

function HelpSvg({ width, height, color }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_6_81)">
        <Path
          d="M7.575 7.5a2.5 2.5 0 014.858.833c0 1.667-2.5 2.5-2.5 2.5M10 14.167h.008M18.333 10a8.333 8.333 0 11-16.666 0 8.333 8.333 0 0116.666 0z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6_81">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default HelpSvg;
