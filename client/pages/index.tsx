import type { NextPage } from 'next';
import Head from 'next/head';
import VideoCard from '../components/VideoCard';
import Axios from 'axios';
import { useEffect, useState } from 'react';

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

	useEffect(() => {
		try {
			const getUser = async () => {
				await Axios.get('http://localhost:3004/login').then((response) => {
					if (response.data.loggedIn === true) {
						setUser(response.data.user[0].username);
					}
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
				await Axios.get('http://localhost:3010/view').then((response) => {
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

			{user ? (
				videos.length > 0 &&
				videos.map(({ id, filename, path }: IVideo) => (
					<VideoCard
						key={id}
						id={id}
						filename={filename}
						path={path}
					/>
				))
			) : (
				<h1 className="text-2xl font-bold ml-6">
					Please Log In to view and upload Videos!
				</h1>
			)}
		</div>
	);
};

export default Home;
