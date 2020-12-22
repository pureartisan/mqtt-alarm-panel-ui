import React from 'react';

import { ShieldIcon } from '@app/components/icons/ShieldIcon';

import './style.scss';

interface ShieldBadgeProps {
  children?: React.ReactNode | React.ReactNode[],
  animation?: boolean
}

export const ShieldBadge = (props: ShieldBadgeProps) => (
  <div className="ShieldBadge">
    {props.children && (
      <div className="label">
        { props.children }
      </div>
    )}
    <div className="ring">
      <ShieldIcon animation={props.animation ? 'breath' : 'none'} />
    </div>
  </div>
);

ShieldBadge.defaultProps = {
  animation: true
} as ShieldBadgeProps;