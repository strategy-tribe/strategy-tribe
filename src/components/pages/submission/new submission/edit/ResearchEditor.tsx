import { Requirement, RequirementType } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { MermaidEditor } from '@/components/mermaid/MermaidEditor';
import { ButtonStyle } from '@/components/utils/Button';
import Icon, { IconSize } from '@/components/utils/Icon';
import { RenderMarkdown } from '@/components/utils/RenderMarkdown';

export function ResearchEditor({
  requirement,
  input,
  setInput,
}: {
  requirement: Requirement;
  input: string | File[] | string[] | undefined;
  setInput: (s: string | File[]) => void;
}) {
  const [isMermaid, setIsMermaid] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          className={`rounded-s p-2 ${
            isMermaid ? ButtonStyle.Filled : ButtonStyle.Hollow
          }`}
          onClick={() => setIsMermaid(true)}
        >
          Mermaid Flowchart
        </button>
        <button
          className={`rounded-m p-2 ${
            !isMermaid ? ButtonStyle.Filled : ButtonStyle.Hollow
          }`}
          onClick={() => setIsMermaid(false)}
        >
          Markdown Editor
        </button>
      </div>
      {/* Check the type of input needed */}
      {!isMermaid ? (
        <div className="max-w-7l mx-auto flex content-baseline justify-between space-x-4">
          <div className="w-full space-y-4">
            <ReactTextareaAutosize
              placeholder={requirement.title}
              className="body h-fit min-h-[17.1rem] w-full whitespace-pre-wrap border-0 bg-bg font-inter text-on-surface-p1 first-letter:capitalize focus:ring-0"
              minRows={requirement.type === RequirementType.Report ? 10 : 1}
              value={input as string}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>

          <div
            className={`min-h-[17.1rem] w-full rounded border-surface p-8 ${
              input === '' ? '' : 'border'
            }`}
          >
            {!input && (
              <div className="flex items-center gap-2 border-b-1 border-surface pb-4 text-on-surface-unactive">
                <Icon icon="info" size={IconSize.Small} />
                <span className="label">
                  Swap to edit and start writing the solution
                </span>
              </div>
            )}
            {!!input && <RenderMarkdown text={input as string} />}
          </div>
        </div>
      ) : (
        <MermaidEditor
          id="submission-graph-div"
          code={input as string}
          setCode={setInput as Dispatch<SetStateAction<string>>}
        />
      )}
    </div>
  );
}
