import { Container, InputContainer } from "./styles";

function Input({ label, icon: Icon, register, name, errors, ...rest }) {
  return (
    <Container>
      <div>
        {label} {!!errors && <span> - {errors}</span>}
      </div>
      <InputContainer isErrored={!!errors}>
        {Icon && <Icon size={20} />}
        <input {...register(name)} {...rest} />
      </InputContainer>
    </Container>
  );
}

export default Input;
