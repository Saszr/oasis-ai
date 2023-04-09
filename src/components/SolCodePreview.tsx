import { Box, BoxProps } from '@chakra-ui/react';

function CodeContainer(props: BoxProps) {
  return (
    <Box
      as="pre"
      padding="5"
      rounded="8px"
      my="8"
      bg="#011627"
      {...props}
      minH="200px"
      maxH="500px"
      overflow="auto"
    />
  );
}

export const renderTpl = (tplValues: Record<string, string>) => {
  return `
  pragma solidity ^0.8.0;

  contract ${tplValues.nft_name} is ERC721 {
      using Counters for Counters.Counter;
      Counters.Counter private _tokenIds;
      mapping(uint256 => string) _tokenUris;
      address _owner;

      constructor(string memory name, string memory symbol) ERC721(name, symbol) {
          _owner = msg.sender;
      }

      function mint(address to, string memory tokenURI) payable public returns (uint256){
          if(msg.value > 0) {
              (bool sent, bytes memory data) = payable(_owner).call{value: msg.value}("");
              require(sent, "failed to send to creator of contract.");
          }

          _tokenIds.increment();

          uint256 tokenId = _tokenIds.current();
          require(tokenId <= ${tplValues.nft_num_total}, "token numbers can't be greater than ${tplValues.nft_num_total}.");
          _mint(to, tokenId);
          _setTokenURI(tokenId, tokenURI);

          return tokenId;
      }

      function setTokenURI(uint256 tokenId, string memory tokenURI) public {
          _setTokenURI(tokenId, tokenURI);
      }

      function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
          require(_exists(tokenId), "token doesn't exist.");
          _tokenUris[tokenId] = tokenURI;
      }

      function tokenURI(uint256 tokenId) public view override returns (string memory) {
          require(_exists(tokenId), "token doesn't exist.");

          string memory _tokenURI = _tokenUris[tokenId];

          if (bytes(_tokenURI).length > 0) {
              return _tokenURI;
          }

          return super.tokenURI(tokenId);
      }
  }
  `;
};

export default function SolCodePreview({
  isSolCodeReady,
  tplValues,
}: {
  isSolCodeReady: boolean;
  tplValues: Record<string, string>;
}) {
  return (
    <CodeContainer overflow="hidden" color={'white'}>
      {isSolCodeReady && renderTpl(tplValues)}
    </CodeContainer>
  );
}
