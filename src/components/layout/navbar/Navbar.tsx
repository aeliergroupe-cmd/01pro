import { NavbarClient } from './NavbarClient';

interface NavbarProps {
  isTransparent?: boolean;
}

export function Navbar({ isTransparent = false }: NavbarProps) {
  return <NavbarClient isTransparent={isTransparent} />;
}
