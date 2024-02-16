import { Product } from '@/types/product/product';

export const products: Product[] = [
	{
		id: 1,
		name: '7 day France trip',
		href: '/',
		price: 1200,
		description:
			'Explore the beautiful country of France with our 7 day package deal.',
		options: 'Included: Flights, Hotel, Activities',
		imageSrc: '/images/flights/trip 1.jpg',
		imageAlt: '7 day France trip package.',
		type: 'packages',
	},
	{
		id: 2,
		name: '1 month in Switzerland',
		href: '/',
		price: 4200,
		description:
			'Explore the beautiful country side of Switzerland with friends and family.',
		options: 'Included: Flights, Hotel, Activities',
		imageSrc: '/images/flights/trip 3.jpg',
		imageAlt: '1 month in Switzerland.',
		type: 'packages',
	},
	{
		id: 3,
		name: '3 days cooking class',
		href: '/',
		price: 120,
		description: 'Come learn how to prepare 7 dishes in 3 days.',
		options: 'Included: Activities',
		imageSrc: '/images/activities/cooking.jpg',
		imageAlt: '3 days cooking class.',
		type: 'activities',
	},
	{
		id: 4,
		name: 'Kayaking challenge',
		href: '/',
		price: 150,
		description:
			'Kayaking challenge season is here. Are you up for the challenge?',
		options: 'Included: Activities',
		imageSrc: '/images/activities/kayaking.jpg',
		imageAlt: 'Kayaking challenge.',
		type: 'activities',
	},
	{
		id: 5,
		name: 'Surfing lessons',
		href: '/',
		price: 250,
		description:
			'Come learn how to surf with our professional instructors.',
		options: 'Included: Activities',
		imageSrc: '/images/activities/surfing 2.jpg',
		imageAlt: 'Surfing tutorials.',
		type: 'activities',
	},
	{
		id: 6,
		name: 'San Jose Hotel',
		href: '/',
		price: 350,
		description: 'Enjoy one week in the beautiful San Jose hotel.',
		options: 'Included: Hotel',
		imageSrc: '/images/hotels/hotel 3.jpg',
		imageAlt: 'San Jose Hotel.',
		type: 'hotels',
	},
	{
		id: 7,
		name: 'Villa Marie Hotel',
		href: '/',
		price: 450,
		description:
			'Enjoy one week in the beautiful Villa Marie hotel with free breakfast and lunch.',
		options: 'Included: Activities',
		imageSrc: '/images/hotels/hotel 5.jpg',
		imageAlt: 'Villa Marie Hotel.',
		type: 'activities',
	},
	{
		id: 8,
		name: 'Air Quebec',
		href: '/',
		price: 350,
		description:
			'Enjoy a relaxing flight with Air Quebec. Free meals and drinks.',
		options: 'Included: Flight',
		imageSrc: '/images/airplane.jpg',
		imageAlt: 'Air Quebec Flight.',
		type: 'flights',
	},
];
