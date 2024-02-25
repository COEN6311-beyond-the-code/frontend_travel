import { Product } from '@/types/product/product';

export const products: Product[] = [
	{
		id: 1,
		name: '7 day France trip',
		price: 1200,
		description: `Explore the beautiful country of France with our 7 day package deal. Enjoy a relaxing flight, a comfy hotel and some fun activities. Come with friends and family to enjoy the experience of a lifetime`,
		details: [
			{
				name: 'Features',
				items: [
					'Enjoy one of the best flight',
					'The hotel is located in the heart of the city',
					'Enjoy the best meals',
					'Meet great people at the rock climbing event',
				],
				type: 'package',
			},
			{
				name: 'Flight Details',
				items: [
					'Flight number: SKW138',
					'Seat: 17A',
					'Class: Economy',
					'Departure: 19:55',
					'Arrival: 22:15',
				],
				type: 'flight',
			},
			{
				name: 'Hotel Details',
				items: [
					'Hotel name: Grand Hotel Europa',
					'Room: Standard',
					'Check-in: 15:00',
					'Check-out: 10:00',
				],
				type: 'hotel',
			},
			{
				name: 'Activity Details',
				items: [
					'Event: Rock climbing',
					'Location: Summit Climbing Gym',
					'Address: 123 Johnson Ave.',
					'Date: Friday, July 28, 2023',
					'Time: 16:00',
				],
				type: 'activity',
			},
		],
		options: 'Flights, Hotel, Activities',
		imageSrc: '/images/flights/trip 1.jpg',
		imageAlt: '7 day France trip package.',
		type: 'package',
	},
	{
		id: 2,
		name: '1 month in Switzerland',
		price: 4200,
		description:
			'Explore the beautiful country side of Switzerland with friends and family.',
		options: 'Flights, Hotel, Activities',
		imageSrc: '/images/flights/trip 3.jpg',
		imageAlt: '1 month in Switzerland.',
		type: 'package',
		details: [
			{
				name: 'Features',
				items: [
					'Enjoy one of the best flight',
					'The hotel is located in the heart of the city',
					'Enjoy the best meals',
					'Meet great people at the rock climbing event',
				],
				type: 'package',
			},
			{
				name: 'Flight Details',
				items: [
					'Flight number: SKW138',
					'Seat: 17A',
					'Class: Economy',
					'Departure: 19:55',
					'Arrival: 22:15',
				],
				type: 'flight',
			},
			{
				name: 'Hotel Details',
				items: [
					'Hotel name: Grand Hotel Europa',
					'Room: Standard',
					'Check-in: 15:00',
					'Check-out: 10:00',
				],
				type: 'hotel',
			},
			{
				name: 'Activity Details',
				items: [
					'Event: Rock climbing',
					'Location: Summit Climbing Gym',
					'Address: 123 Johnson Ave.',
					'Date: Friday, July 28, 2023',
					'Time: 16:00',
				],
				type: 'activity',
			},
		],
	},
	{
		id: 3,
		name: '3 days cooking class',
		price: 120,
		description: 'Come learn how to prepare 7 dishes in 3 days.',
		options: 'Activities',
		imageSrc: '/images/activities/cooking.jpg',
		imageAlt: '3 days cooking class.',
		type: 'activity',
		details: [
			{
				name: 'Activity Details',
				items: [
					'Event: Cooking class',
					'Location: Summit Climbing Gym',
					'Address: 123 Johnson Ave.',
					'Date: Friday, July 28, 2023',
					'Time: 12:00',
				],
				type: 'activity',
			},
		],
	},
	{
		id: 4,
		name: 'Kayaking challenge',
		price: 150,
		description:
			'Kayaking challenge season is here. Are you up for the challenge?',
		options: 'Activities',
		imageSrc: '/images/activities/kayaking.jpg',
		imageAlt: 'Kayaking challenge.',
		type: 'activity',
		details: [
			{
				name: 'Activity Details',
				items: [
					'Event: Kayaking challenge',
					'Location: Atlantic Ocean',
					'Address: 123 Johnson Ave.',
					'Date: Friday, July 28, 2023',
					'Time: 16:00',
				],
				type: 'activity',
			},
		],
	},
	{
		id: 5,
		name: 'Surfing lessons',
		price: 250,
		description:
			'Come learn how to surf with our professional instructors.',
		options: 'Activities',
		imageSrc: '/images/activities/surfing 2.jpg',
		imageAlt: 'Surfing tutorials.',
		type: 'activity',
		details: [
			{
				name: 'Activity Details',
				items: [
					'Event: Surfing lessons',
					'Location: Pacific Ocean',
					'Address: 123 Johnson Ave.',
					'Date: Friday, July 28, 2023',
					'Time: 16:00',
				],
				type: 'activity',
			},
		],
	},
	{
		id: 6,
		name: 'San Jose Hotel',
		price: 350,
		description: 'Enjoy one week in the beautiful San Jose hotel.',
		options: 'Hotel',
		imageSrc: '/images/hotels/hotel 3.jpg',
		imageAlt: 'San Jose Hotel.',
		type: 'hotel',
		details: [
			{
				name: 'Hotel Details',
				items: [
					'Hotel name: San Jose Hotel',
					'Room: Standard',
					'Check-in: 15:00',
					'Check-out: 10:00',
				],
				type: 'hotel',
			},
		],
	},
	{
		id: 7,
		name: 'Villa Marie Hotel',
		price: 450,
		description:
			'Enjoy one week in the beautiful Villa Marie hotel with free breakfast and lunch.',
		options: 'Activities',
		imageSrc: '/images/hotels/hotel 5.jpg',
		imageAlt: 'Villa Marie Hotel.',
		type: 'activity',
		details: [
			{
				name: 'Hotel Details',
				items: [
					'Hotel name: Villa Marie Hotel',
					'Room: Standard',
					'Check-in: 15:00',
					'Check-out: 10:00',
				],
				type: 'hotel',
			},
		],
	},
	{
		id: 8,
		name: 'Air Quebec',
		price: 350,
		description:
			'Enjoy a relaxing flight with Air Quebec. Free meals and drinks.',
		options: 'Flight',
		imageSrc: '/images/airplane.jpg',
		imageAlt: 'Air Quebec Flight.',
		type: 'flight',
		details: [
			{
				name: 'Flight Details',
				items: [
					'Flight number: SKW138',
					'Seat: 17A',
					'Class: Economy',
					'Departure: 19:55',
					'Arrival: 22:15',
				],
				type: 'flight',
			},
		],
	},
];
