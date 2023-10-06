import { FC } from 'react';
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
import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

export const ProfileCard: FC = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser.state === 'log_out') return <div>ログインしてください</div>;

  return (
    <>
      {currentUser.state === 'loading' ? (
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
