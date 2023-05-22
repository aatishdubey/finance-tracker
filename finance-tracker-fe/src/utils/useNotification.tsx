import type { NotificationPlacement } from 'antd/es/notification/interface';
import { notification } from 'antd';

export function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, message: string, description: string, icon?: React.ReactNode, duration = 3) => {
    api.info({
      message,
      description,
      placement,
      duration,
      icon
    });
  };

  return { openNotification, contextHolder };
}