import Image from 'next/image';
import Link from 'next/link';
import Logo from '../utils/tiktik-logo.png';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const Navbar = () => {
	const [searchValue, setSearchValue] = useState('');
	const userProfile = null;
	const handleSearch = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	const style = {
		wrapper: `w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4`,
		img__container: `w-[100px] md:w-[130px] active:scale-95 transition transform duration-100 ease-in`,
		img: `cursor-pointer`,
		user__container: `flex gap-5 md:gap-10`,
		addIcon: `text-xl`,
		upload__btn: `border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2`,
		upload__txt: `hidden md:block`,
		search__container: `relative hidden md:block`,
		search__form: `absolute md:static top-10 -left-20 bg-white`,
		search__input: `bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0 ml-9`,
		search__button: `absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400`,
		user: '',
		user__btn: `border-2 active:border-0 px-2 md:px-4 py-1 rounded-2xl text-lg font-semibold flex items-center hover:text-white hover:bg-pink-400 active:text-white active:bg-[#F51997] active:scale-95 transform transition duration-100 ease-in`,
		user__btnText: ``,
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

			<div className={style.search__container}>
				<form
					onSubmit={handleSearch}
					className={style.search__form}>
					<input
						type="text"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search accounts and videos"
						className={style.search__input}
					/>
					<button
						onClick={handleSearch}
						className={style.search__button}>
						<BiSearch />
					</button>
				</form>
			</div>

			<div>
				{userProfile ? (
					<Link href="/upload">
						<button className={style.upload__btn}>
							<IoMdAdd className={style.addIcon} />{' '}
							<span className={style.upload__txt}>Upload</span>
						</button>
					</Link>
				) : (
					<Link
						href="/login"
						className={style.user}>
						<button className={style.user__btn}>
							<span className={style.user__btnText}>Login or Register</span>
						</button>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Navbar;
