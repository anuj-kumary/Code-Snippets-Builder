import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { BiCodeBlock, BiImage, BiText } from 'react-icons/bi';
import { CUSTOM_NODES } from '../../constants';

interface ToolBarItemsProps {
  label: string;
  icon: IconType;
  nodeType: string;
}

export const ToolBarItems: ToolBarItemsProps[] = [
  {
    label: 'Editor',
    icon: BiCodeBlock,
    nodeType: CUSTOM_NODES.EDITOR_NODE,
  },
  { label: 'Text', icon: BiText, nodeType: CUSTOM_NODES.TEXT_NODE },
  { label: 'Image', icon: BiImage, nodeType: CUSTOM_NODES.IMAGE_NODE },
];

const ToolBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box
      w="max-content"
      bg={useColorModeValue('white', 'gray.900')}
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      mb={4}
      borderRadius={4}
      shadow="md"
      padding="16px"
      marginLeft="auto"
      marginRight="auto"
    >
      <Flex gap={8} alignItems="center">
        {ToolBarItems.map(({ label, icon, nodeType }) => (
          <Box
            key={label}
            as={Flex}
            direction="column"
            alignItems="center"
            draggable
            cursor="grab"
            onDragStart={(event) => onDragStart(event, nodeType)}
          >
            <Icon fontSize={32} as={icon} />
            {label}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ToolBar;
