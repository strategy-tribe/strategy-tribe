export interface iNotification {
  icon?: string;
  title: string;
  content?: JSX.Element | string;
  style?: NotificationStyle;
}

export enum NotificationStyle {
  default,
  error,
  success,
}

export interface iNotificationConfig {
  delayType: DelayType;
  delayTime: number;
  condition: boolean;
  type: NotificationType;
}

export enum DelayType {
  Time,
  Condition,
}

export enum NotificationType {
  Banner,
  Pill,
}
