import { ReactNode } from 'react';

export interface ServerNotification {
  id: string;
  userId: string;
  message: string;
  type: string;
  createdAt: Date;
  read: boolean;
  url: string;
}

export interface ClientNotification {
  icon?: string;
  title: string;
  content?: ReactNode | string;
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
