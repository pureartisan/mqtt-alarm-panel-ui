import React from 'react';

import './style.scss';

type Animation = 'breath' | 'tremble';

interface SirenIconProps {
  animation?: Animation
  fill1?: string
  fill2?: string
  fill3?: string
}

export const SirenIcon = ({ animation, fill1, fill2, fill3 }: SirenIconProps) => (
  <svg
    xmlSpace="preserve"
    viewBox="0 0 100 100"
    y="0"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      height: '100%',
      width: '100%',
      background: 'transparent'
    }}
    width={130}
    height={130}
  >
    <g
      style={{
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg) scale(1, 1)'
      }}
    >
      <g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.592593s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              fill="#e15b64"
              d="M67.4 75.2H32.6V58.8c0-9.6 7.8-17.4 17.4-17.4 9.6 0 17.4 7.8 17.4 17.4v16.4z"
              style={{
                fill: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.62963s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#fff"
              fill="#666"
              d="M38.3 51.7c1.8-2.8 4.5-4.9 7.7-5.9"
              style={{
                stroke: 'rgb(255, 255, 255)',
                fill: 'rgb(70, 70, 70)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.666667s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#fff"
              fill="#666"
              d="M36.3 58.3c0-.6.1-1.2.2-1.7"
              style={{
                stroke: 'rgb(255, 255, 255)',
                fill: 'rgb(70, 70, 70)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.703704s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              fill="#333"
              d="M72.4 78.7H27.6v-4.4c0-2.9 2.4-5.3 5.3-5.3H67c2.9 0 5.3 2.4 5.3 5.3v4.4z"
              style={{
                fill: 'rgb(51, 51, 51)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.740741s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M50 36.8V21.3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.777778s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M61.9 37.1l5.1-8.9"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.814815s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M70.6 45.7l11.1-6.4"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.851852s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M29.3 45.7l-11-6.4"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.888889s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M73.9 57.5h10.3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.925926s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M26.5 57.9H16.3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -0.962963s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <path
              d="M38.2 37.3l-5.1-8.9"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeWidth="2.752"
              stroke="#c33737"
              fill="none"
              style={{
                stroke: 'rgb(223, 76, 30)'
              }}
            ></path>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -1s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <circle
              r="1.4"
              fill="#c33737"
              cy="22.7"
              cx="70.6"
              transform="rotate(-60 70.563 22.69)"
              style={{
                fill: 'rgb(223, 76, 30)'
              }}
            ></circle>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -1.03704s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <circle
              fill="#c33737"
              r="1.4"
              cy="58.3"
              cx="91.1"
              style={{
                fill: 'rgb(223, 76, 30)'
              }}
            ></circle>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -1.07407s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <circle
              fill="#c33737"
              r="1.4"
              cy="58.3"
              cx="8.9"
              style={{
                fill: 'rgb(223, 76, 30)'
              }}
            ></circle>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'matrix(1, 0, 0, 1, 0, 0)',
              animation: `1.11111s linear -1.11111s infinite normal forwards running icon-siren-${animation}`
            }}
          >
            <circle
              r="1.4"
              fill="#c33737"
              cy="22.7"
              cx="29.4"
              transform="rotate(-30 29.437 22.689)"
              style={{
                fill: 'rgb(223, 76, 30)'
              }}
            ></circle>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SirenIcon.defaultProps = {
  animation: 'tremble',
  fill1: '#0da035',
  fill2: '#ffffff',
  fill3: '#8bd673'
} as SirenIconProps;