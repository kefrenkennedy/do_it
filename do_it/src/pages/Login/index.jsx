import { Link, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/input";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

function Login() {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido.").required("Campo Obrigatório."),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos.")
      .required("Campo Obrigatório."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password };
    api
      .post("/user/register", user)
      .then((_) => {
        toast.success("Sucesso ao logar!");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao logar, verifique as informações."));
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Login</h1>
            <Input
              register={register}
              name={"email"}
              icon={FiMail}
              label="Email"
              placeholder=" Seu melhor email"
              errors={errors.email?.message}
            ></Input>
            <Input
              register={register}
              name={"password"}
              icon={FiLock}
              label="Senha"
              placeholder=" Uma senha bem segura"
              type="password"
              errors={errors.password?.message}
            ></Input>
            <Button type="submit">Enviar</Button>
            <p>
              Não tem uma conta? Faça seu <Link to="/signup">Cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
