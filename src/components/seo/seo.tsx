import React, { FC } from 'react';
import Head from 'next/head';

const Seo: FC<{ title: string }> = ({ title }) => {
	return (
		<Head>
			<title>{`${title} | Travel App`}</title>
		</Head>
	);
};

export default Seo;
