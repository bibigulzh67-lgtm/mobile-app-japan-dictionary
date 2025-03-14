import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Book } from '@/utils/database/database'
import { useSQLiteContext } from 'expo-sqlite'
import { useCallback, useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Button, Card, YStack, Image, H3 } from 'tamagui'

export const Home = () => {
	const db = useSQLiteContext()
	const [book, setBook] = useState<Book | null>()
	const { navigate } = useTypedNavigation()

	const bookCovers: { [key: number]: string } = {
		1: require('@/assets/book-covers/1.jpg')
	}

	const bookCover = bookCovers[1]

	const refetchBook = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setBook(
					await db.getFirstAsync<Book>(
						"SELECT * FROM 'books' WHERE id = ?",
						1
					)
				)
			})
		}
		refetch()
	}, [db])

	useEffect(() => {
		refetchBook()
	}, [])

	return (
		<YStack
			flex={1}
			justify={'space-between'}
			px={20}
			py={20}
			gap='$5'
			fullscreen
		>
			<YStack width={'100%'}>
				<Pressable onPress={() => navigate('BookPage', { slug: '1' })}>
					<Card mx={'auto'} width={300} height={450} bordered>
						<Card.Background>
							<Image
								source={{
									uri: bookCover,
									width: 300,
									height: 450
								}}
							/>
						</Card.Background>
					</Card>
				</Pressable>
				<H3 text={'center'} my={10} width={'100%'} fontSize={'$5'}>
					{book?.name}
				</H3>
			</YStack>
			<Button
				theme={'accent'}
				size='$5'
				my={10}
				onPress={() => navigate('Lessons')}
			>
				Все занятия
			</Button>
		</YStack>
	)
}
