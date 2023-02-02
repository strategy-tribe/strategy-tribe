import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { addToDb } from '@/server/importer/add';
import { scrapOrganizations, scrapTargets } from '@/server/importer/scrapSheet';
import { staffOnlyProcedure } from '@/server/procedures';

const PostBountiesSchema = z.object({
  targets: z.string(),
  orgs: z.string(),
});

/** Params necessary to call `postBounties`  */
export type PostBountiesParams = z.infer<typeof PostBountiesSchema>;

/** Response to adding Bounties */
export type PostBountiesResponse = NonNullable<
  ThenArg<ReturnType<typeof postBounties>>
>;

const ORG_DEFAULT =
  'name,alsoKnownAs,tags,countries,bio,why,links,types,bountyConfig\n';
const TARGET_DEFAULT =
  'name,organizationName,alsoKnownAs,tags,bio,types,bountyConfig\n';

export const postBounties = staffOnlyProcedure
  .input(PostBountiesSchema)
  .mutation(async ({ input, ctx }) => {
    const targets = scrapTargets(parseToArray(input.targets));
    const orgs = scrapOrganizations(parseToArray(input.orgs));
    const { orgIssues, targetIssues } = await addToDb(
      ctx.prisma,
      orgs,
      targets
    );
    const errors = targetIssues
      .map(
        (issue) =>
          `Target:${issue.data.name} - ${
            (issue.error as unknown as any).message
          }`
      )
      .concat(
        orgIssues.map(
          (issue) =>
            `Organisation:${issue.data.name} - ${
              (issue.error as unknown as any).message
            }`
        )
      );
    return {
      targets:
        targetIssues.length === 0
          ? TARGET_DEFAULT
          : parseToCSV(targetIssues.map((issues) => issues.data)),
      orgs:
        orgIssues.length === 0
          ? ORG_DEFAULT
          : parseToCSV(orgIssues.map((issues) => issues.data)),
      errors,
      totalData: [...targets, ...orgs].length,
    };
  });

const parseToCSV = (data: any[]) => {
  const json = data;
  const fields = Object.keys(json[0]);
  const replacer = function (value: string | string[]) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '';
      }
      if (value.length === 1) {
        return value[0].replaceAll('"', '""');
      }
      return `"${value.join(',').replaceAll('"', '""')}"`;
    }
    if (!value) {
      return '';
    }
    if (value.includes(',')) {
      return `"${value.replaceAll('"', '""')}"`;
    }
    return value.replaceAll('"', '""');
  };
  const csv = json.map(function (row: any) {
    return fields
      .map(function (fieldName) {
        if (fieldName === 'types' && row[fieldName].length === 0) return 'none';
        return replacer(row[fieldName]);
      })
      .join(',');
  });
  csv.unshift(fields.join(','));
  return csv.join('\r\n');
};

const parseToArray = (data: string) => {
  const dataString = data
    .replaceAll(',"""', ',"++')
    .replaceAll('""",', '++",')
    .replaceAll('""', '++');
  let parsedString = '';
  let flag = 0;
  for (let ch of dataString) {
    if (ch === '"' && flag === 0) {
      flag = 1;
    } else if (ch === '"' && flag == 1) flag = 0;
    if (ch === ',' && flag === 0) ch = '||';
    if (ch === '\n' && flag === 0) ch = '##';
    if (ch !== '"') parsedString += ch;
  }

  const lines = parsedString.replaceAll('++', '"').split('##');
  const result = lines.map((line) => line.split('||'));
  return result;
};
