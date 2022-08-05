import ReactTextareaAutosize from 'react-textarea-autosize';

import { Requirement, RequirementType } from '@/lib/models/requirement';

import { ImageUploader } from './ImageUploader';
import { RequirementChecker } from './RequirementChecker';

export function RequirementEditor({
  requirement,
  input,
  setInput,
}: {
  requirement: Requirement;
  input: string | File[] | undefined;
  setInput: (s: string | File[]) => void;
}) {
  return (
    <div className="space-y-4">
      {/* The type cheker */}
      <RequirementChecker requirement={requirement} input={input} />

      {/* Check the type of input needed */}
      {requirement.type === RequirementType.Image && (
        <ImageUploader files={input as File[]} setFiles={setInput} />
      )}

      {requirement.type !== RequirementType.Image && (
        <ReactTextareaAutosize
          placeholder={requirement.title}
          className="bg-bg text-on-surface-p1 body
          -translate-y-4 border-0 w-full h-fit font-inter focus:ring-0 first-letter:capitalize whitespace-pre-wrap"
          minRows={requirement.type === RequirementType.Report ? 10 : 1}
          value={input as string}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      )}
    </div>
  );
}
