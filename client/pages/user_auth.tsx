import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

const user_auth = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [loginState, setLoginState] = useState('');
	const [created, setCreated] = useState(false);
	const [invalid, setInvalid] = useState(false);
	const [existed, setExisted] = useState(false);

	const router = useRouter();

	Axios.defaults.withCredentials = true;

	const register = async () => {
		await Axios.post('http://localhost:3004/register', {
			username: userName,
			password: password,
		}).then((response: any) => {
			setLoginState('');
			setInvalid(false);
			if (response.data.message) {
				setExisted(true);
				setCreated(false);
			} else {
				setCreated(true);
				setExisted(false);
			}
		});
	};
	const signIn = async () => {
		await Axios.post('http://localhost:3004/login', {
			username: userName,
			password: password,
		}).then((response: any) => {
			console.log(response);
			if (response.data.message) {
				// wrong username/password
				setLoginState('');
				// status display
				setInvalid(true);
				setCreated(false);
				setExisted(false);
			} else {
				// User info received
				setLoginState(response.data[0].username);
				setInvalid(false);
				setCreated(false);
				setExisted(false);
				window.location.href = '/';
			}
		});
	};

	useEffect(() => {
		Axios.get('http://localhost:3004/login').then((response) => {
			if (response.data.loggedIn == true) {
				router.push('/');
			}
		});
	}, []);

	const style = {
		wrapper: `bg-white h-[100vh] flex flex-col items-center`,
		container: `w-[340px] h-fit d-flex flex-col py-6 px-8 rounded-[5px] border-[1px] border-solid border-gray-300`,
		container__header: `font-[500] mb-[20px] text-3xl`,
		container__subHeader: `text-[12px] mb-2`,
		container__input: `h-[30px] w-[98%] mb-[10px] p-3 bg-white border-[1px] rounded-[5px] border-solid border-gray-400 focus:outline-none focus:bg-[#006aff2b]`,
		policy: `mt-[15px] text-[12px]`,
		signInBtn: `bg-[#0069ff] hover:bg-[#006aff9a] hover:text-black rounded-[10px] w-full h-[30px] border-[1px] border-solid mt-[10px] border-t-[#003c71] border-x-[#003c71] border-b-[#003c71] text-white active:bg-[#003c71] active:text-white active:scale-95 transition transform duration-100 ease-in`,
		registerBtn: `rounded-[2px] w-full h-[30px] border-[1px] border-solid mt-[10px] border-gray-400 bg-gray-100 hover:bg-gray-200 active:scale-95 transition transform duration-100 ease-in`,
	};
	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				<h1 className={style.container__header}>Sign-in</h1>
				<p className={style.container__subHeader}>
					Fill in user name and secured password, then choose sign in or create
					an account.
				</p>

				<h5 className="mb-[5px]">User Name:</h5>
				<input
					className={style.container__input}
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<h5 className="mb-[5px]">Password:</h5>
				<input
					className={style.container__input}
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					onClick={signIn}
					className={style.signInBtn}>
					Sign In
				</button>

				<p className={style.policy}>
					By continuing, you agree to BCIT's{' '}
					<a
						className="text-blue-600"
						href="https://www.bcit.ca/copyright/"
						target="_blank">
						Conditions of Use
					</a>{' '}
					and{' '}
					<a
						className="text-blue-600"
						href="https://www.bcit.ca/privacy/"
						target="_blank">
						Privacy Notice.
					</a>
				</p>

				<button
					onClick={register}
					className={style.registerBtn}>
					Create your account
				</button>
			</div>
			<h3 className="text-black text-2xl">
				{loginState && 'Logged In!!'}
				{invalid ? 'Wrong username/password. Please try again' : ''}
				{created ? 'New User Created!' : ''}
				{existed ? 'User already exist!' : ''}
			</h3>
		</div>
	);
};
export default user_auth;
