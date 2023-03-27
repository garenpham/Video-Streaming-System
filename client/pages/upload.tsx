import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Axios from 'axios';
import { BASE_URL } from '../constants';

const upload = () => {
	const style = {
		wrapper: `flex flex-col items-center justify-center py-2`,
		container: `bg-white rounded-lg flex justify-between items-center`,
		upload__wrapper: `border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[20vw] p-10 cursor-pointer hover:border-[#003c71] hover:bg-gray-100 active:scale-95 transition transform duration-100`,
		upload: `cursor-pointer`,
		upload__container: `flex flex-col flex-wrap items-center justify-center`,
		upload__btnContainer: `font-bold text-xl`,
		upload__btn: `text-gray-300 text-6xl`,
		upload__txt: `text-xl font-semibold`,
		upload__requirements: `text-gray-400 text-center mt-10 text-sm leading-10`,
		upload__select: `bg-[#0069ff] text-center mt-10 rounded text-white text-md font-medium p-2 w-40 lg:w-52 outline-none`,
		upload__inputVid: `w-0 h-0`,
		upload__video: `rounded-xl h-[450px] mt-16 bg-black`,
		upload__error: `text-center text-xl text-[#003c71] font-semibold mt-4 w-[250px]`,
		confirmation: `flex gap-6 mt-[4rem]`,
		confirmation__discard: `border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none active:scale-95 transition transform duration-100`,
		confirmation__post: `bg-[#0069ff] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none active:scale-95 transition transform duration-100`,
	};

	const [file, setFile] = useState('');
	const [filename, setFilename] = useState('Choose File');
	const [src, setSrc] = useState('');

	/**
	 * Display selected file name
	 */
	const videoSelected = (e: any) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
		setSrc(URL.createObjectURL(e.target.files[0]));
	};

	/**
	 * Upload video to file system
	 */
	//Axios.defaults.withCredentials = true;
	const submit = async (e: any) => {
		setFilename('Posting to database...');
		const formData = new FormData();
		formData.append('file', file);
		try {
			await Axios({
				method: 'post',
				url: `${BASE_URL}/upload`,
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			}).then((res) => {
				console.log(res);
			});
			setFilename('Upload Successfully!');
		} catch (err: any) {
			if (err.status === 500) {
				console.log('Server Error');
			} else {
				console.log(err);
			}
		}
	};

	const discard = () => {
		console.log(file);
		setFile('');
		setSrc('');
		setFilename('Choose File');
	};
	console.log(src);
	console.log(file);

	return (
		<div className={style.wrapper}>
			<Head>
				<title>Upload Section</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<div className={style.container}>
				<div className={style.upload__wrapper}>
					<label className={style.upload}>
						<div className={style.upload__container}>
							{!src && (
								<div>
									<div className={style.upload__container}>
										<p className={style.upload__btnContainer}>
											<FaCloudUploadAlt className={style.upload__btn} />
										</p>
										<p className={style.upload__txt}>Upload video</p>
									</div>
									<p className={style.upload__requirements}>
										MP4 or WebM or ogg <br />
										720x1280 or higher <br />
										Up to 10 minutes <br />
										Less than 2GB
									</p>
								</div>
							)}

							<p className={style.upload__select}>
								{filename === 'Choose File' ? 'Select File' : `${filename}`}
							</p>
						</div>
						<input
							type="file"
							name="upload-video"
							className={style.upload__inputVid}
							onChange={videoSelected}
						/>
					</label>
				</div>
			</div>

			<div className={style.confirmation}>
				<button
					onClick={discard}
					type="button"
					className={style.confirmation__discard}>
					Discard
				</button>
				<button
					onClick={submit}
					type="button"
					className={style.confirmation__post}>
					Post
				</button>
			</div>
			{src ? (
				<video
					src={src}
					controls
					width="40%"
					className="mt-4">
					Sorry, your browser doesn't support embedded videos.
				</video>
			) : (
				''
			)}
		</div>
	);
};

export default upload;
