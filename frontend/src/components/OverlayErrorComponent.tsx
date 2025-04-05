import { Overlay, Stack, Card, CardSection } from "@mantine/core";

type OverlayErrorProps = {
  error: Error | null;
  show?: boolean;
};
export const OverlayError = ({ error, show = false }: OverlayErrorProps) => {
  if (!show) return null;
  return (
    <Overlay>
      <Stack align="center" justify="center" h={"100%"}>
        <Card bg={"red.0"}>
          <CardSection withBorder inheritPadding py="xs" bg={"red"} c={"white"}>
            Error
          </CardSection>
          <Stack p={"lg"} align="center" justify="center">
            <p>{error?.message}</p>
          </Stack>
        </Card>
      </Stack>
    </Overlay>
  );
};
