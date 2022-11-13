import { Requirement } from '@prisma/client';

import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';

export function BountyCardTags({
  org,
  requirements,
}: {
  org: string;
  requirements: Requirement[];
}) {
  const type = requirements.at(0)?.type;

  const { urlFilter, setUrlFilter } = useUrlSearchParams();

  function addOrgToFilters() {
    setUrlFilter({
      targetNames: [...(urlFilter.query.targetNames ?? []), org],
    });
  }

  return (
    <div className="flex gap-5 pb-2">
      {!!type && <Tag tag={type} />}
      {!!org && <Tag tag={org} onClick={addOrgToFilters} />}
    </div>
  );
}

function Tag({ tag, onClick }: { tag: string; onClick?: () => void }) {
  return (
    <button
      className="label-sm text-left capitalize text-on-surface-unactive"
      onClick={onClick}
    >
      {tag?.length > 14 ? `${tag.slice(0, 28)}...` : tag}
    </button>
  );
}
