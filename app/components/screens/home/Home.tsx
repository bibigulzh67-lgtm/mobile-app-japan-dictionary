import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Book } from '@/utils/database/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useSQLiteContext } from 'expo-sqlite'
import { useCallback, useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Button, YStack, Image } from 'tamagui'

export const Home = () => {
	const db = useSQLiteContext()
	const [book, setBook] = useState<Book | null>()
	const { navigate } = useTypedNavigation()
	const [bookId, setBookId] = useState<string>('1')

	const getData = async () => {
		const value = await AsyncStorage.getItem('book-id')
		if (value !== null) {
			setBookId(value)
		}
	}

	const bookCovers: { [key: number]: string } = {
		1: require('@/assets/book-covers/1.jpg'),
		2: require('@/assets/book-covers/2.jpg'),
		3: require('@/assets/book-covers/3.jpg'),
		4: require('@/assets/book-covers/4.jpg'),
		5: require('@/assets/book-covers/5.jpg'),
		6: require('@/assets/book-covers/6.jpg'),
		7: require('@/assets/book-covers/7.jpg')
	}

	const refetchBook = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setBook(await db.getFirstAsync<Book>("SELECT * FROM 'books' WHERE id = ?", bookId))
			})
		}
		refetch()
	}, [db])

	useFocusEffect(
		useCallback(() => {
			getData()
			refetchBook()
		}, [])
	)

	return (
		<YStack justify={'space-between'} px={20} py={20} fullscreen>
			<YStack justify={'center'} width={'100%'}>
				<Pressable onPress={() => navigate('BookPage', { slug: bookId })}>
					<Image
						style={{ width: '80%', height: '83%', alignSelf: 'center' }}
						source={{
							uri: bookCovers[+bookId]
						}}
					/>
				</Pressable>
			</YStack>
			<YStack>
				<Button theme={'accent'} size='$5' my={10} onPress={() => navigate('Lessons')}>
					Все занятия
				</Button>
				<Button theme={'accent'} size='$5' my={10} onPress={() => navigate('SearchPage')}>
					Поиск
				</Button>
			</YStack>
		</YStack>
	)
}
