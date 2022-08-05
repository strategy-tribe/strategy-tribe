import React, { useEffect, useRef, useState } from 'react';

import { Banner } from './Banner';
import {
  ClientNotification,
  DelayType,
  iNotificationConfig,
  NotificationType,
} from './iNotification';
import { Pill } from './Pill';

interface NotificationContextInterface {
  isAvailable: boolean;
  hide: () => void;
  notify: (
    notification: ClientNotification,
    config?: iNotificationConfig
  ) => void;
}

const NotificationContext = React.createContext<NotificationContextInterface>({
  isAvailable: false,
  hide: () => {
    return;
  },
  notify: () => {
    return;
  },
});

export const NotificationcontextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //*State
  const [notification, setNotification] = useState<
    ClientNotification | undefined
  >();
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
    let timeoutId: NodeJS.Timeout;
    if (showNotif) {
      if (delayType === DelayType.Time) {
        timeoutId = setTimeout(() => {
          setShowNotif(false);
        }, upTime.current * 1000);
      } else if (delayType === DelayType.Condition && hideCondition) {
        setShowNotif(false);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotif, notification]);

  //!Main method
  function Notify(msg: ClientNotification, config?: iNotificationConfig) {
    //*Notification info
    setNotification(msg);

    //*Notification config
    upTime.current = config?.delayTime ?? 5;
    setCondition(config?.condition ?? false);
    setNotificationType(config?.type ?? NotificationType.Pill);
    setDelayType(config?.delayType ?? DelayType.Time);
    setShowNotif(true);
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
      <Pill
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
