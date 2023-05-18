import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image';
import { Options } from 'html-to-image/lib/types';
import React, { useState } from 'react';
import { BiClipboard, BiExport } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';

interface Config {
  node: HTMLElement;
  options?: Options;
}

const ExportButton = () => {
  const toast = useToast();
  const [isDownLoading, setIsDownLoading] = useState<boolean>(false);

  const downloadImage = (dataUrl: string, extension: string) => {
    const a = document.createElement('a');

    a.setAttribute('download', `snippet.${extension}`);
    a.setAttribute('href', dataUrl);
    a.click();
  };

  const configuration: Config = {
    node: document.querySelector('.react-flow') as HTMLElement,
    options: {
      filter: (node) => {
        // we don't want to add the minimap and the controls to the image
        if (
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls')
        ) {
          return false;
        }

        return true;
      },
    },
  };

  const handlePngExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toPng(configuration.node, configuration.options);
      downloadImage(url, 'png');
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };
  const handleJpegExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toJpeg(configuration.node, configuration.options);
      downloadImage(url, 'jpeg');
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };
  const handleSvgExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toSvg(configuration.node, configuration.options);
      downloadImage(url, 'svg');
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };
  const handleClipboardExport = async () => {
    try {
      setIsDownLoading(true);
      const blob = await toBlob(configuration.node, configuration.options);
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob?.type ?? 'image/png']: blob,
          }),
        ]);
        toast({
          title: 'Copy Image',
          description: 'Image copied to clipboard successfully!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };

  return (
    <Menu>
      <MenuButton>
        <Button
          _hover={{ background: 'purple.500' }}
          bg="purple.500"
          color="white"
          isLoading={isDownLoading}
          // onClick={handleExport}
          variant="solid"
          leftIcon={<BiExport />}
        >
          Export
        </Button>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<BsImage />} onClick={handlePngExport}>
          Save PNG
        </MenuItem>
        <MenuItem icon={<BsImage />} onClick={handleJpegExport}>
          Save JPEG
        </MenuItem>
        <MenuItem icon={<BsImage />} onClick={handleSvgExport}>
          Save SVG
        </MenuItem>
        <MenuItem icon={<BiClipboard />} onClick={handleClipboardExport}>
          Copy Image
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ExportButton;
