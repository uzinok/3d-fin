import Button from "../../ui/button/button";
import { InputField } from "../../ui/form-elements/input-field/input-field";
import styled from "styled-components";
import { useState } from "react";
import { login } from "./auth";

const StyledLogin = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	& form {
		display: grid;
		gap: 20px;
		min-width: 250px;
	}
`

function Login({ onLoginSuccess }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		const result = await login(username, password);

		if (result.success) {
			onLoginSuccess();
		} else {
			setError(result.message || 'Неверный логин или пароль');
		}

		setLoading(false);
	};

	return (
		<StyledLogin>
			<form onSubmit={handleSubmit}>
				<InputField
					placeholder="Логин"
					name="login"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<InputField
					placeholder="Пароль"
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <div>{error}</div>}
				<Button type="submit" disabled={loading}>
					{loading ? 'Вход...' : 'Войти'}
				</Button>
			</form>
		</StyledLogin>
	)
}

export default Login;
