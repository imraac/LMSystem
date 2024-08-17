import React from 'react';
import { Switch, FormControl, FormLabel, useColorModeValue } from '@chakra-ui/react';

const ToggleSwitch = ({ isYearly, togglePlan }) => {
  const switchColor = useColorModeValue('green.500', 'green.300');

  return (
    <div className="flex justify-center">
      <FormControl display="flex" alignItems="center" textAlign="center">
        <FormLabel htmlFor="plan-toggle" mb="0" fontSize="lg" mr={4}>
          Monthly
        </FormLabel>
        <Switch
          id="plan-toggle"
          isChecked={isYearly}
          onChange={togglePlan}
          colorScheme="green"
          size="lg" 
          trackColor={switchColor}
        />
        <FormLabel htmlFor="plan-toggle" mb="0" fontSize="lg" ml={4}>
          Yearly
        </FormLabel>
      </FormControl>
    </div>
  );
};

export default ToggleSwitch;
