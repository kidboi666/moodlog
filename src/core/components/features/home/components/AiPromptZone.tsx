import { Button, Form, Input, Paragraph, Spinner, View } from 'tamagui';
import { useEffect, useState } from 'react';
import { getGemini } from '@/lib/gemini';

export const AiPromptZone = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const gemini = getGemini();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await gemini.getComfortPrompt(text);
      setAiResponse(result.text || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    gemini.initialize();
  }, []);

  return (
    <View flex={1} p="$4" bg="$color5" rounded="$8">
      <Form onSubmit={handleSubmit} gap="$4">
        <Input value={text} onChangeText={setText} />
        {isLoading && <Spinner />}
        {aiResponse && (
          <View>
            <Paragraph>{aiResponse}</Paragraph>
          </View>
        )}
        <Form.Trigger asChild>
          <Button themeInverse>AI에게 보내기</Button>
        </Form.Trigger>
      </Form>
    </View>
  );
};
