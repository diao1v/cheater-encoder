import React from 'react';
import { Text, Footer as MantineFooter, Group } from '@mantine/core';

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <MantineFooter height={60} p='xs'>
      <Group position='apart' spacing='xl'>
        <Text size='sm'>
          <span className='font-bold'>Last Time:</span>
          0h 25m
        </Text>
        <Text size='sm'>
          <span className='font-bold'>End Time:</span>
          7:51pm
        </Text>
      </Group>
    </MantineFooter>
  );
};

export default Footer;
