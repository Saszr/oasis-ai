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
  '2D': [
    '/images/Sylvia_an_adorable_comic_white_rooster_a_hammer_inserted_on_the_af275d54-0b31-4c73-91b5-11809654573a.png',
  ],
  '3D': [
    '/images/Sylvia_an_orange_cute_round_cat_with_a_hammer_on_the_top_of_the_7d5271e9-1efd-4d81-8e8b-8745663b47b5.png',
  ],
};

const RadioCard = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Flex direction={'column'} alignItems="center" gap={4} px={3}>
      {props.value && (
        <PhotoProvider>
          {Images[props.value].map((item, index) => (
            <PhotoView key={index} src={item}>
              <Image src={item} alt="" h={'240px'} />
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
    <Flex {...group} gap={2}>
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
