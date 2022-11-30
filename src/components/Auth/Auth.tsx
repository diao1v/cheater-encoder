import React from 'react'
import {
  Center,
  Paper,
  Button,
  Text,
  Title,
  Stack,
  TextInput,
  PasswordInput,
  Group,
} from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'

type Props = {
  type: 'signup' | 'login'
}

const Auth: React.FC<Props> = ({ type }) => {
  const [formType, setFormType] = React.useState(type)

  const signupForm = useForm({
    initialValues: {
      email: '',
      password: '',
      invitationCode: '',
    },
    validateInputOnBlur: true,
    validate: {},
  })

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnBlur: true,
    validate: {},
  })

  if (formType === 'signup') {
    return (
      <form onSubmit={signupForm.onSubmit((values) => console.log(values))}>
        <Title
          size={25}
          weight={700}
          align="center"
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        >
          Sign up for a new account
        </Title>
        <Stack mt="lg" spacing="md">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            {...signupForm.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            {...signupForm.getInputProps('password')}
          />
          <TextInput
            label="Invitation Code"
            placeholder="Enter your invitation code"
            required
            {...signupForm.getInputProps('invitationCode')}
          />
          <Group position="apart" align="center" mt={20}>
            <Text
              size={14}
              color="lime"
              onClick={() => setFormType('login')}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  color: 'teal',
                  borderBottom: '1px solid lime',
                },
              }}
            >
              Already have an account?
            </Text>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              loading={false}
              loaderPosition="right"
            >
              Sign Up
            </Button>
          </Group>
        </Stack>
      </form>
    )
  } else if (formType === 'login') {
    return (
      <form onSubmit={loginForm.onSubmit((values) => console.log(values))}>
        <Title
          size={25}
          weight={700}
          align="center"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >
          Login to you account
        </Title>
        <Stack mt="lg" spacing="md">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            {...loginForm.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            {...loginForm.getInputProps('password')}
          />
          <Group position="apart" align="center" mt={20}>
            <Text
              size={14}
              color="indigo"
              onClick={() => setFormType('signup')}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  color: 'indigo',
                  borderBottom: '1px solid indigo',
                },
              }}
            >
              Don&apos;t have an account? Sign up here
            </Text>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 105 }}
              loading={false}
              loaderPosition="right"
            >
              Login
            </Button>
          </Group>
        </Stack>
      </form>
    )
  } else {
    return null
  }
}

export default Auth
