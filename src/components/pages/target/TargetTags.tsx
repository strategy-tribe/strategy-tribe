import { Tag } from '@prisma/client';

import { useTargetContext } from './TargetContext';

export function TargetTags() {
  const { target } = useTargetContext();
  const tags = target.bounties
    .reduce((acc: Tag[], b) => acc.concat(b.tags), [] as Tag[])
    .concat(target.org?.tags ?? [])
    .map((tag) => tag.name);

  return (
    <div className="flex flex-wrap gap-4">
      {tags
        .filter((tag: string, index: number) => tags.indexOf(tag) === index)
        .map((tag) => {
          return (
            <span
              key={tag}
              className="label capitalize text-on-surface-unactive"
            >
              {tag}
            </span>
          );
        })}
    </div>
  );
}
