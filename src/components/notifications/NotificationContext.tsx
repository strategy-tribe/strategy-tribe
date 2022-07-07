import { GoToBountiesPage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Banner } from './Banner';
import {
  DelayType,
  iNotification,
  iNotificationConfig,
  NotificationType,
} from './iNotification';
import { Notification } from './Notification';

interface NotificationContextInterface {
  isAvailable: boolean;
  hide: () => void;
  notify: (notification: iNotification, config?: iNotificationConfig) => void;
}

const NotificationContext = React.createContext<NotificationContextInterface>({
  isAvailable: false,
  notify: () => {},
  hide: () => {},
});

export const NotificationcontextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //*Route
  const router = useRouter();

  //*State
  const [notification, setNotification] = useState<iNotification | undefined>();
  const [showNotif, setShowNotif] = useState(false);

  //*Notification config
  const upTime = useRef(3);
  const [delayType, setDelayType] = useState<DelayType>(DelayType.Time);

  const [notificationType, setNotificationType] = useState(
    NotificationType.Pill
  );

  const [hideCondition, setCondition] = useState<boolean | undefined>();

  //*Effects
  useEffect(() => {
    if (showNotif) {
      if (delayType === DelayType.Time) {
        setTimeout(() => {
          setShowNotif(false);
        }, upTime.current * 1000);
      } else if (delayType === DelayType.Condition && hideCondition) {
        setShowNotif(false);
      }
    }
  }, [notification, showNotif, hideCondition, delayType, notificationType]);

  //!Main method
  function Notify(msg: iNotification, config?: iNotificationConfig) {
    //*Notification info
    setNotification(msg);

    //*Notification config
    let _delayTime = 3;
    let _condition = false;
    let _notificationType = NotificationType.Pill;
    let _delayType = DelayType.Time;
    if (config) {
      _delayTime = config.delayTime;
      _condition = config.condition;
      _notificationType = config.type;
      _delayType = config.delayType;
    }
    upTime.current = _delayTime;
    setDelayType(_delayType);
    setCondition(_condition);
    setNotificationType(_notificationType);
    //check if the user is in the app...
    setShowNotif(router.pathname.includes(GoToBountiesPage()));
  }

  return (
    <NotificationContext.Provider
      value={{
        isAvailable: !showNotif,
        notify: Notify,
        hide: () => setShowNotif(false),
      }}
    >
      <Banner
        notif={notification}
        show={notificationType === NotificationType.Banner && showNotif}
        close={() => setShowNotif(false)}
      />
      {children}
      <Notification
        notif={notification}
        show={notificationType === NotificationType.Pill && showNotif}
        close={() => setShowNotif(false)}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return React.useContext(NotificationContext);
};
