import React, { useState } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';

// Components
import MainNavigationBar from './components/MainNavigationBar/MainNavigationBar';
import ApplicationContent from './components/ApplicationContent/ApplicationContent';

function App() {
	const [selectedMainLink, setSelectedMainLink] = useState('working-time');

	return (
		<BrowserRouter>
			<MainNavigationBar
				selectedMainLink={selectedMainLink}
				setSelectedMainLink={setSelectedMainLink}
			/>
			<ApplicationContent />
		</BrowserRouter>
	);
}

export default App;
