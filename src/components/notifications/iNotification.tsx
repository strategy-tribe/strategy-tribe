import { ReactNode } from 'react';

export interface ServerNotification {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;
  urlCallback: string;
}

type CallableComponent = (onClose: () => void) => ReactNode | string;
export interface ClientNotification {
  icon?: string;
  title: string;
  content?: CallableComponent | string;
  style?: NotificationStyle;
}

export enum NotificationStyle {
  default,
  error,
  success,
  main,
  dark,
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
