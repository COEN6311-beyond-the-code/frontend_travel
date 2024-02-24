import { useState } from 'react';

const PackageForm = () => {
	const [selectedFile, setSelectedFile] = useState('No file chosen');

	return (
		<div>
			<form>
				<div className='flex flex-row items-center'>
					<input
						type='file'
						id='custom-input'
						onChange={e => setSelectedFile(e.target.files![0].name)}
						hidden
					/>
					<label
						htmlFor='custom-input'
						className='block mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-black
						text-white hover:opacity-80 cursor-pointer'
					>
						Choose file
					</label>
					<label className='text-sm text-slate-500'>
						{selectedFile}
					</label>
				</div>
			</form>
		</div>
	);
};

export default PackageForm;
