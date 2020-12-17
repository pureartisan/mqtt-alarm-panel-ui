import React from 'react';

import { ShieldIcon } from '@app/components/icons/ShieldIcon';

import './style.scss';

interface ShieldBadgeProps {
  fill1?: string
  fill2?: string
  fill3?: string
}

export const ShieldBadge = (props: ShieldBadgeProps) => (
  <div className="ShieldBadge">
    <ShieldIcon {...props} />
  </div>
);

ShieldBadge.defaultProps = {
  fill1: '#0da035',
  fill2: '#ffffff',
  fill3: '#8bd673'
} as ShieldBadgeProps;