import '../styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'
import { Auth0Provider } from '@auth0/auth0-react'

const MyApp: React.FC = ({ Component, pageProps }: AppProps) => (
  <Auth0Provider
    domain="https://dev-j162wi-u.us.auth0.com"
    clientId="UN3f7jZzRdocIj969ZGqAgCct7JtpBgJ"
    redirectUri="http://localhost:3000/"
    audience="http://localhost:7220"
  >
    <Component {...pageProps} />
  </Auth0Provider>
)

export default MyApp
