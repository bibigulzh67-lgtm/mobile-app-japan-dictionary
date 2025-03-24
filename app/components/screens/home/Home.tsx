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
		<YStack justify={'space-between'} px={20} py={20} fullscreen>
			<YStack justify={'center'} width={'100%'}>
				<Pressable onPress={() => navigate('BookPage', { slug: '1' })}>
					<Image
						style={{ width: 170, height: 240, alignSelf: 'center' }}
						source={{
							uri: bookCover
						}}
					/>
				</Pressable>
				<H3 text={'center'} width={'100%'} fontSize={'$3'}>
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
