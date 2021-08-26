import React, { useState } from 'react';
import { notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { emailValidation } from '../../../utils/formValidation';
import { signInAdminApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

// import fondo from '../../../assets/img/fondo.jpg';
import trama from '../../../assets/img/trama.mp4';
import logo from '../../../assets/img/up.png';

const Login = () => {

	const [inputs, setInputs] = useState({
        email:'',
    });
    const [formValid, setFormValid] = useState({
        email: false
    });
	const[loading, setLoading] = useState(false);

	const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
	};
	
	const inputValidation = async e => {
        const { type, name } = e.target;

        if(type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }
	};
	
	const signIn = async () => {
		setLoading(true);
        const emailVal = inputs.email;
        const emailFormVal = formValid.email;
		console.log(emailVal)
		console.log(emailFormVal)
		if (!emailVal) {
            notification['error']({
                message: "Ingrese un correo"
            });
            setLoading(false);
		} else if (!emailFormVal ) {
            notification['error']({
                message: "Correo no válido"
            });
            setLoading(false);
        }  else {
			const result = await signInAdminApi(inputs);
			if (!result.ok) {
				notification["error"]({
					message: result.message
				});
				setLoading(false);
			} else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
				window.location.href = "/dashboard/admin";
			}
		}
	};
	
    const antIcon = <LoadingOutlined style={{ fontSize: 50, color: '#F511FF' }} spin />;
	
    return ( 
		<Spin spinning={loading} size="large" tip="Cargando..." style={{color: '#F511FF'}} indicator={antIcon}>
			<div className="fondo">
				<div className="contenedorRegistro">
					<video src={trama} width="100%" autoPlay loop muted />
					<div className="row">
						<div className="form">
							<img src={logo} alt="logo" />
							<h1>Ingresar al dashboard</h1>
							<span>Ingresa correo electrónico</span>
							<div className="card">
								<form onChange={changeForm} onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); signIn(); }}>
									<div className="campo">
										<input
											type="email"
											placeholder="Email"
											name="email"
											onChange={inputValidation}
                                			value={inputs.email}
										/>
									</div>
									<div className="campobutton">
										<button style={{cursor: 'pointer'}}>Entrar</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Spin>
	);
}
 
export default Login;