'use client';
import Header from '@components/header';
import LayoutLayer from '@components/layout-layer';
import Login from '@components/login';
import Signup from '@components/signup';
import '@styles/globals.css';
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'redux/store';

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
});
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isClient, setIsClient] = useState(false);
    const [isSignUpModelOpen, setSignUpModelOpen] = useState(false);
    const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);

    const toggleLoginModal = () => {
        setIsLoginModelOpen(!isLoginModelOpen);
    };

    const toggleSignUpModal = () => {
        setSignUpModelOpen(!isSignUpModelOpen);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <html lang="en" className={poppins.variable}>
            <body className=" absolute bg-hero-pattern bg-cover bg-center w-full font-poppins">
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <LayoutLayer>
                            <Header
                                loginToggle={toggleLoginModal}
                                signupToogle={toggleSignUpModal}
                            />
                            {isLoginModelOpen && (
                                <Login toggleModal={toggleLoginModal} />
                            )}
                            {isSignUpModelOpen && (
                                <Signup toggleModal={toggleSignUpModal} />
                            )}
                            <main>{children}</main>
                        </LayoutLayer>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}
