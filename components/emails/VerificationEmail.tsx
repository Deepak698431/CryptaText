import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Preview,
  Tailwind
} from "@react-email/components";

interface VerifyEmailProps {
  username: string;
  verifyCode: string;
}

export default function VerificationEmail({
  username,
  verifyCode
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email</Preview>

      <Tailwind>
        <Body className="bg-gray-100 py-10">
          <Container className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            
            <Heading className="text-2xl font-bold text-gray-800">
              Hello {username} 👋
            </Heading>

            <Text className="text-gray-600 mt-4">
              Thanks for signing up! Please verify your email by clicking the button below.
            </Text>
            <h1>{verifyCode}</h1>
            
            <Text className="text-xs text-gray-400 mt-6">
              If you didn’t create this account, you can safely ignore this email.
            </Text>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
