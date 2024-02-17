import * as yup from 'yup';

export const SearchSchema = yup.object({
	query: yup.string(),
});
