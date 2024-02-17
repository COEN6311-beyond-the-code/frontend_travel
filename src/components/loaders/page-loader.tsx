import Spinner from './spinner';
import Seo from '@/components/seo/seo';

const PageLoader = () => {
	return (
		<div className='min-h-screen w-full flex justify-center items-center'>
			<Seo title='Loading...' />
			<Spinner color='text-ct-deepPink' />
		</div>
	);
};

export default PageLoader;
