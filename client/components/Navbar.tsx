import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/logo.png';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import Axios from 'axios';
import { useRouter } from 'next/router';

const Navbar = () => {
	Axios.defaults.withCredentials = true;

	const [user, setUser] = useState('');

	useEffect(() => {
		Axios.get('http://localhost:3004/login').then((response) => {
			if (response.data.loggedIn == true) {
				setUser(response.data.user[0].username);
			}
		});
	}, []);

	const router = useRouter();

	const logout = () => {
		Axios.get('http://localhost:3004/logout').then((response) => {
			console.log(response);
			router.reload();
		});
	};

	const style = {
		wrapper: `w-full flex justify-between items-center border-b-2 border-gray-200 px-4`,
		img__container: `w-[100px] md:w-[130px] active:scale-95 transition transform duration-100 ease-in`,
		img: `cursor-pointer`,
		user__container: `flex gap-5 md:gap-10`,
		navTitle: `text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#003c71] to-[#0069ff]`,
		notSigned: '',
		notSigned__btn: `border-2 active:border-0 px-2 md:px-4 py-1 rounded-2xl text-lg font-semibold flex items-center hover:text-white hover:bg-[#0069ff] active:text-white active:bg-[#003c71] active:scale-95 transform transition duration-100 ease-in`,
		notSigned__btnText: ``,
		signed: `flex gap-2`,
		addIcon: `text-xl`,
		upload__btn: `border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 hover:text-white hover:bg-[#0069ff] active:text-white active:bg-[#003c71] active:scale-95 transform transition duration-100 ease-in`,
		upload__txt: `hidden md:block`,
		logout__btn: `border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 hover:text-white hover:bg-[#0069ff] active:text-white active:bg-[#003c71] active:scale-95 transform transition duration-100 ease-in`,
		logout__btnText: ``,
	};
	return (
		<div className={style.wrapper}>
			<Link href="/">
				<div className={style.img__container}>
					<Image
						src={Logo}
						alt="tiktok"
						layout="responsive"
						className={style.img}
					/>
				</div>
			</Link>

			{user ? (
				<h1 className={[style.navTitle, 'ml-[6rem]'].join(' ')}>
					Now logged in as: {user}⭐
				</h1>
			) : (
				<h1 className={[style.navTitle, 'ml-[2.8rem]'].join(' ')}>
					Video Streaming Service
				</h1>
			)}

			<div>
				{user ? (
					<div className={style.signed}>
						<Link href="http://localhost:4004">
							<button className={style.upload__btn}>
								<IoMdAdd className={style.addIcon} />{' '}
								<span className={style.upload__txt}>Upload video</span>
							</button>
						</Link>
						<button
							className={style.logout__btn}
							onClick={logout}>
							<span className={style.logout__btnText}>Log out</span>
						</button>
					</div>
				) : (
					<Link
						href="/user_auth"
						className={style.notSigned}>
						<button className={style.notSigned__btn}>
							<span className={style.notSigned__btnText}>
								Login or Register
							</span>
						</button>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Navbar;
