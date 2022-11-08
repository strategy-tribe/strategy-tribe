import React from 'react';
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
          className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  text-on-surface-p1 first-letter:capitalize focus:ring-0"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
    </div>
  );
};
