import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import { SUPPORTED_PROFILES } from 'constants/profile';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { map } from 'lodash';
import React from 'react';

const ProfileConfig = () => {
  const { profile, onUpdateProfileData } = useAppProvider();

  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold" {...COMMON_TEXT_PROPS}>
        Profile Info
      </Text>
      <Divider />
      <VStack w="100%" alignItems="flex-start">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="profile-info" mb="0">
            Show profile info
          </FormLabel>
          <CustomSwitch
            id="profile-info"
            isChecked={Boolean(profile.isVisible)}
            onChange={(e) =>
              onUpdateProfileData({ ...profile, isVisible: e.target.checked })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Platform</FormLabel>
          <Select
            value={profile.platform}
            onChange={(e) =>
              onUpdateProfileData({
                ...profile,
                platform: e.target.value,
              })
            }
          >
            {map(SUPPORTED_PROFILES, ({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={profile.username}
            onChange={(e) =>
              onUpdateProfileData({
                ...profile,
                username: e.target.value,
              })
            }
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ProfileConfig;
