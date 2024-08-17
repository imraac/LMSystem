// CategoryGrid.js
import React from 'react';
import { SimpleGrid, Text } from '@chakra-ui/react';
import CategoryCard from './CategoryCard';

const categories = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'React' },
  { name: 'Redux' },
  { name: 'TypeScript' },
  { name: 'Node.js' },
  { name: 'Express' },
  { name: 'MongoDB' },
  { name: 'SQL' },
  { name: 'Python' },
  { name: 'Django' },
  { name: 'Flask' },
  { name: 'Ruby' },
  { name: 'Rails' },
  { name: 'PHP' },
  { name: 'Laravel' },
  { name: 'Java' },
  { name: 'Spring' },
];

function CategoryGrid({ searchTerm }) {
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCategories.length === 0) {
    return <Text>No categories found matching "{searchTerm}"</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
      {filteredCategories.map((category) => (
        <CategoryCard key={category.name} name={category.name} />
      ))}
    </SimpleGrid>
  );
}

export default CategoryGrid;