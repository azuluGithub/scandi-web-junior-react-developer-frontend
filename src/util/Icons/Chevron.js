import React, { Component } from 'react';

class Chevron extends Component {
  render() {
    const { width, height, color } = this.props;
    
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

        // <svg
        //     viewBox="0 0 32 32"
        //     xmlns="http://www.w3.org/2000/svg"
        //     width={width}
        //     height={height}
        // >
        //     <defs></defs>
        //     <title />
        //     <g data-name="Layer 2" id="Layer_2">
        //     <path d="M16,21a1,1,0,0,1-.71-.29l-8-8a1,1,0,1,1,1.42-1.42L16,18.59l7.29-7.3a1,1,0,0,1,1.42,1.42l-8,8A1,1,0,0,1,16,21Z" />
        //     </g>
        //     <g id="frame"></g>
        // </svg>
    )
  }
}

export default Chevron;