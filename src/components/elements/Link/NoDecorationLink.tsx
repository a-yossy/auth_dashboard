import { FC } from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

export const NoDecorationLink: FC<LinkProps> = ({
  href,
  children,
  ...props
}) => (
  <Link as={NextLink} href={href} {...props} style={{ textDecoration: 'none' }}>
    {children}
  </Link>
);
