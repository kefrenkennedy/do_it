import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Input from "../../components/input";
import { FiEdit2 } from "react-icons/fi";

import { Container, InputContainer, TaskContainer } from "./styles";
import Button from "../../components/Button";

function Dashboard({ authenticated }) {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  function loadTasks() {
    api
      .get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((res) => {
        const apiTask = res.data.data.map((task) => ({
          ...task,
          created_at: new Date(task.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTask);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa.");
    }
    api
      .post(
        "task",
        { description: task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);

    api
      .put(
        `/task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setTasks(newTasks));
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>20 de março de 2023</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova Tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TaskContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.created_at}
            onClick={() => handleCompleted(task._id)}
          />
        ))}
      </TaskContainer>
    </Container>
  );
}

export default Dashboard;
