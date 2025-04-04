import { SalesRepository } from "@/features/sales/sales.repository";
import { getErrorMessage, markdownToHtml } from "@/utils/function";
import {
  Modal,
  Stack,
  Group,
  TextInput,
  ActionIcon,
  ScrollArea,
  Flex,
  Paper,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAi, IconSend } from "@tabler/icons-react";
import { useState } from "react";

type ModalAIProps = {
  opened: boolean;
  onClose: () => void;
};
export const ModalAI = ({ opened, onClose }: ModalAIProps) => {
  const form = useForm({
    initialValues: {
      question: "",
    },
    validate: {
      question: (value) => {
        if (value.length < 1) {
          return "Question is required";
        }
        return null;
      },
    },
  });

  const [history, setHistory] = useState<
    {
      question?: string;
      answer?: string;
      createdAt: Date;
    }[]
  >([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (values: typeof form.values) => {
    try {
      setIsProcessing(true);

      // Set history question
      setHistory((prev) => [
        ...prev,
        {
          question: values.question,
          createdAt: new Date(),
        },
      ]);

      const result = await SalesRepository.api.askAI({
        question: values.question,
      });

      // Set history answer
      setHistory((prev) => [
        ...prev,
        {
          answer: result.answer,
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    } finally {
      setIsProcessing(false);
      // Reset form
      form.reset();
    }
  };

  return (
    <Modal title="Ask AI" opened={opened} onClose={onClose} 
    size={"100%"}
    centered>
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <Stack>
          <Group gap={"xs"}>
            <TextInput
              placeholder="Ask related to sales report"
              leftSection={<IconAi size={16} />}
              className="grow"
              {...form.getInputProps("question")}
            />
            <ActionIcon
              variant="outline"
              color="teal"
              size="lg"
              disabled={form.values.question.length < 1}
              loading={isProcessing}
              type="submit"
            >
              <IconSend size={16} />
            </ActionIcon>
          </Group>
          <ScrollArea h={400} w={"100%"}>
            <Flex
              direction={"column"}
              gap={"lg"}
              justify={"end"}
              align={"stretch"}
            >
              {history.length === 0 && (
                <Text className="text-center" c={"dimmed"}>
                  No history yet
                </Text>
              )}
              {history.map((item, index) => {
                const text = item.answer ? item.answer : item.question;
                const mappingText = markdownToHtml(text ?? "");
                return (
                  <Paper
                    key={index}
                    withBorder
                    shadow="sm"
                    radius="md"
                    p={"lg"}
                    bg={item.answer ? "teal.0" : "gray.0"}
                  >
                    <div
                      style={{
                        textAlign: item.answer ? "left" : "right",
                        fontWeight: "normal",
                      }}
                      dangerouslySetInnerHTML={{ __html: mappingText }}
                    />
                  </Paper>
                );
              })}
            </Flex>
          </ScrollArea>
        </Stack>
      </form>
    </Modal>
  );
};
