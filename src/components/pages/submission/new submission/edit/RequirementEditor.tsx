import { Requirement, RequirementType } from '@prisma/client';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { ImageUploader } from './ImageUploader';
import { RequirementChecker } from './RequirementChecker';
import { ResearchEditor } from './ResearchEditor';

export function RequirementEditor({
  requirement,
  input,
  setInput,
}: {
  requirement: Requirement;
  input: string | File[] | string[] | undefined;
  setInput: (s: string | File[]) => void;
}) {
  return (
    <div className="space-y-4">
      {/* The type cheker */}
      <RequirementChecker requirement={requirement} input={input} />

      {/* Check the type of input needed */}
      {requirement.type === RequirementType.Image ? (
        <ImageUploader files={input as File[]} setFiles={setInput} />
      ) : requirement.title.indexOf('How did you find this info') < 0 ? (
        <ReactTextareaAutosize
          placeholder={requirement.title}
          className="body h-fit w-full
          -translate-y-4 whitespace-pre-wrap border-0 bg-bg font-inter text-on-surface-p1 first-letter:capitalize focus:ring-0"
          minRows={requirement.type === RequirementType.Report ? 10 : 1}
          value={input as string}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      ) : (
        <ResearchEditor
          key={requirement.id}
          requirement={requirement}
          input={input as string}
          setInput={setInput}
        />
      )}
    </div>
  );
}
