import React from "react";
import { Heading, Flex, Text, Button, Column, Badge, Row } from "@/once-ui/components";
import Image from "next/image";
import { baseURL } from "@/app/resources";
import { home, products } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import type { SpacingToken } from "@/once-ui/types";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  const features = [
    {
      image: "/images/features/security.jpg",
      title: "Enhanced Security",
      description: "Our doors are engineered with advanced security features to protect what matters most."
    },
    {
      image: "/images/features/design.jpg",
      title: "Elegant Design",
      description: "Blend aesthetics with functionality through our carefully crafted door designs."
    },
    {
      image: "/images/features/durability.jpg",
      title: "Built to Last",
      description: "Premium materials and expert craftsmanship ensure long-lasting performance."
    },
    {
      image: "/images/features/customization.jpg",
      title: "Custom Solutions",
      description: "Tailor your doors to match your unique style and requirements."
    }
  ];

  const spacing: SpacingToken = "24";

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
      />

      {/* Brand Logo Section */}
      <Flex fillWidth horizontal="center" paddingY="32">
        <div style={{ position: 'relative', width: '200px', height: '80px' }}>
          <Image
            src="/images/logo.png"
            alt="DDOOR Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Flex>

      <Column fillWidth paddingY={spacing} gap="m">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            {home.headline}
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" paddingY="16">
            {home.subline}
          </Text>
          <Row gap="16" paddingTop="32">
            <Button
              id="products"
              href="/products"
              variant="primary"
              size="l"
              arrowIcon
            >
              Explore Our Products
            </Button>
            <Button
              id="contact"
              href="/contact"
              variant="secondary"
              size="l"
              arrowIcon
            >
              Contact Us
            </Button>
          </Row>
        </Column>
      </Column>

      {/* Featured Images with Text */}
      <Column fillWidth gap="xl" paddingTop="48">
        <Heading variant="display-strong-m" paddingBottom="32">Why Choose DDOOR</Heading>
        <Row gap={spacing} wrap>
          {features.map((feature, index) => (
            <Column
              key={index}
              background="surface"
              border="neutral-alpha-medium"
              radius="m"
              padding="0"
              flex={1}
              minWidth={280}
              maxWidth={300}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  style={{
                    borderTopLeftRadius: 'var(--radius-m)',
                    borderTopRightRadius: 'var(--radius-m)',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <Column padding={spacing}>
                <Heading variant="heading-strong-m" paddingBottom="12">
                  {feature.title}
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {feature.description}
                </Text>
              </Column>
            </Column>
          ))}
        </Row>
      </Column>

      <Column fillWidth gap="xl" paddingTop="48">
        <Heading variant="display-strong-m" paddingBottom="32">Our Collections</Heading>
        <Row gap={spacing} wrap>
          {products.categories.map((category, index) => (
            <Column
              key={index}
              background="surface"
              border="neutral-alpha-medium"
              radius="m"
              padding={spacing}
              flex={1}
              minWidth={300}
            >
              <Heading variant="heading-strong-m" paddingBottom="16">{category.title}</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" paddingBottom={spacing}>
                {category.description}
              </Text>
              <Row wrap gap="8">
                {category.items.map((item, idx) => (
                  <Badge key={idx}>
                    {item}
                  </Badge>
                ))}
              </Row>
            </Column>
          ))}
        </Row>
      </Column>
    </Column>
  );
}
