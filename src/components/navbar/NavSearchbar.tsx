import React, { useState } from 'react';
import { GoToSearchPage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams';
import { Order, BountyOrderBy } from '@/lib/models/queryParams';
import Icon from '../utils/Icon';

export function NavSearchbar() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { applyQry: go } = useUrlSearchParams();

  function ManageType(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      go({
        searchTerm: search,
        order: Order.Asc,
        orderBy: BountyOrderBy.CreatedAt,
      });
    }
  }

  if (router.pathname === GoToSearchPage()) return <div></div>;

  return (
    <div className="flex items-center gap-4 border-b-2 border-dark ">
      <Icon icon="search" />
      <input
        type="text"
        value={search}
        onKeyUp={ManageType}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="body border-0 focus:ring-0 focus:border-0 pl-0 bg-black text-white placeholder:text-unactive"
      />
    </div>
  );
}
