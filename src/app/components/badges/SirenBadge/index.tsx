import React from 'react';

import { SirenIcon } from '@app/components/icons/SirenIcon';

import './style.scss';

interface SirenBadgeProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const SirenBadge = (props: SirenBadgeProps) => (
  <div className="SirenBadge">
    <div className="label">
      { props.children }
    </div>
    <div className="ring">
      <SirenIcon />
    </div>
  </div>
);