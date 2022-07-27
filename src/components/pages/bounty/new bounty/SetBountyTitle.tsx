import React, { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Title } from '@/components/utils/Title';
('../../utils/Title');

import 'react-datepicker/dist/react-datepicker.css';

export const SetBountyTitle = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (s: string) => void;
}) => {
  return (
    <div className="space-y-8">
      {/* Visibility */}
      <div className="flex flex-col space-y-5">
        <Title title="Set the bounty title" pos={1} />

        <ReactTextareaAutosize
          placeholder="Type here"
          className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 first-letter:capitalize whitespace-pre-wrap"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
    </div>
  );
};
