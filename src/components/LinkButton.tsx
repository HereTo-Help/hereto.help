import { SiteLink } from './SiteLink';
import { Button } from '@radix-ui/themes';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function LinkButton({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Button
      size="3"
      variant={secondary ? 'outline' : 'solid'}
      className={`link-button ${secondary ? 'secondary' : ''}`}
      asChild
    >
      <SiteLink href={href}>
        {children}
        <ArrowUpRight size={17} />
      </SiteLink>
    </Button>
  );
}
