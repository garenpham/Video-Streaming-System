import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
	const style = {
		wrapper: `xl:w-[1200px] m-auto overflow-hidden h-[100xh]`,
		page: `mt-4 flex flex-col gap-10 overflow-auto videos flex-1`,
	};
	return (
		<div className={style.wrapper}>
			<Navbar />
			<div className={style.page}>
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default MyApp;
