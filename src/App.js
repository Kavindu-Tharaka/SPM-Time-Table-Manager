import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Components
import MainNavigationBar from './components/MainNavigationBar/MainNavigationBar';


function App() {
	return (
		<BrowserRouter>
			<MainNavigationBar />
		</BrowserRouter>
	);
}

export default App;
