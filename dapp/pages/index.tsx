import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import {useEffect, useState} from "react";
import { useAccount } from "../hooks";
import { useCaver } from "../hooks";
import { Button, Flex, useDisclosure,Text } from "@chakra-ui/react";
import MintingModal from "../components/MintingModal";

const Home: NextPage = () => {
  const { account } = useAccount();
    const [remainGemTokens, setRemainGemTokens] = useState<number>(0);

  const { caver, mintGemTokenContract, saleGemTokenContract } = useCaver();
  const { isOpen, onOpen, onClose } = useDisclosure();

    const getRemainGemTokens = async () => {
        try {
            if (!mintGemTokenContract) return;

            const response = await mintGemTokenContract.methods.totalSupply().call();

            setRemainGemTokens(100 - parseInt(response, 10));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRemainGemTokens();
    }, [mintGemTokenContract]);

  return (
      <>
        <Flex
            bg="red.100"
            minH="100vh"
            justifyContent="center"
            alignItems="center"
            direction="column"
        >
            <Text mb={4}>남은 민팅 개수 : {remainGemTokens}</Text>


            <Button colorScheme="pink" onClick={onOpen}>
            Minting
          </Button>
        </Flex>
          <MintingModal
              isOpen={isOpen}
              onClose={onClose}
              getRemainGemTokens={getRemainGemTokens}
          />
      </>
  );
};

export default Home;