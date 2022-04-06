import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
	email: string;
	password: string;
};

const signInFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Você simplesmente deixou de digitar seu email')
		.email('Meteu essa! Esse email não é valido'),
	password: yup.string().required('Ih!. Esqueceu de digitar sua senha'),
});

export default function Home() {
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(signInFormSchema),
	});

	const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const { errors } = formState;
		console.log(errors);
	};

	return (
		<Flex w='100vw' h='100vh' alignItems='center' justify='center'>
			<Flex
				as='form'
				width='100%'
				maxWidth={360}
				bg='gray.800'
				p='8'
				borderRadius={8}
				flexDir='column'
				onSubmit={handleSubmit(handleSignIn)}
			>
				<Stack spacing={4}>
					<Input
						name='email'
						type='email'
						label='E-mail'
						error={formState.errors.email}
						{...register('email')}
					/>
					<Input
						name='password'
						type='password'
						label='Senha'
						error={formState.errors.password}
						{...register('password')}
					/>
				</Stack>
				<Button
					type='submit'
					mt='6'
					colorScheme='pink'
					size='lg'
					isLoading={formState.isSubmitting}
				>
					Entrar
				</Button>
			</Flex>
		</Flex>
	);
}
