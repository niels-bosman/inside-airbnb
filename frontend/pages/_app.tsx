import '../styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'

const MyApp: React.FC = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default MyApp
