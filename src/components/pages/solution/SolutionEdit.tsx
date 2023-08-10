import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import Switch from 'react-switch';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { useSubmitSolution } from '@/lib/hooks/solutionHooks';
import { GoToSolutionPage } from '@/lib/utils/Routes';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import Icon, { IconSize } from '@/components/utils/Icon';
import { MarkdownView } from '@/components/utils/MarkdownView';
import { RenderMarkdown } from '@/components/utils/RenderMarkdown';
import { Title } from '@/components/utils/Title';

import { PostSolutionParams } from '@/server/routes/solutions/postSolution';

export function SolutionEdit({
  solution,
  setSolution,
}: {
  solution: PostSolutionParams;
  setSolution: Dispatch<SetStateAction<PostSolutionParams>>;
}) {
  const { notify: notify } = useNotification();
  const [view, setView] = useState(MarkdownView.Edit);

  const router = useRouter();
  const { id, mermaid, content, publish, target } = solution;

  const { SubmitSolution } = useSubmitSolution({
    onMutate: () => {
      notify(
        {
          title: 'Saving Solution ...',
          content: 'Please do not close this window',
          icon: 'warning',
        },
        {
          delayTime: 0,
          delayType: DelayType.Condition,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    onSuccess: () => {
      router.push(GoToSolutionPage(id));
      notify(
        {
          title: 'Solution Saved',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Pill,
        }
      );
    },
    onError: (error) => {
      notify(
        {
          title: 'There was an issue saving the solution',
          content: error.message,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 10,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
    },
  });

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-8 p-4">
      <div className="sticky top-[5rem] z-10 flex justify-between border-b-2 border-surface bg-bg py-4">
        <Title title="Add new solution" useBorder={true} big={true} />
        <div className="flex items-center gap-6">
          {Object.entries(MarkdownView).map((entry) => {
            const active = entry[1] === view;
            return (
              <button
                key={entry[0]}
                onClick={() => setView(entry[1])}
                className={`label rounded py-2 px-5 ${
                  active ? 'bg-surface' : 'hover:bg-surface-dark'
                }`}
              >
                {entry[1]}
              </button>
            );
          })}
        </div>
      </div>

      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          SubmitSolution(solution);
        }}
      >
        <div className="justify-evenl flex items-baseline">
          <label className="justify-self-start px-2 font-bold">Target:</label>
          <input
            type="text"
            placeholder="Target name as in ST"
            required
            value={target}
            onChange={(e) =>
              setSolution({ ...solution, target: e.target.value.toLowerCase() })
            }
            className="mx-2 mt-2 w-4/5 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
          />
        </div>

        <div className="justify-evenl flex items-baseline">
          <label className="justify-self-end px-2 font-bold">
            Mermaid Link:
          </label>
          <ReactTextareaAutosize
            placeholder="Link to flowchart in mermaid"
            className="col-span-4 mt-2 w-4/5 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
            onChange={(e) =>
              setSolution({ ...solution, mermaid: e.target.value })
            }
            required
            value={mermaid}
            minRows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="px-2 font-bold">Full Content:</div>
          <ReactTextareaAutosize
            placeholder="This input supports markdown. Add the complete solution content here"
            className={`body w-full whitespace-pre-wrap rounded border border-dashed border-on-surface-disabled bg-bg p-4 font-inter text-on-surface-p1 first-letter:capitalize focus:border-on-surface-unactive focus:ring-0${
              view === MarkdownView.Edit ? '' : ' hidden'
            }`}
            onChange={(e) =>
              setSolution({ ...solution, content: e.target.value })
            }
            required
            value={content}
            minRows={10}
          />
        </div>

        {view === MarkdownView.Preview && (
          <div
            className={`min-h-[17.1rem] rounded border-surface p-16 pt-8 ${
              content === '' ? '' : 'border'
            }`}
          >
            {!content && (
              <div className="flex items-center gap-2 border-b-1 border-surface pb-4 text-on-surface-unactive">
                <Icon icon="info" size={IconSize.Small} />
                <span className="label">
                  Swap to edit and start writing the solution
                </span>
              </div>
            )}
            {!!content && <RenderMarkdown text={content} />}
          </div>
        )}

        <div className="align-center flex justify-between">
          <div className="align-center flex">
            <Switch
              disabled={!content}
              onChange={(e) => setSolution({ ...solution, publish: !publish })}
              checked={publish}
              onColor="#A29BFE"
              onHandleColor="#6C5CE7"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={16}
              width={32}
            />
            <span className="ml-4">Publish Solution</span>
          </div>

          <button
            type="submit"
            className={`label rounded py-2 px-5 ${
              publish
                ? 'bg-main hover:bg-open-bounty'
                : 'bg-surface hover:bg-open-bounty'
            }`}
          >
            {publish ? 'Publish' : 'Save (Not Publish)'}
          </button>
        </div>
      </form>
    </div>
  );
}
