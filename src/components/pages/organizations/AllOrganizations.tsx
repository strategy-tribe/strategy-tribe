import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';
import { AppearVariants } from '@/lib/framer/Variants';
import { useGetAllOrganizations } from '@/lib/hooks/organizationHooks';
import { MapOfOrgs } from '@/lib/models/MapOfOrgs';
import { FullOrganization } from '@/lib/types';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Organizations } from './Organizations';



('@/components/utils/Title');

export const AllOrganizations = () => {
  //*Queries
  const { organizations, isLoading } = useGetAllOrganizations();

  //order the orgs
  const mapOfOrg: MapOfOrgs = useMemo(() => {
    const a: { letter: string; orgs: FullOrganization[] }[] = [];

    for (const org of organizations) {
      let letter = org.name.charAt(0);
      if (letter === '.') letter = org.name.charAt(1);
      const i = a.findIndex((x) => x.letter === letter);

      if (i >= 0) a[i].orgs = [...a[i].orgs, org];
      else a.push({ letter: letter, orgs: [org] });
    }

    return a;
  }, [organizations]);

  return (
    <>
      {isLoading && (
        <div className="grid w-full col-span-2 place-items-center">
          <Loading small={false} />
        </div>
      )}

      {!isLoading && organizations && (
        <motion.div
          className="w-full max-w-4xl col-span-2 mx-auto space-y-8"
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
