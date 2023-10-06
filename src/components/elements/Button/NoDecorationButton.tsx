import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { OmitStrict } from 'src/types/omitStrict';

type OutlineButtonProps = OmitStrict<ButtonProps, 'variant'>;

export const NoDecorationButton: FC<OutlineButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    variant='link'
    {...props}
    style={{ textDecoration: 'none', fontWeight: 'normal' }}
  >
    {children}
  </Button>
);
