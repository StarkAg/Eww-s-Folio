import { Heading, Column, Text, Row, Card } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { products } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: products.title,
    description: products.description,
    baseURL: baseURL,
    path: products.path,
  });
}

export default function Products() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={products.path}
        title={products.title}
        description={products.description}
        image={`${baseURL}/og?title=${encodeURIComponent(products.title)}`}
      />
      
      <Column fillWidth paddingY="24" gap="xl">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            {products.title}
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" paddingY="16">
            {products.description}
          </Text>
        </Column>

        {products.categories.map((category, index) => (
          <Column key={index} fillWidth gap="l" paddingTop={index === 0 ? "32" : "64"}>
            <Heading variant="display-strong-m">{category.title}</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" maxWidth="m">
              {category.description}
            </Text>
            <Row gap="24" wrap="wrap">
              {category.items.map((item, idx) => (
                <Card
                  key={idx}
                  flex={1}
                  minWidth="280"
                  padding="24"
                  background="surface"
                  border="neutral-alpha-medium"
                  radius="m"
                >
                  <Heading variant="heading-strong-s" paddingBottom="12">{item}</Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Discover our premium {item.toLowerCase()} collection
                  </Text>
                </Card>
              ))}
            </Row>
          </Column>
        ))}
      </Column>
    </Column>
  );
} 