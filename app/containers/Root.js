// @flow
import React from 'react';
import { Provider } from 'react-redux';
import Main from './Main';

type RootType = {
	store: {}
};

export default function Root({ store }: RootType) {
	return (
		<Provider store={store}>
			<Main store={store} />
		</Provider>
	);
}
