import { readFileSync } from 'fs';
import path from 'path';

/** Reads a file in the public/static folder. You can specify the name of the subfolder. Default is 'data' */
export function ReadFileInDataFolder(fileName: string, folderName = 'data') {
  const dataFolder = path.resolve('public', 'static', folderName, fileName);
  const data = readFileSync(dataFolder);
  const parsedData = JSON.parse(data.toString());
  return parsedData;
}
