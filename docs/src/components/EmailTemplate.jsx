import { Html, Body, Text } from '@react-email/components';

export function EmailTemplate({ name, email, message }) {
  return (
    <Html>
      <Body>
        <Text>Nuevo mensaje de {name} ({email}):</Text>
        <Text>{message}</Text>
      </Body>
    </Html>
  );
}
