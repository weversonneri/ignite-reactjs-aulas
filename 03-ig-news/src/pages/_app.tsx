import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import '../styles/global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<NextAuthProvider session={session}>
			<Header />
			<Component {...pageProps} />
			<ToastContainer />
		</NextAuthProvider>
	);
}

export default MyApp;
