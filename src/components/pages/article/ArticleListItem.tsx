import { useRouter } from 'next/router';

import { useGetFile } from '@/lib/hooks/fileHooks';
import { GoToArticlePage } from '@/lib/utils/Routes';
import { toTitleCase } from '@/lib/utils/StringHelpers';

import { useAuth } from '@/auth/AuthContext';
import { SmallArticle } from '@/server/routes/articles/getArticles';

export function ArticleListItem({ article }: { article: SmallArticle }) {
  const { isAdmin, isStaff } = useAuth();
  const { fileUrl } = useGetFile(
    `articles/thumbnails/${article.thumbnail}.jpeg`
  );
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(GoToArticlePage(article.slug))}
      className="w-full grid-cols-3 flex-wrap place-items-center gap-2 hover:cursor-pointer tablet:grid tablet:gap-x-4"
    >
      <img
        className="col-span-1 h-[200px] w-[300px] object-cover"
        src={fileUrl!}
        alt="Thumbnail"
      ></img>
      <div className="col-span-2 space-y-2">
        <div className="italics text-lg font-bold">{article.title}</div>
        <div className="flex justify-between font-semibold">
          <div className="text-main">{`Published on ${article.createdAt
            .toLocaleDateString('en-GB')
            .slice(0)}`}</div>
          <div className="text-main-light">{`Related Targets: ${article.targets
            .map((t) => toTitleCase(t.name))
            .join(',')}`}</div>
          {(isAdmin || isStaff) && (
            <div className={article.publish ? 'text-success' : 'text-error'}>
              {article.publish ? 'Published' : 'Unpublished'}
            </div>
          )}
        </div>
        <div className="">{article.summary}</div>
      </div>
    </div>
  );
}
