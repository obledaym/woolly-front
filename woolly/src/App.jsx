import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import actions from './redux/actions';

import Header from './components/Header';
import Loader from './components/Loader';

import Home from './pages/Home';
import Error404 from './pages/Error404';
import Sales from './pages/Sales';
import SaleDetail from './pages/SaleDetail';
import LoginLogout from './pages/LoginLogout';
import Contact from './components/Contact';

const HEADER_HEIGHT = 64;

class App extends React.Component {
	componentDidMount() {
		// Get connected user
		store.dispatch(actions('/auth/me').definePath(['auth']).get())
	}

	render() {
		return (
			<Provider store={store}>
				<Loader text="Loading..." loading={store.getState().isFetching('auth')}>
					<BrowserRouter>
						<div style={{ paddingTop: HEADER_HEIGHT, minHeight: '100vh', boxSizing: 'border-box' }}>
							<Header height={HEADER_HEIGHT} />
							<Switch>
								<Route path="/" exact component={Home} />
								<Route path="/ventes" exact component={Sales} />
								<Route path="/ventes/:sale_id" exact component={SaleDetail} />
								<Route path="/login" exact render={props => <LoginLogout {...props} action="login" />} />
								<Route path="/logout" exact render={props => <LoginLogout {...props} action="logout" />} />
								<Route component={Error404} />
							</Switch>
							<Contact />
						</div>
					</BrowserRouter>
				</Loader>
			</Provider>
		);
	}
}

export default App;
