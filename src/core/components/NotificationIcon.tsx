import React, { memo } from 'react';
import * as S from './NotificationIcon.styled';

interface Props {
  showDraftNotification: boolean;
}

export const NotificationIcon = memo(({ showDraftNotification }: Props) => {
  return <S.Circle showDraftNotification={showDraftNotification} />;
});
