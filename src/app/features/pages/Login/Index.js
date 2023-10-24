import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/Index";
import { Link } from "react-router-dom";
import { Button, Input, Row, Col, Form, Checkbox } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "./App.css";
import { logIn, logOut } from "../../../services/firebase/authFirebase";

const Index = () => {
  const { user, setStateUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const logOutSesion = () => {
    logOut().then(() => {
      setStateUser(null);
    });
  };
  const onSubmitSuccess = ({ email, password }) => {
    console.log("Success:", email, password);
    logIn(email, password)
      .then((res) => {
        console.log("LOGIN");
        setStateUser(res.user);
        navigate("/");
        console.log("Success");
      })
      .catch((err) => console.log(err));
  };
  const onSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user)
    return (
      <h1>
        Ya estás registrado <button onClick={logOutSesion}>SAlir</button>
      </h1>
    );

  return (
    <div className="App">
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={{ span: 20 }} lg={{ span: 10 }}>
          <h1>Ingresar</h1>
          <Form
            name="basic"
            wrapperCol={{ span: 16, offset: 4 }}
            initialValues={{ remember: true }}
            onFinish={onSubmitSuccess}
            onFinishFailed={onSubmitFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input.Password
                placeholder="Contraseña"
                prefix={<KeyOutlined />}
              />
            </Form.Item>

            <p>
              Aún no tienes cuenta? <Link to="/register">Registrate</Link>
            </p>

            <Form.Item>
              <Button type="primary" htmlType="submit" shape="round">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
