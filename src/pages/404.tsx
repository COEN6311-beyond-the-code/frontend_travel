import { inter } from '@/utils/fonts';
import Link from 'next/link';

export default function NotFound() {
	return (
		<main className={inter.className}>
			<div className='grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
				<div className='text-center'>
					<p className='text-base font-semibold text-ct-deepPink'>
						404
					</p>
					<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
						Page not found
					</h1>
					<p className='mt-6 text-base leading-7 text-gray-600'>
						Sorry, we couldn’t find the page you’re looking for.
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							href='/'
							className='rounded-md bg-ct-deepPink px-3.5 py-2.5 text-sm font-semibold text-white
                            shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-ct-deepPink'
						>
							Go back home
						</Link>
						<a
							href='mailto:support@concordiatravel.com'
							className='text-sm font-semibold text-gray-900'
						>
							Contact support{' '}
							<span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
