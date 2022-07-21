import React from 'react';

export function BountyCardReward({ reward }: { reward: number }) {
  return (
    <span className="currency-lg group-hover:text-purpleLight">
      {reward} MATIC
    </span>
  );
}
