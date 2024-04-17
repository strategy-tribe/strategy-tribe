export enum SearchResultType {
  // eslint-disable-next-line no-unused-vars
  Tag = 'Tag',
  // eslint-disable-next-line no-unused-vars
  Organization = 'Organization',
  // eslint-disable-next-line no-unused-vars
  Person = 'Person',
  // eslint-disable-next-line no-unused-vars
  Country = 'Country',
}

export type SearchResult = {
  type: SearchResultType;
  name: string;
};

export type MultipleSubBounties = {
  bountySlug: string;
  invoiceAmount: number;
};
