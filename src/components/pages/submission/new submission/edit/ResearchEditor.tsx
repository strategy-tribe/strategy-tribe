import { Requirement, RequirementType } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { GoToOSINTGraphGuidePage } from '@/lib/utils/Routes';

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
          OSINT-Graph
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
              <>
                <p className="label gap-2 text-on-surface-unactive">
                  A Markdown editor is your go-to tool for creating beautifully
                  formatted texts without the hassle. It provides a
                  user-friendly environment that makes it easy to write and
                  format text using Markdown syntax. With just a few simple
                  symbols, you can create headings, lists, links, and more.
                </p>
                <br />
                <p className="text-on-surface-unactive">
                  <a
                    href="https://commonmark.org/help/"
                    className="label rounded bg-surface py-2 px-5 hover:bg-main"
                  >
                    View documentation
                  </a>
                </p>
                <br />
                <div className="flex items-center gap-2 border-b-1 border-surface pb-4 text-on-surface-unactive">
                  <Icon icon="info" size={IconSize.Small} />
                  <span className="label">
                    Swap to edit and start writing the solution
                  </span>
                </div>
              </>
            )}
            {!!input && <RenderMarkdown text={input as string} />}
          </div>
        </div>
      ) : (
        <>
          {!input && (
            <>
              <p className="label gap-2 pt-4 text-on-surface-unactive">
                An OSINT graph is a visual representation of data and
                relationships derived from publicly available sources like
                websites, social media, news articles etc. These graphs employ
                graph theory and network analysis to depict connections between
                entities, making them invaluable for various purposes. OSINT
                graphs are used to gain insights from open-source data, uncover
                hidden connections, visualise complex information, enhance
                situational awareness, support decision making, identify
                influencers, and track trends, among other applications.{' '}
              </p>
              <br />
              <a
                href={GoToOSINTGraphGuidePage()}
                className="label rounded bg-surface py-2 px-5 hover:bg-main"
              >
                View Guide
              </a>
            </>
          )}
          <MermaidEditor
            id="submission-graph-div"
            code={input as string}
            setCode={setInput as Dispatch<SetStateAction<string>>}
          />
        </>
      )}
    </div>
  );
}
