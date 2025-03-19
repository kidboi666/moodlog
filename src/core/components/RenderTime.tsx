import { Text, TextProps } from 'tamagui';

interface Props extends TextProps {
  createdAt: string;
}

export const RenderTime = Text.styleable<Props>(
  ({ createdAt, ...props }, ref) => {
    const date = new Date(createdAt);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const timestamp = `${hours}: ${minutes}`;
    return (
      <Text ref={ref} {...props}>
        {timestamp}
      </Text>
    );
  },
);
