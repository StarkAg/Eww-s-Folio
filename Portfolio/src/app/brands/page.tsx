import { Heading, Column, Text, Row, Card } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { brands } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: brands.title,
    description: brands.description,
    baseURL: baseURL,
    path: brands.path,
  });
}

export default function Collections() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={brands.path}
        title={brands.title}
        description={brands.description}
        image={`${baseURL}/og?title=${encodeURIComponent(brands.title)}`}
      />
      
      <Column fillWidth paddingY="24" gap="xl">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            {brands.title}
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" paddingY="16">
            {brands.description}
          </Text>
        </Column>

        <Row gap="24" wrap="wrap" paddingTop="32">
          {brands.collections.map((collection, index) => (
            <Card
              key={index}
              flex={1}
              minWidth="300"
              padding="32"
              background="surface"
              border="neutral-alpha-medium"
              radius="m"
            >
              <Heading variant="heading-strong-m" paddingBottom="16">
                {collection.name}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {collection.description}
              </Text>
            </Card>
          ))}
        </Row>
      </Column>
    </Column>
  );
} 