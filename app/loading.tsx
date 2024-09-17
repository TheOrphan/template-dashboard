import Image from 'next/image';
import { Flex } from '@mantine/core';

export default function Loading() {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0 }}>
      <Flex
        mih="100vh"
        miw="100vw"
        bg="rgb(255 255 255)"
        gap={{ base: 'xl', md: 100 }}
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Image src="/loading.gif" width={80} height={80} alt="loading..." priority unoptimized />
      </Flex>
    </div>
  );
}
