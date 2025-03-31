import { Container as HOSContainer } from '@/core/components/shared/Container.styleable';
import { H1, styled, YStack } from 'tamagui';

export const ScrollViewContainer = styled(HOSContainer.ScrollView, {
  gap: '$4',
});

export const Title = styled(H1);

export const JournalBox = styled(YStack, {
  gap: '$4',
});
