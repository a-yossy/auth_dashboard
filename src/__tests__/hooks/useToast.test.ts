import { renderHook } from '@testing-library/react';
import { useToast as useChakraToast } from '@chakra-ui/react';
import { useToast } from 'src/hooks/useToast';

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('@chakra-ui/react');

describe('useToast', () => {
  it('Chakra UI の toast を呼べること', () => {
    const mockChakraToast = jest.fn();
    (useChakraToast as jest.Mock).mockReturnValue(mockChakraToast);
    const { result } = renderHook(() => useToast());
    const status = 'error';
    const title = 'アカウント登録に失敗しました';
    const description = '既に登録されているメールアドレスです';
    result.current(status, title, description);

    expect(mockChakraToast).toHaveBeenCalledWith({
      status,
      title,
      description,
      duration: 5000,
      isClosable: true,
      position: 'top',
      containerStyle: {
        whiteSpace: 'pre-line',
      },
    });
  });
});
