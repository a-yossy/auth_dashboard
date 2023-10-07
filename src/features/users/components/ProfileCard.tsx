import { FC, useContext } from 'react';
import {
  Spinner,
  Card,
  Heading,
  CardBody,
  StackDivider,
  Text,
  Box,
  Stack,
} from '@chakra-ui/react';
import { AuthContext } from 'src/context/AuthContext';
import { CURRENT_USER_STATES } from 'src/const';

export const ProfileCard: FC = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser.state === CURRENT_USER_STATES.LOG_OUT) return null;

  return (
    <>
      {currentUser.state === CURRENT_USER_STATES.LOADING ? (
        <Spinner mt={5} mx='auto' style={{ display: 'flex' }} />
      ) : (
        <Card mt={5} mx='auto' width={350}>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  名前
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {currentUser.data.name}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  メールアドレス
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {currentUser.data.email}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  );
};
