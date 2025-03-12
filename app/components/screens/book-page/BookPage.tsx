import { useTypedRoutes } from '@/hooks/useTypedRoutes'
import { Lesson } from '@/utils/database/database'
import { useSQLiteContext } from 'expo-sqlite/build/hooks'
import { useCallback, useEffect, useState } from 'react'
import { YStack, Text } from 'tamagui'

export const BookPage = () => {
	const db = useSQLiteContext()
	const [book, setBook] = useState<Lesson[]>()

	const { params } = useTypedRoutes()

	const refetchBook = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setBook(
					await db.getAllAsync<Lesson>(
						"SELECT * FROM 'lessons' WHERE book_id = ?",
						params!.slug
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
		<YStack fullscreen>
			<Text>BookPage</Text>
			{book?.map(lesson => (
				<Text key={lesson.id} my={5}>
					{lesson.lesson_number}
				</Text>
			))}
		</YStack>
	)
}
