import {
  Box,
  Flex,
  UseRadioProps,
  useRadioGroup,
  useRadio,
} from '@chakra-ui/react';
import { useController, Control } from 'react-hook-form';

const RadioCard = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'gray.600',
          color: 'white',
        }}
        px={5}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const ChainRadioGroup = ({
  name,
  control,
  valuesGroup,
}: {
  name: string;
  control: Control<any, any>;
  valuesGroup: string[];
}) => {
  const { field } = useController({
    name,
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...field,
  });

  const group = getRootProps();

  return (
    <Flex {...group} wrap={'wrap'} gap={2}>
      {valuesGroup.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </Flex>
  );
};

export default ChainRadioGroup;
