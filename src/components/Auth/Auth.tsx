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
import { useMutation } from '@tanstack/react-query'
import {
  userSignupPoster,
  userLoginPoster,
  userLogoutPoster,
} from '../../utils/http-request'
import { SignupValuesType, LoginValuesType } from '../../helper/types'
import { showNotification, updateNotification } from '../../utils/notifications'
import { AxiosError } from 'axios'
import { closeAllModals } from '@mantine/modals'
import { useRouter } from 'next/router'

type Props = {
  type: 'signup' | 'login'
}

type ErrorType = {
  message: string
}

const Auth: React.FC<Props> = ({ type }) => {
  const [formType, setFormType] = React.useState(type)
  const router = useRouter()

  const {
    mutate: signup,
    error: signupError,
    isLoading: signupLoading,
  } = useMutation(userSignupPoster, {
    onSuccess: (data) => {
      console.log(data)
      showNotification({
        id: 'signup',
        type: 'success',
        title: 'Signup success',
        autoClose: 5000,
        message: 'You have successfully signed up. Please check you inbox to confirm the email address',
      })
      closeAllModals()
    },
    onError: (error: AxiosError) => {
      console.log(error)
      showNotification({
        id: 'signup',
        type: 'error',
        title: 'Error',
        autoClose: 5000,
        message:
          (error.response?.data as ErrorType).message ??
          'Something went wrong. Could not signup',
      })
    },
  })

  const {
    mutate: login,
    error: loginError,
    isLoading: loginLoading,
  } = useMutation(userLoginPoster, {
    onSuccess: (data) => {
      console.log(data)
      showNotification({
        id: 'login',
        type: 'success',
        title: 'Login success',
        autoClose: 3000,
        message: 'You have successfully logged in',
      })
      closeAllModals()
      router.reload()
    },
    onError: (error: AxiosError) => {
      console.log(error)
      showNotification({
        id: 'login',
        type: 'error',
        title: 'Error',
        autoClose: 5000,
        message:
          (error.response?.data as ErrorType).message ??
          'Something went wrong. Could not login',
      })
    },
  })

  const signupFormSubmissionHandler = (values: SignupValuesType) => {
    signup(values)
  }

  const loginFormSubmissionHandler = (values: LoginValuesType) => {
    console.log(values)
    login(values)
  }

  const signupForm = useForm({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      invitationCode: '',
    },
    validateInputOnBlur: true,
    validate: {
      repeatPassword: (value, { password }) => {
        if (value !== password) {
          return 'Passwords must match'
        }
      },
    },
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
      <form
        onSubmit={signupForm.onSubmit((values) =>
          signupFormSubmissionHandler(values)
        )}
      >
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            required
            {...signupForm.getInputProps('repeatPassword')}
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
              loading={signupLoading}
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
      <form
        onSubmit={loginForm.onSubmit((values) =>
          loginFormSubmissionHandler(values)
        )}
      >
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
              loading={loginLoading}
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
