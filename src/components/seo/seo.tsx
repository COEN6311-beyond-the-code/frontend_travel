import React, { FC } from 'react';
import Head from 'next/head';

const Seo: FC<{ title: string }> = ({ title }) => {
	return (
		<Head>
			<title>{`${title} | Concordia Travel`}</title>
		</Head>
	);
};

export default Seo;
