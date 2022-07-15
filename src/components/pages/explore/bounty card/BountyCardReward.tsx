import React from 'react';

export function BountyCardReward({ reward }: { reward: number }) {
  return <span className="currency-lg">{reward} MATIC</span>;
}
