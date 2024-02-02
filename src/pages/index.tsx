import { Inter } from 'next/font/google';
import Layout from '@/components/layout/layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Layout title='Home'>
			<div className='container'>
				<h1>We move!!!</h1>
			</div>
		</Layout>
	);
}
