// app/providers.tsx or src/providers.tsx
'use client'

import { ReactNode } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </>
    );
}
