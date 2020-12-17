import React from 'react';

import './style.scss';

interface ShieldIconProps {
  fill1?: string
  fill2?: string
  fill3?: string
}

export const ShieldIcon = ({ fill1, fill2, fill3 }: ShieldIconProps) => (
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
    className="ShieldIcon"
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
              transform: 'scale(0.91)',
              animation: '1.85185s linear -1.23457s infinite normal forwards running icon-shield-breath'
            }}
          >
            <path
              fill={fill1}
              d="M21.3 31.8c0 11.9.5 23.9 5.6 33 5.3 9.4 15.6 16.2 23 18.2 7.2-2.1 17.3-9.1 22.5-18.3 5.2-9.1 6-21.1 6.1-32.9-12.4-1.3-23.9-9.3-28.6-13-4.6 3.8-16.2 11.7-28.6 13z"
              style={{
                fill: fill1
              }}
            ></path>
          </g>
        </g>
        <g>
          <g>
            <g>
              <g>
                <g

                  style={{
                    transformOrigin: '50px 50px',
                    transform: 'scale(0.91)',
                    animation: '1.85185s linear -1.54321s infinite normal forwards running icon-shield-breath'
                  }}
                >
                  <path d="M46 69.1L28.8 51.9l5.6-5.6L46 58l19.6-19.6 5.6 5.6z"
                    fill={fill2}
                    style={{
                      fill: fill2
                    }}
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g>
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: 'scale(0.91)',
              animation: '1.85185s linear -1.85185s infinite normal forwards running icon-shield-breath'
            }}
          >
            <path
              fill={fill3}
              d="M52.2 12L50 10l-2.2 2c-.2.1-15.3 13.2-29.8 13.2h-3.4v3.4c0 13.1 0 28 6.4 39.5 6.5 11.5 19.1 19.6 28.3 21.7l.8.2.8-.2c8.8-2.2 21.1-10.4 27.5-21.7 6.5-11.4 7.1-25.7 7.1-39.4v-3.4H82C67.5 25.2 52.4 12.2 52.2 12zm20.3 52.7C67.2 73.9 57.1 80.9 49.9 83c-7.4-2-17.8-8.8-23-18.2-5.1-9.1-5.5-21.1-5.6-33 12.4-1.3 23.9-9.3 28.7-13 4.7 3.7 16.3 11.6 28.6 13-.1 11.8-.9 23.8-6.1 32.9z"
              style={{
                fill: fill3
              }}
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

ShieldIcon.defaultProps = {
  fill1: '#0da035',
  fill2: '#ffffff',
  fill3: '#8bd673'
} as ShieldIconProps;