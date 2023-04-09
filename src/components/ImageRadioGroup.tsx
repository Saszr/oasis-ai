import {
  Box,
  Flex,
  UseRadioProps,
  useRadioGroup,
  useRadio,
  Image,
} from '@chakra-ui/react';
import { useController, Control } from 'react-hook-form';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface ImageTypes {
  [key: string]: string[];
}

const Images: ImageTypes = {
  '2D': ['/images/bridge/connect_wallet_title.webp'],
  '3D': ['/images/bridge/connect_wallet_title.webp'],
};

const RadioCard = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Flex direction={'column'} alignItems="center">
      {props.value && (
        <PhotoProvider>
          {Images[props.value].map((item, index) => (
            <PhotoView key={index} src={item}>
              <Image src={item} alt="" />
            </PhotoView>
          ))}
        </PhotoProvider>
      )}
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
    </Flex>
  );
};

const ImageRadioGroup = ({
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

export default ImageRadioGroup;
