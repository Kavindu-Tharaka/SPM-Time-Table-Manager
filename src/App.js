import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Components
import MainNavigationBar from './components/MainNavigationBar/MainNavigationBar';
import ApplicationContent from './components/ApplicationContent/ApplicationContent';
import ReactNotification from 'react-notifications-component'

function App() {
	const [selectedMainLink, setSelectedMainLink] = useState('working-time');

	return (
		<BrowserRouter>
			<ReactNotification />
			<MainNavigationBar
				selectedMainLink={selectedMainLink}
				setSelectedMainLink={setSelectedMainLink}
			/>
			<ApplicationContent />
		</BrowserRouter>
	);
}

export default App;
