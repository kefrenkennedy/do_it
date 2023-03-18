import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/input";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

function Signup() {
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form>
            <h1>Cadastro</h1>
            <Input icon={FiUser} label="Nome" placeholder=" Seu nome"></Input>
            <Input icon={FiMail} label="Email" placeholder=" Seu melhor email"></Input>
            <Input icon={FiLock}
              label="Senha"
              placeholder=" Uma senha bem segura"
              type="password"
            ></Input>
            <Input icon={FiLock}
              label="Confirmação de senha"
              placeholder=" Confirmação de senha"
              type="password"
            ></Input>
            <Button>Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/link">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
