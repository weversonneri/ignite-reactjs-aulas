import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface ProfileProps {
	showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
	return (
		<Flex align='center'>
			{showProfileData && (
				<Box mr='4' textAlign='right'>
					<Text>Nome</Text>
					<Text color='gray.300' fontSize='small'>
						Email
					</Text>
				</Box>
			)}

			<Avatar
				size='md'
				name='Weverson Neri'
				src='https://github.com/weversonneri.png'
			/>
		</Flex>
	);
}
