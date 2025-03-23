import React, { memo, useMemo } from 'react';
import { useDraft } from '@/core/store/contexts/draft.context';
import * as S from './NotificationIcon.styled';

export const NotificationIcon = memo(() => {
  const { mood } = useDraft();

  const showDraftNotification = useMemo(
    () => Boolean(mood?.type),
    [mood?.type],
  );

  return <S.Circle showDraftNotification={showDraftNotification} />;
});
