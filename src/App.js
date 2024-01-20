import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Addproduct from  "./components/Addproduct/addproduct";
import Update from "./components/Updateproduct/update";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/home" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/home" element={<Navigate replace to="/login" />} />
			<Route path="/update" element={<Navigate replace to="/home" />} />
			{user && <Route path="/addproduct" element={<Addproduct/>} /> }
			{user && <Route path="/update/:_id" element={<Update/>} /> }
		</Routes>
	);
}

export default App;
