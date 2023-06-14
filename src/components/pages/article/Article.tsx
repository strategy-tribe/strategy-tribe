import { Tag } from '@prisma/client';
import { useRouter } from 'next/router';

import { useGetFile } from '@/lib/hooks/fileHooks';
import { GoToArticleEditPage, GoToTargetPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';
import { RenderMarkdown } from '@/components/utils/RenderMarkdown';

import { useAuth } from '@/auth/AuthContext';
import { FullArticle } from '@/server/routes/articles/getArticle';

export function Article({ article }: { article: FullArticle }) {
  const { isAdmin, isStaff } = useAuth();
  const router = useRouter();

  const { fileUrl } = useGetFile(
    `articles/thumbnails/${article.thumbnail}.jpeg`
  );

  const orgsFull = article.targets
    .map((t) => t.org?.name ?? '')
    .filter((o) => !!o);
  const orgs = orgsFull.filter(
    (org: string, index: number) => orgsFull.indexOf(org) === index
  );
  const targets = article?.targets?.filter((t) => !orgs.includes(t.name));
  const tags = article.targets
    .reduce((acc, t) => acc.concat(t.org?.tags ?? []), [] as Tag[])
    .map((tag) => tag.name);

  return (
    <div className="mx-auto mt-2 min-h-screen max-w-7xl space-y-4 border-2 border-surface p-8">
      {(isAdmin || isStaff) && (
        <button
          onClick={() => router.push(GoToArticleEditPage(article.slug))}
          className="label w-full rounded bg-surface py-2 px-5 hover:bg-main"
        >
          Edit this article
        </button>
      )}
      <div className="flex items-center justify-between font-semibold text-on-surface-unactive">
        {targets && targets.length > 0 && (
          <div className="flex items-center gap-x-2">
            <div>Targets: </div>
            {targets
              .filter((t) => !orgs.includes(t.name))
              .map((t) => (
                <Button
                  key={t.name}
                  info={{
                    style: ButtonStyle.Text,
                    removeMinWidth: true,
                    removePadding: true,
                    label: t.name,
                    labelClasses:
                      'capitalize text-base underline text-on-surface-unactive hover:text-main-light',
                    isALink: GoToTargetPage(t?.name as string),
                  }}
                />
              ))}
          </div>
        )}
        {orgs && orgs.length > 0 && (
          <div className="flex items-center gap-x-2  text-on-surface-unactive">
            <div>Organisations: </div>
            {orgs.map((o) => (
              <Button
                key={o}
                info={{
                  style: ButtonStyle.Text,
                  removeMinWidth: true,
                  removePadding: true,
                  label: o,
                  labelClasses:
                    'capitalize text-base underline text-on-surface-unactive hover:text-main-light',
                  isALink: GoToTargetPage(o as string),
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between font-semibold">
        <div className="flex flex-wrap gap-4">
          {tags
            .filter((tag: string, index: number) => tags.indexOf(tag) === index)
            .map((tag) => {
              return (
                <span
                  key={tag}
                  className="label text-base capitalize text-on-surface-unactive"
                >
                  {tag}
                </span>
              );
            })}
        </div>
        <div className="text-main-light">{`Published on ${article.createdAt
          .toLocaleDateString('en-GB')
          .slice(0, 9)}`}</div>
      </div>
      {(isAdmin || isStaff) && (
        <div className={article.publish ? 'text-success' : 'text-error'}>
          {article.publish ? 'Published' : 'Unpublished'}
        </div>
      )}
      {fileUrl && (
        <div className="flex flex-col flex-wrap content-center text-center">
          <img src={fileUrl} alt="Article Image" width={500}></img>
        </div>
      )}
      <RenderMarkdown className="space-y-6" text={article.content} />
    </div>
  );
}
