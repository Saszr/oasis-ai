import {
  FormControl,
  FormLabel,
  Heading,
  Text,
  Button,
  Flex,
  Input,
  Stack,
  HStack,
  Tag,
  Box,
  Divider,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { useKeyPress } from 'ahooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useImmer } from 'use-immer';
import axios from 'axios';
import { ethers } from 'ethers';
import { useSigner } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

import {
  MotionBox,
  ChainRadioGroup,
  ImageRadioGroup,
  SolCodePreview,
} from '@/components';
import { renderTpl } from '@/components/SolCodePreview';

const colorScheme = [
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
  'red',
  'gray',
];

function StatusLabel({
  status = false,
  children,
}: {
  status?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Flex gap={1} alignItems={'center'}>
      <Flex maxW={6} w="full" justifyContent={'center'}>
        {status ? (
          <MotionBox>
            <CheckIcon boxSize={4} color="green.500" />
          </MotionBox>
        ) : (
          <MotionBox>
            <SmallCloseIcon boxSize={6} color="red.500" />
          </MotionBox>
        )}
      </Flex>
      <Text>{children}</Text>
    </Flex>
  );
}

export default function AutoCreateContract() {
  const date = dayjs().format('YYYY年MM月DD日 H:mm');
  const [isSolCodeReady, setSolCodeReady] = useState(false);
  const [isCreateLoading, setCreateLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);

  const [deployInfo, updateDeployInfo] = useImmer<Record<string, string>>({
    address: '',
    txHash: '',
  });

  const [btnStatus, updateBtnStatus] = useImmer({
    create: false,
    deploy: false,
  });

  const [status, updateStatus] = useImmer({
    nft_name: false,
    chain: true,
    nft_style: true,
    nft_attribute: true,
    nft_attribute_total: true,
    nft_num_total: true,
    mint_price: false,
    creator_revenue_sharing: true,
  });

  const { control, watch, register, setValue, getValues } = useForm({
    defaultValues: {
      nft_name: '',
      chain: 'ETH',
      nft_style: '',
      nft_attribute_total: '40',
      nft_num_total: '100',
      mint_price: '',
      creator_revenue_sharing: '5',
    },
  });

  useKeyPress('ctrl.7', () => {
    setValue('nft_style', '2D');
  });

  useKeyPress('ctrl.8', () => {
    setValue('nft_name', 'Tool_Man');
  });

  useKeyPress('ctrl.9', () => {
    setValue('mint_price', '0');
  });

  useKeyPress('ctrl.0', () => {
    handleCreate();
  });

  const handleCreate = () => {
    setCreateLoading(true);
    setTimeout(() => {
      setCreateLoading(false);
      setSolCodeReady(true);
      updateBtnStatus((draft) => {
        draft.deploy = true;
      });
    }, 3000);
  };

  const { open } = useWeb3Modal();
  const { data: signer } = useSigner();

  const deployContract = (abiStr: string, binStr: string) => {
    if (signer) {
      setDeployLoading(true);

      const abi = JSON.parse(abiStr);
      const bin = binStr;
      const { nft_name } = getValues();

      const factory = new ethers.ContractFactory(abi, bin, signer);

      factory
        .deploy(nft_name, 'TM')
        .then((contract) => {
          setDeployLoading(false);

          console.log(contract.address);
          console.log(contract.deployTransaction.hash);

          updateDeployInfo({
            address: contract.address,
            txHash: contract.deployTransaction.hash,
          });

          window.open(`https://etherscan.io/address/${contract.address}`);
        })
        .catch(() => {
          setDeployLoading(false);
        });
    } else {
      open({ route: 'ConnectWallet' });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        if (value[name] !== '') {
          updateStatus((draft) => {
            draft[name] = true;
          });
        } else {
          updateStatus((draft) => {
            draft[name] = false;
          });
        }

        if (Object.values(value).every((val) => val !== '')) {
          updateBtnStatus((draft) => {
            draft.create = true;
          });
        } else {
          setSolCodeReady(false);
          updateBtnStatus((draft) => {
            draft.create = false;
            draft.deploy = false;
          });
          updateDeployInfo({
            address: '',
            txHash: '',
          });
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Flex
      direction={'column'}
      gap={8}
      maxW="3xl"
      w="full"
      rounded={'lg'}
      bg="white"
      boxShadow={'lg'}
      p={8}
      mb={14}
    >
      <Stack>
        <Heading fontSize={'2xl'}> 任务：发一套由《电锯人》启发的 NFT</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          任务创建时间：{date}
        </Text>
      </Stack>

      <Flex alignItems={'center'} justifyContent="center" gap={4}>
        <Divider borderColor={'gray.700'} maxW="100px" />
        <Text fontSize={'xl'} fontWeight="bold">
          第一步：生成 NFT 设定
        </Text>
        <Divider borderColor={'gray.700'} maxW="100px" />
      </Flex>

      <Stack spacing={4}>
        <FormControl>
          <Flex justifyItems={'center'} alignItems="center">
            <FormLabel w={'120px'}>
              <StatusLabel status={status.nft_name}>NFT 名称</StatusLabel>
            </FormLabel>
            <Box>
              <Input id="nft_name" {...register('nft_name')} />
            </Box>
          </Flex>
        </FormControl>

        <FormControl>
          <Flex justifyItems={'center'} alignItems="center">
            <FormLabel w={'120px'}>
              <StatusLabel status={status.chain}>公链</StatusLabel>
            </FormLabel>
            <ChainRadioGroup
              name="chain"
              control={control}
              valuesGroup={['ETH']}
            />
          </Flex>
        </FormControl>

        <FormControl>
          <FormLabel>
            <StatusLabel status={status.nft_style}>风格</StatusLabel>
          </FormLabel>
          <ImageRadioGroup
            name="nft_style"
            control={control}
            valuesGroup={['2D', '3D']}
          />
        </FormControl>

        <FormControl id="nft_attribute">
          <FormLabel>
            <StatusLabel status={status.nft_attribute}>属性分类</StatusLabel>
          </FormLabel>
          <HStack spacing={4}>
            {['动物 *5', '身体颜色 *10', '头上的工具 *10', '背景 *10'].map(
              (val, index) => (
                <Tag
                  size="lg"
                  key={index}
                  variant="solid"
                  colorScheme={colorScheme[index]}
                >
                  {val}
                </Tag>
              ),
            )}
          </HStack>
        </FormControl>

        <FormControl>
          <Flex justifyItems={'center'} alignItems="center">
            <FormLabel w={'130px'}>
              <StatusLabel status={status.nft_attribute_total}>
                属性总数
              </StatusLabel>
            </FormLabel>
            <Box>
              <Input
                id="nft_attribute_total"
                {...register('nft_attribute_total')}
              />
            </Box>
          </Flex>
        </FormControl>

        <FormControl>
          <Flex justifyItems={'center'} alignItems="center">
            <FormLabel w={'130px'}>
              <StatusLabel status={status.nft_num_total}>NFT 总数</StatusLabel>
            </FormLabel>
            <Box>
              <Input id="nft_num_total" {...register('nft_num_total')} />
            </Box>
          </Flex>
        </FormControl>

        <FormControl>
          <Flex justifyItems={'center'} alignItems="center">
            <FormLabel w={'130px'}>
              <StatusLabel status={status.mint_price}>铸造价格</StatusLabel>
            </FormLabel>
            <Box>
              <Input id="mint_price" {...register('mint_price')} />
            </Box>
          </Flex>
        </FormControl>

        <FormControl>
          <Flex justifyItems={'center'} alignItems="center">
            <FormLabel w={'130px'}>
              <StatusLabel status={status.creator_revenue_sharing}>
                创作者分成
              </StatusLabel>
            </FormLabel>

            <Box maxW={'200px'}>
              <InputGroup>
                <Input
                  id="creator_revenue_sharing"
                  {...register('creator_revenue_sharing')}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </Box>
          </Flex>
        </FormControl>
      </Stack>

      <Flex alignItems={'center'} justifyContent="center" gap={4}>
        <Divider borderColor={'gray.700'} maxW="100px" />
        <Text fontSize={'xl'} fontWeight="bold">
          第二步：生成部署合约
        </Text>
        <Divider borderColor={'gray.700'} maxW="100px" />
      </Flex>

      <Stack spacing={4}>
        <Box>
          <Button
            variant="outline"
            onClick={() => {
              handleCreate();
            }}
            color="gray.500"
            borderRadius={'10px'}
            py={2}
            isDisabled={!btnStatus.create}
            isLoading={isCreateLoading}
          >
            生成合约代码
          </Button>
        </Box>

        <SolCodePreview
          isSolCodeReady={isSolCodeReady}
          tplValues={getValues()}
        />

        <Box>
          <Button
            variant="outline"
            onClick={async () => {
              updateDeployInfo({
                address: '',
                txHash: '',
              });

              const values = getValues();

              const bodyFormData = new FormData();
              bodyFormData.append('name', values.nft_name);
              bodyFormData.append('solcode', renderTpl(values));

              const { data } = await axios({
                method: 'post',
                url: 'https://aibk.oasis.world/api/v1/compile',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData,
              });

              deployContract(data.data.abi, data.data.bin);
            }}
            color="gray.500"
            borderRadius={'10px'}
            py={2}
            isDisabled={!btnStatus.deploy}
            isLoading={deployLoading}
          >
            部署合约
          </Button>
        </Box>

        <Stack spacing={1} pl={4}>
          {deployInfo.address !== '' &&
            Object.keys(deployInfo).map((key, index) => {
              return (
                <Flex key={index} gap={2}>
                  <Text as="i" fontSize={'sm'} color={'gray.600'}>
                    {`${key}:`}
                  </Text>
                  <Text fontSize={'sm'} color={'gray.600'}>
                    {deployInfo[key]}
                  </Text>
                </Flex>
              );
            })}
        </Stack>
      </Stack>
    </Flex>
  );
}
