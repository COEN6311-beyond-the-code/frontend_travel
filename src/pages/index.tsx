import { Inter } from 'next/font/google';
import Layout from '@/components/layout/layout';
import Landing from '@/components/home/landing/landing';
import CategorySection from '@/components/home/category-section/category-section';
import TrendingPackages from '@/components/home/trending-packages/trending-packages';
import CTA from '@/components/home/cta/cta';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Layout title='Home'>
			<div className='container'>
				<Landing />
			</div>
			<CategorySection />
			<TrendingPackages />
			<CTA />
		</Layout>
	);
}
