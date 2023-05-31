import { BountyState, RequirementType } from '@prisma/client';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];

type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Flatten<T> = Pick<T, NonObjectKeysOf<T>> &
  UnionToIntersection<ObjectValuesOf<T>>;

export type FlatterFilters = Flatten<GetBountiesParams>;

export const QueryToParams = function (
  query: FlatterFilters
): GetBountiesParams {
  const countries: string[] | undefined = query.countries
    ? typeof query?.countries === 'string'
      ? [query.countries]
      : [...query.countries]
    : undefined;

  const types: RequirementType[] | undefined = query.types
    ? typeof query?.types === 'string'
      ? [query.types]
      : [...query.types]
    : undefined;

  const states: BountyState[] | undefined = query.states
    ? typeof query?.states === 'string'
      ? [query.states]
      : [...query.states]
    : undefined;

  const orgName: string[] | undefined = query.orgName
    ? typeof query?.orgName === 'string'
      ? [query.orgName]
      : [...query.orgName]
    : undefined;

  const targetNames: string[] | undefined = query.targetNames
    ? typeof query?.targetNames === 'string'
      ? [query.targetNames]
      : [...query.targetNames]
    : undefined;

  const tags: string[] | undefined = query.tags
    ? typeof query?.tags === 'string'
      ? [query.tags]
      : [...query.tags]
    : undefined;

  const amount = parseInt((query.amount as unknown as string) ?? 18);

  const page = parseInt((query.page as unknown as string) ?? 0);

  const params: GetBountiesParams = {
    ...query,
    page,
    countries,
    types,
    states,
    orgName,
    tags,
    targetNames,
    amount,
  };
  return params;
};

export const ParamsToQuery = function (
  params: GetBountiesParams
): FlatterFilters {
  //** Removes undefined values */
  const entries = Object.entries(params).filter((entry) => !!entry[1]);

  const obj: Record<string, string | number | boolean | string[]> = {};
  for (const entry of entries) {
    const key = entry[0];
    const value = entry[1];
    obj[key] = value;
  }

  return obj;
};
