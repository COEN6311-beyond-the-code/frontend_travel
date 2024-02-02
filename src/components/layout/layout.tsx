import Seo from '@/components/seo/seo';
import { ReactNode, FC } from 'react';
import { clsx } from 'clsx';
import { Inter } from 'next/font/google';

interface IProps {
	title: string;
	children: ReactNode;
	hideNav?: boolean;
	hideFooter?: boolean;
	footerSpacer?: boolean;
}

const inter = Inter({ subsets: ['latin'] });

const Layout: FC<IProps> = ({
	title,
	children,
	hideFooter,
	hideNav,
	footerSpacer,
}) => {
	return (
		<main
			className={clsx(
				footerSpacer ? 'pb-20 sm:pb-0' : '',
				inter.className,
			)}
		>
			<Seo title={title} />
			{!hideNav && <nav />}
			<div>{children}</div>
			{!hideFooter && <footer />}
		</main>
	);
};

export default Layout;
