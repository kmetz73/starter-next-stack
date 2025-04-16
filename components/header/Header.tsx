import { APP_NAME } from '@/lib/constants';

import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/header/menu';
import MainNav from './main-nav';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/images/infidel-logo.jpg"
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
          <MainNav className="ml-4" />
        </div>
        <Menu />
      </div>
    </header>
  );
};
export default Header;
