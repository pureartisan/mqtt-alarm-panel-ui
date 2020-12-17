import React from 'react';

import { ShieldIcon } from '@app/components/icons/ShieldIcon';

import './style.scss';

interface ShieldBadgeProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const ShieldBadge = (props: ShieldBadgeProps) => (
  <div className="ShieldBadge">
    <div className="label">
      { props.children }
    </div>
    <div className="ring">
      <ShieldIcon />
    </div>
  </div>
);