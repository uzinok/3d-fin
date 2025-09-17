import Home from "../pages/home/home";
import Admin from "../pages/admin/admin";
import { GlobalStyle } from "./styles";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			{/* <ScrollTop /> */}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
