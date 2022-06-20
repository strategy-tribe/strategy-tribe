import Navbar from '@/components/navbar/Navbar';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { AppearVariants } from '@/lib/framer/Variants';
import { useGetAllOrganizations } from '@/lib/hooks/organizationHooks';
import { MapOfOrgs } from '@/lib/models/organizations/MapOfOrgs';
import { Organization } from '@/lib/models/organizations/organization';
import { usePushNotifs } from '@/lib/onesignal/PushNotifsContext';
import { useAuth } from 'auth/AuthContext';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { Organizations } from './Organizations';

export const AllOrganizations = () => {
  //*Scroll
  const [forceHideNav, setForceHideNav] = useState(false);

  //*Queries
  const { organizations, isLoading } = useGetAllOrganizations();

  //*Auth
  const { isAuthenticated: user, isStaff, LogIn } = useAuth();

  const ctaButton: ButtonInformation | undefined = useMemo(() => {
    if (!user)
      return {
        label: 'Connect wallet',
        icon: 'login',
        iconClasses: 'laptop:hidden',
        onClick: () => LogIn(),
        style: ButtonStyle.Hollow,
      };
  }, [user, isStaff]);

  //*push notifs
  const {} = usePushNotifs();

  //*order the orgs
  const mapOfOrg: MapOfOrgs = useMemo(() => {
    const a: { letter: string; orgs: Organization[] }[] = [];

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
    <Navbar
      className="bg-black text-text px-2 max-w-4xl laptop:max-w-5xl mx-auto w-full block laptop:grid grid-cols-3 gap-x-16"
      setUp={{
        goBack: () => {},
        useOverflowMenu: !!user,
        rightButtonInfo: ctaButton ? [ctaButton] : undefined,
        forceHide: forceHideNav,
        setForceHide: setForceHideNav,
        useMobileNavigation: true,
      }}
    >
      {isLoading && (
        <div className="col-span-2 w-full grid place-items-center">
          <Loading fullScreen={false} />
        </div>
      )}

      {!isLoading && organizations && (
        <motion.div
          className="space-y-2 col-span-2 w-full"
          variants={AppearVariants}
          initial="hidden"
          animate="visible"
        >
          <Title title="Organizations" />
          <Organizations map={mapOfOrg} />
        </motion.div>
      )}
    </Navbar>
  );
};
