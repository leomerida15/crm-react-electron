import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import usePromise from "react-use-promise";
import { handleRegister, useRoles } from "../../data/auth";
import useAsync from "../../hooks/useAsync";
import { useState } from "react";

setLocale({
  string: {
    email: ({ label }) => `El campo ${label} debe ser un correo valido`,

    min: ({ min }) => `Elte campo dete tener un largo de ${min} minimo`,
    max: ({ max }) => `Elte campo dete tener un largo de ${max} como maximo`,
  },
  mixed: {
    required: ({ label }) => `EL campo ${label} es requerido`,
  },
});

const schema = yup
  .object({
    email: yup.string().email().required().label("Correo"),
    password: yup.string().required().min(6).max(12).label("Contraseña"),
  })
  .required();

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const Resp: { id: number; name: string }[] = useRoles() ?? [];

  const [Data, setData] = useState({});

  const Action = (data: any) => {
    setData(data);
    debugger;
    submitAsync.execute();
  };

  const submit = async (data: any): Promise<any> => {
    console.log("data", data);
    const info = await handleRegister({ body: data });
    console.log("info", info);
  };

  const submitAsync = useAsync<any>(() => submit(Data), false);

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Soluvisual</Heading>
      </Stack>

      <pre>{JSON.stringify(submitAsync)}</pre>

      <FormErrorMessage>
        {submitAsync.error
          ? "Alguno de los datos suministrado es incorrecto"
          : ""}
      </FormErrorMessage>

      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        as="form"
        onSubmit={handleSubmit(Action)}
      >
        {/* // ? formulario */}
        <Stack spacing={4}>
          {/* 
             //? =======> Correo 
          */}
          <FormControl isInvalid={errors.email} id="email">
            <FormLabel>Correo</FormLabel>
            <Input {...register("email")} type="email" />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* 
             //? =======> Password 
          */}
          <FormControl isInvalid={errors.password} id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input {...register("password")} type="password" />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {/* 
             //? =======> rols 
          */}

          {/* <FormControl isInvalid={errors.password}>
            <FormLabel>Rol del usuario</FormLabel>

            <Select placeholder="Select option">
              {Resp.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </Select>
            <FormErrorMessage>
              This error message shows because of an invalid FormControl
            </FormErrorMessage>
          </FormControl> */}

          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Recuerdame</Checkbox>
              <Link color={"blue.400"}>¿Olvido su contraseña?</Link>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
