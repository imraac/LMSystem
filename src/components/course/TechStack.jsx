import React from 'react';
import { Box, Heading, HStack, Tag, Grid, Icon } from '@chakra-ui/react';
import { FaCode } from 'react-icons/fa';

const TechStack = ({ techStack }) => {
  if (!techStack || techStack.length === 0) return null;

  return (
    <Box>
      <Heading as="h2" size="lg" marginBottom={4}>TECH STACK</Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="lg" border="1px" borderColor="gray.200">
        <HStack spacing={4} mb={4}>
          <Icon as={FaCode} color="#FF6247" boxSize={6} />
          <Heading as="h2" size="lg" color="#FF6247">
            Tech Stack
          </Heading>
        </HStack>
        <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={4}>
          {techStack.map((tech, index) => (
            <Box key={index} textAlign="center">
              <Tag
                size="lg"
                variant="solid"
                colorScheme="red"
                borderRadius="full"
                px={4}
                py={2}
                fontWeight="medium"
                bg="#FF6247"
                color="white"
                mt={2}
              >
                {tech}
              </Tag>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TechStack;
