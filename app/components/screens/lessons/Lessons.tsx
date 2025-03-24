import { Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { BookCard } from '@/components/ui/book-card/BookCard'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Book } from '@/utils/database/database'
import { useSQLiteContext } from 'expo-sqlite'
import { YStack, XStack, Button } from 'tamagui'

export const Lessons = () => {
	const db = useSQLiteContext()
	const [books, setBooks] = useState<Book[]>([])
	const { navigate } = useTypedNavigation()

	const bookCovers: { [key: number]: string } = {
		1: require('@/assets/book-covers/1.jpg'),
		2: require('@/assets/book-covers/2.jpg'),
		3: require('@/assets/book-covers/3.jpg'),
		4: require('@/assets/book-covers/4.jpg'),
		5: require('@/assets/book-covers/5.jpg'),
		6: require('@/assets/book-covers/6.jpg'),
		7: require('@/assets/book-covers/7.jpg')
	}

	const refetchBooks = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setBooks(await db.getAllAsync<Book>("SELECT * FROM 'books'"))
			})
		}
		refetch()
	}, [db])

	useEffect(() => {
		refetchBooks()
	}, [])

	return (
		<YStack px={20} py={20} gap='$5' fullscreen>
			<ScrollView showsVerticalScrollIndicator={false}>
				<XStack
					flex={1}
					gap='$3'
					flexWrap='wrap'
					justify='space-between'
					maxW={'90%'}
					self={'center'}
				>
					{books.map(book => (
						<Pressable
							onPress={() =>
								navigate('BookPage', {
									slug: book.id.toString()
								})
							}
							key={book.id}
						>
							<BookCard
								bookId={book.id.toString()}
								name={book.name}
								imageUrl={bookCovers[book.id]}
							/>
						</Pressable>
					))}
				</XStack>
			</ScrollView>
		</YStack>
	)
}
