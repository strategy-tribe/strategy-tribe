import { SmallTarget } from '@/server/routes/targets/getTargets';

export type MapOfTargets = {
  letter: string;
  targets: SmallTarget[];
}[];
