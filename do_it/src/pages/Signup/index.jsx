import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/input";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

function Signup({authenticated}) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório."),
    email: yup.string().email("Email inválido.").required("Campo Obrigatório."),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos.")
      .required("Campo Obrigatório."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes.")
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
        toast.success("Sucesso ao criar a conta!");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta, verifique as informações."));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              name={"name"}
              icon={FiUser}
              label="Nome"
              placeholder=" Seu nome"
              errors={errors.name?.message}
            ></Input>
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
            <Input
              register={register}
              name={"passwordConfirm"}
              icon={FiLock}
              label="Confirmação de senha"
              placeholder=" Confirmação de senha"
              type="passwordConfirm"
              errors={errors.passwordConfirm?.message}
            ></Input>
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
