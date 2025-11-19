import { Heading, Column, Text, Row, Card } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { aboutUs } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: aboutUs.title,
    description: aboutUs.description,
    baseURL: baseURL,
    path: aboutUs.path,
  });
}

export default function About() {
  const values = [
    {
      title: "Quality",
      description: "We use only the finest materials and craftsmanship in every door we create."
    },
    {
      title: "Innovation",
      description: "Continuously developing new technologies and designs to enhance door functionality."
    },
    {
      title: "Security",
      description: "Committed to providing the highest level of security in all our products."
    },
    {
      title: "Sustainability",
      description: "Environmentally conscious manufacturing and sustainable material sourcing."
    }
  ];

  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={aboutUs.path}
        title={aboutUs.title}
        description={aboutUs.description}
        image={`${baseURL}/og?title=${encodeURIComponent(aboutUs.title)}`}
      />
      
      <Column fillWidth paddingY="24" gap="xl">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            {aboutUs.title}
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" paddingY="16">
            {aboutUs.description}
          </Text>
        </Column>

        <Column fillWidth gap="l">
          <Heading variant="display-strong-m">Our Story</Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" maxWidth="m">
            {aboutUs.intro.description}
          </Text>
        </Column>

        <Column fillWidth gap="l" paddingTop="32">
          <Heading variant="display-strong-m">Our Values</Heading>
          <Row gap="24" wrap="wrap">
            {values.map((value, index) => (
              <Card
                key={index}
                flex={1}
                minWidth="250"
                padding="24"
                background="surface"
                border="neutral-alpha-medium"
                radius="m"
              >
                <Heading variant="heading-strong-s" paddingBottom="12">
                  {value.title}
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {value.description}
                </Text>
              </Card>
            ))}
          </Row>
        </Column>
      </Column>
    </Column>
  );
}
