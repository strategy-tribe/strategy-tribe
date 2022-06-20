import Icon from '@/components/utils/Icon';
import React from 'react';

export function InvisibleSpacingButton({}) {
  return (
    <button className="invisible py-3 pl-4 pr-6 text-base rounded-full flex space-x-2">
      <Icon icon="add" />
    </button>
  );
}
