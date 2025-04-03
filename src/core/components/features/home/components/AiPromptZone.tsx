import { Button, Form, Input, View } from 'tamagui';
import { useState } from 'react';

export const AiPromptZone = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View flex={1} p="$4" bg="$color5" rounded="$8">
      <Form onSubmit={handleSubmit} gap="$4">
        <Input value={text} onChangeText={setText} />
        <Form.Trigger>
          <Button themeInverse>AI에게 보내기</Button>
        </Form.Trigger>
      </Form>
    </View>
  );
};
