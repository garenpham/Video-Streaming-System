import type { NextPage } from 'next';
import Head from 'next/head';
import VideoCard from '../components/VideoCard';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';

export interface IVideo {
	id: number;
	filename: string;
	path: string;
}

export interface IProps {
	videos: IVideo[];
}

const Home: NextPage = () => {
	const [user, setUser] = useState('');

	/**
	 * Make a request for current user logged in to the server,
	 * when every time this page loads
	 */
	//Axios.defaults.withCredentials = true;
	useEffect(() => {
		try {
			const getUser = async () => {
				/**
				 * Authentication service is located on port 3004,
				 * exposing to the host network
				 */
				await Axios.get(`${BASE_URL}/login`).then((response) => {
					if (response.data.loggedIn === true) {
						// Set current logged in user
						setUser(response.data.user[0].username);
					}
					console.log(response);
				});
			};
			getUser();
		} catch (err) {
			console.log(err);
		}
	}, []);

	const [videos, setVideos] = useState([]);
	useEffect(() => {
		try {
			const getVideos = async () => {
				await Axios.get(`${BASE_URL}/view`).then((response) => {
					if (response) {
						console.log(response.data);
						setVideos(response.data);
					}
				});
			};
			getVideos();
		} catch (err) {
			console.log(err);
		}
	}, []);
	console.log(videos);

	return (
		<div className="flex flex-wrap items-center justify-center">
			<Head>
				<title>Video Streaming System</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			{/* Check if variable user is set (user logged in) */}
			{user ? (
				// Scanning available videos from the docker volume
				videos.length > 0 ? (
					// If there are videos, display it
					videos.map(({ id, filename, path }: IVideo) => (
						<VideoCard
							key={id}
							id={id}
							filename={filename}
							path={path}
						/>
					))
				) : (
					// Otherwise...
					<h1 className="text-2xl font-bold">
						Your videos will be displayed here
					</h1>
				)
			) : (
				<h1 className="text-2xl font-bold ml-6">
					Please Log In to view and upload Videos!
				</h1>
			)}
		</div>
	);
};

export default Home;
