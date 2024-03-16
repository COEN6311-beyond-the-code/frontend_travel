import Spinner from './spinner';
import Seo from '@/components/seo/seo';

const PageLoader = () => {
	return (
		<div className='min-h-screen w-full flex justify-center items-center'>
			<Seo title='Loading...' />
			<Spinner color='text-ct-deepPink' extraClasses='!w-10 !h-10' />
		</div>
	);
};

export default PageLoader;
