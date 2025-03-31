import { H1, styled, YStack } from 'tamagui';
import { ViewContainer as HOSContainer } from '@/core/components/shared/ViewContainer.styleable';

export const ViewContainer = styled(HOSContainer, {
  gap: '$4',
});

export const Title = styled(H1);

export const JournalBox = styled(YStack, {
  gap: '$4',
});
