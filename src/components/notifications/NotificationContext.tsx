import React, { useEffect, useRef, useState } from 'react';

import { Banner } from './Banner';
import {
  ClientNotification,
  DelayType,
  iNotificationConfig,
  NotificationType,
} from './iNotification';
import { Notification } from './Notification';

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
  function Notify(msg: ClientNotification, config?: iNotificationConfig) {
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
