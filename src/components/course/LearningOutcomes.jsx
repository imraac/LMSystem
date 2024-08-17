import React from 'react';
import { Box, Heading, VStack, Text, HStack, Grid, Icon } from '@chakra-ui/react';
import { FaLightbulb } from 'react-icons/fa';

const LearningOutcomes = ({ outcomes }) => {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <Box marginTop={8}>
      <Heading as="h2" size="lg" marginBottom={4}>⚡ What will I learn?</Heading>
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        border="1px"
        borderColor="gray.200"
        mt={8}
      >
        <HStack spacing={4} mb={4}>
          <Icon as={FaLightbulb} color="#FF6247" boxSize={6} />
          <Heading as="h2" size="lg" color="#FF6247">
            What You'll Learn
          </Heading>
        </HStack>
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
          {outcomes.map((outcome, index) => (
            <Box
              key={index}
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              <HStack spacing={2} alignItems="flex-start">
                <Text>{outcome.icon || '🌟'}</Text>
                <Text>{outcome.text}</Text>
              </HStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LearningOutcomes;
