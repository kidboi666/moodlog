import { Container as HOSContainer } from '@/core/components/Container.styleable';
import { H1, styled, YStack } from 'tamagui';

export const Container = styled(HOSContainer, {
  gap: '$4',
});

export const Title = styled(H1);

export const JournalBox = styled(YStack, {
  gap: '$4',
});
