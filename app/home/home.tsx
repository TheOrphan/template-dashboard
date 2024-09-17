'use client';

import { Flex, Paper, Title } from '@mantine/core';

export default function Home() {
  return (
    <Paper>
      <Flex gap="xl" align="center" mb="md" wrap="wrap">
        <Title order={1}>THIS IS HOME</Title>
      </Flex>
    </Paper>
  );
}
