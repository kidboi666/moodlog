import { Button, H5, styled, Text, View, YStack } from 'tamagui';

export const ViewContainer = styled(View, {
  animation: 'quick',
  animateOnly: ['opacity'],
  flex: 1,
  justify: 'space-between',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

const GapBox = styled(YStack, {
  gap: '$2',
});

const TitleText = styled(H5, {
  fontWeight: '800',
});

const DescriptionText = styled(Text, {
  color: '$gray11',
});

export const DaysSinceSignupBox = styled(GapBox);

export const DaysSinceSignupTitle = styled(TitleText);

export const DaysSinceSignupDescription = styled(DescriptionText);

export const FrequencyBox = styled(GapBox);

export const FrequencyTitle = styled(TitleText);

export const FrequencyDescription = styled(DescriptionText);

export const MostDayBox = styled(GapBox);

export const MostDayTitle = styled(TitleText);

export const MostDayDescription = styled(DescriptionText);

export const ExpressiveMonthBox = styled(GapBox);

export const ExpressiveMonthTitle = styled(TitleText);

export const ExpressiveMonthDescription = styled(DescriptionText);

export const MinimizeButton = styled(Button, {
  unstyled: true,
  self: 'flex-end',
  opacity: 0.2,
  scaleIcon: 1.5,
});
