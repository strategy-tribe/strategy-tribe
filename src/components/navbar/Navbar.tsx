import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { StaffMenu } from './menu/StaffMenu';
import { DarkOverlay } from './utils/DarkOverlay';
import { WorkerMenu } from './menu/WorkerMenu';
import { Button, ButtonInformation } from '../utils/Button';
import { iNavbar } from './models';
import { NavbarLayout } from './NavbarLayout';
import { HomeLink, NavLinks } from './NavLinks';
import { MobileNavLinks } from './MobileNavLinks';
import { useIsInApp } from '@/hooks/useIsInApp';
import { NavSearchbar } from './NavSearchbar';
import Icon, { IconSize } from '../utils/Icon';

export default function Navbar({
  setUp,
  children,
  className,
}: {
  setUp: iNavbar;
  children: React.ReactNode;
  className?: string;
}) {
  const {
    forceHide,
    useBackArrowOnDesktop = false,
    useMobileNavigation = false,
    useNavigation = true,
    setForceHide,
    background = true,
    goBack,
    leftLabel,
    rightButtonInfo,
    useBackArrow,
    useOverflowMenu = true,
  } = setUp;

  //*UI State
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    if (forceHide && setForceHide) {
      setHideNavbar(false);
      setForceHide(false);
    }
  }, [forceHide]);

  useScrollDirection(
    () => setHideNavbar(false),
    () => {
      if (!expandSidebar) setHideNavbar(true);
    },
    100
  );

  const isInApp = useIsInApp();
  const router = useRouter();

  function ManageGoBack() {
    if (goBack) goBack();
    else router.back();
  }

  return (
    <>
      <NavbarLayout hide={hideNavbar} className={`${background && 'bg-black'}`}>
        <nav
          className={` py-2 bt:pr-0  flex justify-between items-center w-full min-h-[62px]`}
        >
          {/* Left side */}
          <div className="flex items-center gap-4 tablet:gap-6 laptop:gap-8">
            {!useBackArrow && !leftLabel && (
              <HomeLink className="laptop:hidden" />
            )}
            {/* nav for mobile */}
            <div
              onClick={useBackArrow ? () => ManageGoBack() : undefined}
              className={`flex items-center gap-6 hover:text-white ${
                useBackArrowOnDesktop ? 'cursor-pointer' : 'laptop:hidden'
              }`}
            >
              {useBackArrow && <GoBackArrow goBack={ManageGoBack} />}
              {!!leftLabel && <span className="label-xl">{leftLabel}</span>}
            </div>

            {useNavigation && <NavLinks />}
          </div>

          <RightSideNav
            useOverflowMenu={useOverflowMenu}
            expandSidebar={expandSidebar}
            setExpandSidebar={setExpandSidebar}
            rightButtonInfo={rightButtonInfo}
          />
        </nav>
      </NavbarLayout>
      <div
        className={`${
          isInApp ? 'pt-2 pb-32 laptop:pb-16 laptop:pt-4' : ''
        } ${className} min-h-screen relative z-0`}
      >
        {children}
      </div>
      <MobileNavLinks show={useMobileNavigation && useNavigation} />
    </>
  );
}

function RightSideNav({
  useOverflowMenu,
  expandSidebar,
  setExpandSidebar,
  rightButtonInfo,
}: {
  useOverflowMenu?: boolean;
  rightButtonInfo?: ButtonInformation[];
  expandSidebar: boolean;
  setExpandSidebar: (b: boolean) => void;
}) {
  const { isStaff, isAuthenticated } = useAuth();
  const isInApp = useIsInApp();

  return (
    <div className="relative z-[60] min-w-[5rem] flex justify-end items-center gap-6">
      {isInApp && useOverflowMenu && (
        <div className="hidden laptop:block">
          <NavSearchbar />
        </div>
      )}

      {/* For mobile */}
      <div className="laptop:hidden flex gap-6 items-center  ">
        {useOverflowMenu && (
          <button
            className="z-50 grid place-items-center"
            onClick={() => setExpandSidebar(true)}
          >
            <Icon className="text-white" icon="more_vert" />
          </button>
        )}
      </div>

      {/* For desktop */}
      <div className="hidden laptop:flex gap-6 items-center">
        {rightButtonInfo &&
          rightButtonInfo.map((btn, i) => {
            return <Button info={btn} key={`button ${i}`} />;
          })}
        {/* Profile button */}
        {useOverflowMenu && isAuthenticated && (
          <button
            className="z-50 grid place-items-center"
            onClick={() => setExpandSidebar(true)}
          >
            <Icon
              icon="account_circle"
              className={` ${expandSidebar ? 'text-dark' : 'text-white'}`}
              size={IconSize.Large}
            />
          </button>
        )}
      </div>
      {isStaff && (
        <StaffMenu
          show={expandSidebar}
          hide={() => setExpandSidebar(false)}
          extraButtons={rightButtonInfo ? [...rightButtonInfo] : []}
        />
      )}
      {!isStaff && (
        <WorkerMenu
          show={expandSidebar}
          hide={() => setExpandSidebar(false)}
          extraButtons={rightButtonInfo ? [...rightButtonInfo] : []}
        />
      )}
      <DarkOverlay
        setShowOverlay={setExpandSidebar}
        showOverlay={expandSidebar}
      />
    </div>
  );
}

function GoBackArrow({ goBack }: { goBack?: () => void }) {
  const router = useRouter();
  function ManageGoBack() {
    if (goBack) goBack();
    else router.back();
  }
  return (
    <button onClick={ManageGoBack} className="grid place-items-center">
      <Icon icon="arrow_back" />
    </button>
  );
}
