function toCamelCase<T>(obj: T): any {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(v => toCamelCase(v)) as any;
	}

	return Object.keys(obj as any).reduce((result: any, key: string) => {
		const camelCaseKey = key.replace(/([-_][a-z])/gi, $1 => {
			return $1.toUpperCase().replace('-', '').replace('_', '');
		});

		result[camelCaseKey] = toCamelCase((obj as any)[key]);
		return result;
	}, {});
}

export default toCamelCase;
