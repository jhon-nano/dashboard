import { Button, Heading, Image, useAuthenticator, useTheme, View, Text } from "@aws-amplify/ui-react";
import { CodeTwoTone, SecurityTwoTone } from "@mui/icons-material";
import { CardHeader, Stack, Typography, useTheme as useThemeMui } from "@mui/material";



export const components = {
  Header() {
    const { tokens } = useTheme();

    return (<Stack direction={'row'}>


      <CardHeader
        avatar={
          <Image
            alt="logo"
            src="/img/CodeLineWhite.png"
            width={70}
            height={80}
            style={{ color: 'white' }}
          />}
        title="BIENVENIDO"
        titleTypographyProps={{
          color: '#566472',
          variant: 'h3',
          fontFamily: 'fantasy',
          textAlign: 'center'
        }}
        subheader={
          <Stack>
            <Typography color={'#566472'} variant="button" fontSize={18} lineHeight={1} fontFamily={'fantasy'}>
              CODE LINE SOLUTIONS<br />

            </Typography>
            <Typography color={'#566472'} variant="button" fontSize={8} lineHeight={1}>
              Transformando ideas en código
            </Typography>
          </Stack>}
        subheaderTypographyProps={{
          textAlign: 'center'
        }}
        sx={{
          width: '100%',
          margin: 0,
          paddingTop: 0,
          paddingBottom: 1,
        }}

      />

    </Stack>



    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>

        <Text color={tokens.colors.neutral[80]} fontSize={12}>
          &copy; 2024 Code Line Solutions. Todos los derechos reservados.
        </Text>

      </View>
    );
  },

  SignIn: {
    Header() {
      const theme = useThemeMui();

      return (


        <CardHeader
          avatar={
            <Image
              alt="logo"
              src="/img/logo.png"
              width={120}
              style={{ color: 'white' }}
            />}
          title="INGRESE"
          titleTypographyProps={{
            color: '#566472',
            fontFamily: 'fantasy',
            fontSize: 36,

          }}
          subheader="SUS CREDENCIALES"
          subheaderTypographyProps={{
            color: '#566472',
            fontFamily: 'fantasy',
            fontSize: 36,
          }}
          sx={{
            borderBottom: 2,
            borderColor: '#566472',
            background: 'white'
          }}
          action={<SecurityTwoTone color='#566472' fontSize="large" />}
        />

      );
    },
    Footer() {

      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center" paddingBottom={10}>
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Olvidaste tu Contraseña
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  SetupTotp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ForgotPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

export const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};





export default { components, formFields }