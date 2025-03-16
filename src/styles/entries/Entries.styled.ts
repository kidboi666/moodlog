import { Container as HOSContainer } from '@/components/layouts/containers/Container';
import { H1, styled, YStack } from 'tamagui';

export const Container = styled(HOSContainer, {
  gap: '$4',
});

export const Title = styled(H1);

export const JournalWrapper = styled(YStack, {
  gap: '$4',
});
