import React from "react";
import { logOut } from "../../../services/firebase/authFirebase";
import { useAuth } from "../../context/authContext/Index";
import { Layout } from "antd";

const Index = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const { user, setStateUser, loading } = useAuth();
  const logOutSesion = () => {
    logOut().then(() => {
      setStateUser(null);
    });
  };

  if (loading) return <h1>Cargando</h1>;

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header>
          Header<button onClick={logOutSesion}>SAlir</button>
        </Header>
        <Layout>
          <Sider>Sider </Sider>
          <Content style={{ overflowY: "scroll" }}>

            <h2 className="text-4xl text-center">{user.email}</h2>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Index;
