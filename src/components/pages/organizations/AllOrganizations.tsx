import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { AppearVariants } from '@/lib/framer/Variants';
import { useGetAllOrganizations } from '@/lib/hooks/organizationHooks';
import { MapOfOrgs } from '@/lib/models/MapOfOrgs';

import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';

import { SmallOrg } from '@/server/routes/organizations/getOrgs';

import { Organizations } from './Organizations';

('@/components/utils/Title');

export const AllOrganizations = () => {
  //*Queries
  const { isLoading, organizations } = useGetAllOrganizations();

  //order the orgs
  const mapOfOrg: MapOfOrgs = useMemo(() => {
    if (!organizations) {
      return [];
    }
    const dict: { letter: string; orgs: SmallOrg[] }[] = [];

    for (const org of organizations) {
      let letter = org.name.charAt(0);
      if (letter === '.') letter = org.name.charAt(1);
      const i = dict.findIndex((x) => x.letter === letter);

      if (i >= 0) dict[i].orgs = [...dict[i].orgs, org];
      else dict.push({ letter: letter, orgs: [org] });
    }
    dict.sort((letter1, letter2) => (letter1.letter < letter2.letter ? -1 : 1));

    return dict;
  }, [organizations]);

  return (
    <>
      {isLoading && (
        <div className="col-span-2 grid w-full place-items-center">
          <Loading small={false} />
        </div>
      )}

      {!isLoading && organizations && (
        <motion.div
          className="col-span-2 mx-auto w-full max-w-4xl space-y-8"
          variants={AppearVariants}
          initial="hidden"
          animate="visible"
        >
          <Title title="Organizations" />
          <Organizations map={mapOfOrg} />
        </motion.div>
      )}
    </>
  );
};
