import { Variants } from 'framer-motion';

import { FullBounty } from '@/lib/types';

export function BountyEntry({
  className,
  bounty,
  fullSize = true,
  variants,
}: {
  className?: string;
  bounty: FullBounty;
  fullSize?: boolean;
  variants?: Variants;
}) {
  // const { organization } = useGetOrganizationByName(bounty.target.org.name);

  return <></>;

  // return (
  //   <motion.div
  //     variants={variants}
  //     className={`space-y-1 bt:max-w-xl laptop:max-w-none ${className}`}
  //   >
  //     {/* Org and target into */}
  //     <div className="label-sm flex items-center gap-4 text-on-surface-unactive">
  //       <Link href={GoToOrgPage(organization?.id as string)}>
  //         <span className="hover:text-main-light ">
  //           Related to {bounty.target.org.name}
  //         </span>
  //       </Link>
  //       {fullSize && (
  //         <BountyStat label={`${bounty.requirements.at(0)?.type}s`} />
  //       )}
  //     </div>

  //     {/* Header */}
  //     <div className="flex justify-between w-full items-start ">
  //       <Link href={GoToBountyPage(bounty.id as string)}>
  //         <span
  //           className={`max-w-md hover:underline cursor-pointer w-full ${
  //             fullSize ? 'h7 laptop:h6 ' : 'h7 laptop:h6'
  //           }`}
  //         >
  //           {bounty.title}
  //         </span>
  //       </Link>

  //       <MoreMenu bountyId={bounty.id as string} />
  //     </div>

  //     {/* Stats */}
  //     <div className="flex gap-6 items-center text-on-surface-unactive">
  //       <BountyStat
  //         label={
  //           <div className="flex gap-1 items-center">
  //             <Image
  //               src="/svg/ETHlogo.svg"
  //               height={15}
  //               width={12}
  //               className="tounactive"
  //               alt="Etherium logo"
  //             />
  //             <span>{bounty.wallet.balance}</span>
  //           </div>
  //         }
  //       />

  //       {fullSize && (
  //         <BountyStat
  //           label={`${bounty.submissionsCount} submissions`}
  //           icon="leaderboard"
  //         />
  //       )}

  //       <BountyStat
  //         label={
  //           bounty.closesAt ? `${GetDateInString(bounty.closesAt)}` : `Never`
  //         }
  //         icon="schedule"
  //       />
  //     </div>
  //   </motion.div>
  // );
}
