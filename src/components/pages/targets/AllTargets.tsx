import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { AppearVariants } from '@/lib/framer/Variants';
import { MapOfTargets } from '@/lib/models/MapOfTargets';

import { Title } from '@/components/utils/Title';

import { SmallTarget } from '@/server/routes/targets/getTargets';

import { Targets } from './Targets';

('@/components/utils/Title');

export const AllTargets = ({ targets }: { targets: SmallTarget[] }) => {
  //*Queries

  //order the targets
  const mapOfTarget: MapOfTargets = useMemo(() => {
    if (!targets) {
      return [];
    }
    const dict: { letter: string; targets: SmallTarget[] }[] = [];

    for (const target of targets) {
      let letter = target.name.charAt(0);
      if (letter === '.') letter = target.name.charAt(1);
      const i = dict.findIndex((x) => x.letter === letter);

      if (i >= 0) dict[i].targets = [...dict[i].targets, target];
      else dict.push({ letter: letter, targets: [target] });
    }
    dict.sort((letter1, letter2) => (letter1.letter < letter2.letter ? -1 : 1));

    return dict;
  }, [targets]);

  return (
    <>
      <motion.div
        className="mx-6 space-y-8 px-4 bt:mr-12 bt:ml-16"
        variants={AppearVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title="Targets" />
        <Targets map={mapOfTarget} />
      </motion.div>
    </>
  );
};
