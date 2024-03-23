import * as yup from 'yup';

export const ModifyOrderSchema = yup.object({
	startDate: yup.string().required('Please select a start date'),
	endDate: yup.string().required('Please select an end date'),
});
