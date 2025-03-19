import { H3, Paragraph, styled, YStack } from 'tamagui';

export const GardenTitleHeaderContainer = styled(YStack, {
  gap: '$2',
});

export const GardenTitle = styled(H3, {
  color: '$gray12',
});

export const GardenDescription = styled(Paragraph, {
  color: '$gray12',
});
