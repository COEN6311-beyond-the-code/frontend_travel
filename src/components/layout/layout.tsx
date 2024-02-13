import Seo from '@/components/seo/seo';
import { ReactNode, FC } from 'react';
import { clsx } from 'clsx';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/footer';
import NavBar from '@/components/nav/nav';
import { inter } from '@/utils/fonts';

interface IProps {
	title: string;
	children: ReactNode;
	hideNav?: boolean;
	hideFooter?: boolean;
	footerSpacer?: boolean;
}

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
			{!hideNav && <NavBar />}
			<div>{children}</div>
			{!hideFooter && <Footer />}
		</main>
	);
};

export default Layout;
