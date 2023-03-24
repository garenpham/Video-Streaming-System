import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/logo.png';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import Axios from 'axios';

const Navbar = () => {
	const [user, setUser] = useState('');

	Axios.defaults.withCredentials = true;

	useEffect(() => {
		Axios.get('http://localhost:4010/login').then((response) => {
			console.log(response);
			if (response.data.loggedIn == true) {
				setUser(response.data.user[0].username);
				console.log(response);
			} else {
				setUser('');
				window.location.href = 'http://localhost';
			}
		});
	}, []);

	const logout = () => {
		Axios.get('http://localhost:4010/logout').then((response) =>
			console.log(response),
		);
		setUser('');
	};

	const style = {
		wrapper: `w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4`,
		img__container: `w-[100px] md:w-[130px] active:scale-95 transition transform duration-100 ease-in`,
		img: `cursor-pointer`,
		navTitle__container: ``,
		navTitle__content: `pl-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#003c71] to-[#0069ff]`,
		user: 'flex gap-4 items-center',
		user__btn: `text-white bg-[#0069ff] border-2 active:border-0 px-2 md:px-4 py-1 rounded-2xl text-lg font-semibold flex items-center hover:text-black hover:bg-gray-200 active:text-white active:bg-[#003c71] active:scale-95 transform transition duration-100 ease-in`,
		user__btnText: ``,
		logout: `my-auto mt-1 hover:scale-105 active:scale-95 transition transform duration-100 ease-in`,
	};
	return (
		<div className={style.wrapper}>
			<Link href="http://localhost">
				<div className={style.img__container}>
					<Image
						src={Logo}
						alt="tiktok"
						layout="responsive"
						className={style.img}
					/>
				</div>
			</Link>

			<div className={style.navTitle__container}>
				<h1 className={style.navTitle__content}>Video Uploading Section</h1>
			</div>

			<div className={style.user}>
				<button className={style.user__btn}>
					<span className={style.user__btnText}>Hello, {user}👍</span>
				</button>
				<Link href="http://localhost">
					<button
						type="button"
						className={style.logout}
						onClick={logout}>
						<AiOutlineLogout
							color="red"
							fontSize={21}
						/>
					</button>
				</Link>
			</div>
		</div>
	);
};
export default Navbar;
