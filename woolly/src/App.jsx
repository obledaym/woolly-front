import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Header from './components/Header';
import ContactSpan from './components/Contact';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Account from './pages/Account';

const HEADER_HEIGHT = 64;

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div style={{ paddingTop: HEADER_HEIGHT, minHeight: '100vh', boxSizing: 'border-box' }}>
						<Header height={HEADER_HEIGHT} />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/mon_compte" exact component={Account}/>
							{/*
							<Route path="/ventes" exact component={Sales} />
							<Route path="/ventes/:sale_id" exact component={SaleDetail} />
							 */}
							<Route component={Error404} />

						</Switch>
						<ContactSpan/>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
