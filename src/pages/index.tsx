import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { TaskView, Welcome } from '@/views';

export default function Page() {
  const router = useRouter();
  const { task_id } = router.query;

  return (
    <>
      <Head>
        <title>Oasis - Create Contract By AI</title>
        <meta name="description" content="Oasis Web3 Connect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" margin="0 auto" minH="full" bg="gray.50">
        {task_id ? <TaskView /> : <Welcome />}
      </Flex>
    </>
  );
}
