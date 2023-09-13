import { useRouter } from 'next/router';

import { GoToSolutionPage } from '@/lib/utils/Routes';

import { RenderMarkdown } from '@/components/utils/RenderMarkdown';

import { useAuth } from '@/auth/AuthContext';

export function SolutionData({
  solution,
}: {
  solution: {
    id?: string;
    pieSvg: string;
    labelSvg: string;
    content: string;
  };
}) {
  const { userId, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      <h1 className="h2 mt-3 flex w-fit pt-3 text-center text-main">
        Data Points in Solution
      </h1>
      <div
        id="conatiner"
        className="w-full"
        dangerouslySetInnerHTML={{ __html: solution.pieSvg }}
      ></div>

      <div className="relative">
        <div
          className={`space-y-6 ${
            !solution.content.includes('Loading...') ? '' : 'blur-sm'
          }`}
        >
          <RenderMarkdown text={solution.content} />
          <h1 className="h2 mt-3 flex w-fit pt-3 text-center text-main">
            Solution
          </h1>
          <div
            id="conatiner"
            className="flex w-full justify-center"
            dangerouslySetInnerHTML={{ __html: solution.labelSvg }}
          ></div>
        </div>
        <div
          className={`absolute bottom-0 z-10 h-full w-full cursor-pointer text-center ${
            !!userId && isAuthenticated ? 'hidden' : ''
          }`}
          onClick={() =>
            router.push(`${GoToSolutionPage(solution.id ?? '')}?login=true`)
          }
        >
          <span className="relative top-[25%] rounded-xl bg-main py-3 px-6 ">
            {' '}
            Login to view solution
          </span>
        </div>
      </div>
    </>
  );
}
