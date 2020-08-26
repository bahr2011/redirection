/**
 * External dependencies
 */

import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

/**
 * Internal dependencies
 */

import createReduxStore from 'state';
import { getInitialState } from 'state/initial';
import Home from './page/home';
import apiFetch from 'wp-plugin-lib/api-fetch';

// Set API nonce and root URL
apiFetch.resetMiddlewares();
apiFetch.use( apiFetch.createRootURLMiddleware( Redirectioni10n?.api?.WP_API_root ?? '/wp-json/' ) );
apiFetch.use( apiFetch.createNonceMiddleware( Redirectioni10n?.api?.WP_API_nonce ?? '' ) );

const App = () => (
	<Provider store={ createReduxStore( getInitialState() ) }>
		<React.StrictMode>
			<Home />
		</React.StrictMode>
	</Provider>
);

export default hot( App );
