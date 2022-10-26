import fs from 'fs';
import { resolve } from 'path';
import { isArray } from 'util';

import { IND_PREFIX, LOG, ORG_PREFIX } from './utils';

const FILE_NAME = resolve(
  __dirname.replace('/.next/server', ''),
  `/public/static/sheet_data.json`
);

export async function DownloadData() {
  const url = process.env.GOOGLE_SHEET_URL as string;
  if (!url) {
    throw new Error('Google sheet url undefined');
  }

  LOG('Downloading data');
  const res = await fetch(url);
  const data = await res.json();

  if (!data || !isArray(data.sheets)) {
    throw new Error('No data found in sheet');
  }

  LOG('Writing data');
  const sheets = data.sheets as any[];
  const rawData = sheets
    .filter((s) => {
      const title = s.properties.title;
      return title.startsWith(IND_PREFIX) || title.startsWith(ORG_PREFIX);
    })
    .map((sheet) => {
      const title = sheet.properties.title;
      const rows = (sheet.data[0].rowData as any[])
        .filter((x) => x.values)
        .map((x) => {
          const values = x.values as { formattedValue?: string }[];

          const row = values.map(
            (value: any) => (value.formattedValue as string) ?? ''
          );

          return row;
        });
      return { sheet_name: title, rowsData: rows };
    });
  fs.writeFileSync(FILE_NAME, JSON.stringify(rawData, null, 2));
  LOG('Wrote data');
}
