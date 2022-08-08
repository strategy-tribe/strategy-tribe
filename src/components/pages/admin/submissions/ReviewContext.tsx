import React, { createContext, useContext, useState } from 'react';

import { useGetSubmissions } from '@/lib/hooks/submissionHooks';
import { SubmissionState } from '@/lib/models';
import { Order } from '@/lib/models/queries/Order';
import { SubmissionQueryParams } from '@/lib/models/queries/SubmissionQueryParams';

const AMOUNT_OF_PAGES = 10;

interface AdminReviewInterface {
  submissionFetch: ReturnType<typeof useGetSubmissions>;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (v: number) => void;
  setQuery: (q: SubmissionQueryParams) => void;
  query: SubmissionQueryParams;
  amountOfPages: number;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore`;
const AdminReviewContext = createContext<AdminReviewInterface>();

const AdminReviewContextProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const [query, setQuery] = useState<SubmissionQueryParams>({
    order: Order.Asc,
    states: [SubmissionState.WaitingForReview],
    amount: 10,
    paginate: true,
    page: 0,
  });

  const submissionFetch = useGetSubmissions(query);
  const { hasNextPage, hasPreviousPage, page: currPage } = submissionFetch;

  function nextPage() {
    if (!hasNextPage) return;
    const newLocal = { ...query, page: currPage + 1 };
    setQuery(newLocal);
  }

  function prevPage() {
    if (!hasPreviousPage) return;

    setQuery({ ...query, page: currPage - 1 });
  }

  function goToPage(page: number) {
    if (page < 0 || page > AMOUNT_OF_PAGES) throw 'wron number!';

    setQuery({ ...query, page });
  }

  return (
    <AdminReviewContext.Provider
      value={{
        submissionFetch,
        nextPage,
        prevPage,
        goToPage,
        setQuery,
        query,
        amountOfPages: AMOUNT_OF_PAGES,
      }}
    >
      {children}
    </AdminReviewContext.Provider>
  );
};

//?Exports
export default AdminReviewContextProvider;
export const useAdminReview = () => {
  return useContext(AdminReviewContext);
};
