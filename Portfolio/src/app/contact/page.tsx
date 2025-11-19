import { Heading, Column, Text, Row, Card, Button } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { contact } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    path: contact.path,
  });
}

export default function Contact() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={contact.path}
        title={contact.title}
        description={contact.description}
        image={`${baseURL}/og?title=${encodeURIComponent(contact.title)}`}
      />
      
      <Column fillWidth paddingY="24" gap="xl">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            {contact.title}
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" paddingY="16">
            {contact.description}
          </Text>
        </Column>

        <Row gap="24" wrap="wrap" paddingTop="32">
          <Card
            flex={1}
            minWidth="300"
            padding="32"
            background="surface"
            border="neutral-alpha-medium"
            radius="m"
          >
            <Heading variant="heading-strong-m" paddingBottom="16">
              Contact Information
            </Heading>
            <Column gap="12">
              <Text variant="body-default-m" onBackground="neutral-weak">
                Email: {contact.email}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Phone: {contact.phone}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Address: {contact.address}
              </Text>
            </Column>
          </Card>

          <Card
            flex={1}
            minWidth="300"
            padding="32"
            background="surface"
            border="neutral-alpha-medium"
            radius="m"
          >
            <Heading variant="heading-strong-m" paddingBottom="16">
              {contact.showroom.title}
            </Heading>
            <Column gap="12">
              <Text variant="body-default-m" onBackground="neutral-weak">
                {contact.showroom.hours}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak" paddingBottom="16">
                {contact.showroom.appointment}
              </Text>
              <Button
                variant="primary"
                size="m"
                arrowIcon
                href="mailto:contact@ddoor.com?subject=Showroom%20Appointment%20Request"
              >
                Schedule Appointment
              </Button>
            </Column>
          </Card>
        </Row>
      </Column>
    </Column>
  );
} 