import Editor from '@monaco-editor/react';
import { RequirementType } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Switch from 'react-switch';

import {
  useEnrichDataPoints,
  useSubmitSubmissionGraph,
} from '@/lib/hooks/bountySubGraphHooks';
import {
  GoToBountyPage,
  GoToBountySubmissionGraphsPage,
  GoToOSINTGraphGuidePage,
} from '@/lib/utils/Routes';

import { MermaidEditor } from '@/components/mermaid/MermaidEditor';
import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Icon from '@/components/utils/Icon';
import { Title } from '@/components/utils/Title';

import { getEnrichParams } from '@/server/dataFetch/utils';
import { EnrichDataParams } from '@/server/routes/submissionGraph/enrichData';
import { FullBountySubGraph } from '@/server/routes/submissionGraph/getBountySubGraph';
import { PostBountySubGraphParams } from '@/server/routes/submissionGraph/postBountySubGraph';

import { UserAnswers } from '../submission/SubmissionContent';
import { SubmissionContextProvider } from '../submission/SubmissionContext';
import { SubmissionReview } from '../submission/SubmissionReview';

export function BountySubGraphEdit({ bounty }: { bounty: FullBountySubGraph }) {
  const FLOW_DIV_ID = 'flowchart-div';
  const router = useRouter();
  const { notify: notify } = useNotification();
  const [submissionGraph, setSubmissionGraph] =
    useState<PostBountySubGraphParams>();
  const options = useMemo(() => {
    return Object.entries(RequirementType).map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  const GRAPH_CODE = `%%{
    init: {
      'themeVariables': {
        'lineColor': '#808080'
      }
    }
  }%%
  
  osint-elk showData
  
    start -> D_name(fullname, h, "Please Enter Name", "Please Enter Name")
    D_name -> P_search(search, "Search name somewhere")`;

  const { SubmitSubmissionGraph } = useSubmitSubmissionGraph({
    onMutate: () => {
      notify(
        {
          title: 'Saving Submission Graph ...',
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
    onSuccess: (submissionGraphId) => {
      router.push(GoToBountySubmissionGraphsPage());
      notify(
        {
          title: 'Submission Graph Saved',
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
          title: 'There was an issue saving the submission graph',
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

  const { Enrich } = useEnrichDataPoints({
    onMutate: () => {
      notify(
        {
          title: 'Enriching Data Points ...',
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
    onSuccess: (enrichedData) => {
      if (submissionGraph) {
        setSubmissionGraph({
          ...submissionGraph,
          enrichedData: JSON.stringify(enrichedData, null, 4),
        });
      }
      notify(
        {
          title: 'Enriched Data Points',
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
          title: 'There was an issue enriching',
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

  const getEnrichedData = () => {
    if (submissionGraph && submissionGraph.dataPoints.length > 0) {
      const params: EnrichDataParams = getEnrichParams(
        submissionGraph.dataPoints
      );
      if (params.dataPoints.length > 0) {
        Enrich(params);
        return;
      }
    }
    notify(
      {
        title: 'No valid datapoints to enrich',
        content: 'Need "Email" or "PhoneNumber" to enrich',
        icon: 'warning',
        style: NotificationStyle.default,
      },
      {
        condition: false,
        delayTime: 6,
        delayType: DelayType.Time,
        type: NotificationType.Banner,
      }
    );
  };

  useEffect(() => {
    if (!submissionGraph) {
      setSubmissionGraph(
        bounty.SubmissionGraph
          ? {
              ...bounty.SubmissionGraph,
              slug: bounty.slug,
            }
          : {
              slug: bounty.slug,
              code: GRAPH_CODE,
              enrichedData: '',
              isGraphComplete: false,
              isDataPointsVerified: false,
              isEnrichedDataVerified: false,
              dataPoints: [
                {
                  type: bounty.Invoice?.submission.answers.find(
                    (ans) =>
                      ans.requirement?.type !== RequirementType.Report &&
                      ans.requirement?.type !== RequirementType.Image
                  )?.requirement?.type as RequirementType,
                  value:
                    bounty.Invoice?.submission.answers.find(
                      (ans) =>
                        !(
                          ans.requirement?.title.includes(
                            'How did you find this info'
                          ) ||
                          ans.requirement?.title.includes('Enter additional') ||
                          ans.requirement?.title.includes('Attachment')
                        )
                    )?.answer ?? '',
                },
              ],
            }
      );
    }
  }, [bounty.slug]);

  return (
    <div className="max-w-8xl mx-2 flex min-h-screen flex-col items-center space-y-8 p-4">
      {submissionGraph && (
        <div className="w-full">
          <div className="sticky top-[5rem] z-20 flex items-end justify-around border-b-4 border-main bg-bg py-4">
            <div className="flex items-start justify-center space-x-2 ">
              <Title
                title="Edit Bounty Submission graph :"
                pos={2}
                useBorder={false}
                big={true}
              />

              <a
                href={GoToBountyPage(bounty.slug)}
                rel="noopener noreferrer"
                target="_blank"
                className="block max-w-3xl border-surface bg-bg text-sm font-bold text-on-surface-p1 text-main-light hover:text-main"
              >
                {bounty?.title}
              </a>
            </div>

            <div className="flex items-end justify-between space-x-4">
              <span>Completed: </span>
              <div className="align-center flex">
                <Switch
                  onChange={(e) =>
                    setSubmissionGraph({
                      ...submissionGraph,
                      isGraphComplete: !submissionGraph.isGraphComplete,
                    })
                  }
                  checked={submissionGraph.isGraphComplete}
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
                <span>Graph</span>
              </div>
              <div className="align-center flex">
                <Switch
                  onChange={(e) =>
                    setSubmissionGraph({
                      ...submissionGraph,
                      isDataPointsVerified:
                        !submissionGraph.isDataPointsVerified,
                    })
                  }
                  checked={submissionGraph.isDataPointsVerified}
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
                <span>Data Points</span>
              </div>
              <div className="align-center flex">
                <Switch
                  onChange={(e) =>
                    setSubmissionGraph({
                      ...submissionGraph,
                      isEnrichedDataVerified:
                        !submissionGraph.isEnrichedDataVerified,
                    })
                  }
                  checked={submissionGraph.isEnrichedDataVerified}
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
                <span>Enrichment</span>
              </div>
            </div>
            <div className="align-center flex space-x-4">
              <button
                onClick={() => router.push(GoToBountySubmissionGraphsPage())}
                className="label rounded border-2 border-main py-2 px-5 text-sm hover:bg-open-bounty"
              >
                Cancel
              </button>

              <button
                className="label rounded bg-main py-2 px-5 text-sm hover:bg-open-bounty"
                onClick={() => SubmitSubmissionGraph(submissionGraph)}
              >
                Save
              </button>
            </div>
          </div>

          {bounty.Invoice?.submission && (
            <SubmissionContextProvider submission={bounty.Invoice?.submission}>
              <div className="m-4 flex justify-around space-x-16 px-16">
                <div className="spcae-y-4">
                  <h2 className="title-sm text-on-surface-p0">
                    Submission Details
                  </h2>
                  <UserAnswers />
                </div>
                <SubmissionReview />
              </div>
            </SubmissionContextProvider>
          )}

          <hr className="mx-8 text-surface" />

          <div className="grid grid-cols-5 gap-x-8 pr-4">
            <div className="px- col-span-3 mx-auto ml-16 flex flex-col items-center">
              <div className="border-surfce mt-2 flex max-w-3xl items-baseline justify-between space-x-4 border-b-2 px-2">
                <label className="text-black mr-8 text-lg font-semibold">
                  Data Points of Target in the Submission
                </label>
                <button
                  type="button"
                  className="flex items-center font-semibold text-main-light"
                  onClick={() => {
                    if (
                      !submissionGraph.dataPoints.find((d) => d.value === '')
                    ) {
                      setSubmissionGraph({
                        ...submissionGraph,
                        dataPoints: submissionGraph.dataPoints.concat({
                          type: RequirementType.Email,
                          value: '',
                        }),
                      });
                    }
                  }}
                >
                  Add field{' '}
                  <Icon
                    icon="add"
                    className="ml-1 mb-1 h-5 w-5"
                    aria-hidden="true"
                  ></Icon>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {submissionGraph.dataPoints.map((field, index) => (
                  <div
                    key={index}
                    className="mt-2 items-center space-x-2 rounded-lg border-[1px] border-surface p-2 outline-none focus:outline-none bt:flex"
                  >
                    <Dropdown
                      defaultOptionIndex={options.findIndex(
                        (o) => (o.label as string) === field.type
                      )}
                      options={options}
                      labelClass="border-2 p-2 border-main rounded-md"
                      onSelect={({ label: newState }) => {
                        field.type = newState as RequirementType;
                        setSubmissionGraph({
                          ...submissionGraph,
                          dataPoints: submissionGraph.dataPoints,
                        });
                      }}
                    />
                    <input
                      type="text"
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.value = e.target.value;
                        setSubmissionGraph({
                          ...submissionGraph,
                          dataPoints: submissionGraph.dataPoints,
                        });
                      }}
                      placeholder="Please enter here"
                      className="justify-self-start rounded-md border-[#CCCCCC] bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                    />
                    <button
                      type="button"
                      className="ml-1 "
                      onClick={() => {
                        const data = submissionGraph.dataPoints.filter(
                          (f, fIndex) => index !== fIndex
                        );
                        setSubmissionGraph({
                          ...submissionGraph,
                          dataPoints: [],
                        });
                        setTimeout(() => {
                          setSubmissionGraph({
                            ...submissionGraph,
                            dataPoints: data,
                          });
                        });
                      }}
                    >
                      <Icon
                        icon="close"
                        className="h-5 w-5"
                        aria-hidden="true"
                      ></Icon>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx- mx-ato px- col-span-2 flex flex-col items-center">
              <div className="border-surfce my-2 flex w-full max-w-3xl items-baseline justify-around space-x-4 border-b-2">
                <label className="text-black text-lg font-semibold">
                  Enriched Data
                </label>
                <button
                  type="button"
                  className="flex items-center font-semibold text-main-light"
                  onClick={getEnrichedData}
                >
                  Enrich Data{' '}
                  <Icon
                    icon="add"
                    className="ml-1 mb-1 h-5 w-5"
                    aria-hidden="true"
                  ></Icon>
                </button>
              </div>
              <Editor
                theme="mermaid-dark"
                height={submissionGraph.enrichedData ? '20rem' : '5rem'}
                defaultValue={submissionGraph.enrichedData}
                options={{
                  minimap: { enabled: false },
                }}
                language="json"
                value={submissionGraph.enrichedData}
                className="mermaid-editor"
                onChange={(value, a) =>
                  setSubmissionGraph({
                    ...submissionGraph,
                    enrichedData: value ?? '',
                  })
                }
              />
            </div>
          </div>

          <div className="mx-4 items-baseline border-b-2 border-surface py-6 px-6 text-base font-bold">
            Flowchart:
            <span className="mx-4">
              <a
                href={GoToOSINTGraphGuidePage()}
                className="label rounded bg-surface py-2 px-5 hover:bg-main"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Guide
              </a>
            </span>
          </div>

          <MermaidEditor
            id={FLOW_DIV_ID}
            code={submissionGraph.code}
            setCode={(code: string) =>
              setSubmissionGraph({ ...submissionGraph, code })
            }
          />
        </div>
      )}
    </div>
  );
}
