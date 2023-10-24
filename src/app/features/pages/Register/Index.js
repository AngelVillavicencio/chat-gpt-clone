import React from "react";
import {
  Button,
  Input,
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  Select,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/authContext/Index";
import { signIn } from "../../../services/firebase/authFirebase";
const Index = () => {
  const { Option } = Select;
  const { user, setUser } = useAuth();
  const onSubmitSuccess = ({ email, password }) => {
    console.log("Success:", email, password);
    signIn(email, password)
      .then((res) => {
        console.log(res);
        console.log("Success");
      })
      .catch((err) => console.log(err));
  };

  const onSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const configRules = {
    rules: [{ required: true, message: "Campo requerido" }],
  };

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        this.formRef.current.setFieldsValue({
          note: "Hi, man!",
        });
        return;

      case "female":
        this.formRef.current.setFieldsValue({
          note: "Hi, lady!",
        });
        return;

      case "other":
        this.formRef.current.setFieldsValue({
          note: "Hi there!",
        });
    }
  };

  return (
    <div className="App">
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={{ span: 20, offset: 0 }} lg={{ span: 10 }}>
          <h1>Crea tu nueva cuenta!</h1>
          <Form
            name="basic"
            wrapperCol={{
              xs: { span: 20, offset: 0 },
              sm: { span: 16, offset: 4 },
            }}
            initialValues={{ remember: true }}
            onFinish={onSubmitSuccess}
            onFinishFailed={onSubmitFailed}
            autoComplete="off"
          >
            <Divider plain>Datos personales</Divider>
            <Form.Item name="name" {...configRules}>
              <Input placeholder="Nombres" />
            </Form.Item>
            <Form.Item name="lastName" {...configRules}>
              <Input placeholder="Apellidos" />
            </Form.Item>
            <Form.Item name="email" {...configRules}>
              <Input placeholder="Correo electrónico" />
            </Form.Item>
            <Form.Item name="date-nacimiento" {...configRules}>
              <DatePicker
                placeholder="Fecha de nacimiento"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item name="gender" {...configRules}>
              <Select
                placeholder="Selecciona tu genero"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="male">Masculino</Option>
                <Option value="female">Femenino</Option>
                <Option value="other">Otro</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("gender") === "other" ? (
                  <Form.Item name="customizeGender" {...configRules}>
                    <Input placeholder="Cual es tu genero?" />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Divider plain>Datos de la cuenta</Divider>
            <Form.Item name="username" {...configRules}>
              <Input placeholder="Usuario" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item name="password" {...configRules}>
              <Input.Password
                placeholder="Contraseña"
                prefix={<KeyOutlined />}
              />
            </Form.Item>
            <Form.Item name="confirm-password" {...configRules}>
              <Input.Password
                placeholder="Confirmar contraseña"
                prefix={<KeyOutlined />}
              />
            </Form.Item>

            <p>
              Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
            </p>

            <Form.Item>
              <Button type="primary" htmlType="submit" shape="round">
                Registrate
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Index;
