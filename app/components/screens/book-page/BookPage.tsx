import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoutes } from '@/hooks/useTypedRoutes'
import { Lesson } from '@/utils/database/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSQLiteContext } from 'expo-sqlite/build/hooks'
import { useCallback, useEffect, useState } from 'react'
import { YStack, Text, Button, ScrollView, XStack } from 'tamagui'

export const BookPage = () => {
	const db = useSQLiteContext()
	const [lessons, setLessons] = useState<Lesson[]>()
	const { navigate } = useTypedNavigation()

	const { params } = useTypedRoutes()

	const refetchBook = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setLessons(
					await db.getAllAsync<Lesson>(
						"SELECT * FROM 'lessons' WHERE book_id = ?",
						params!.slug
					)
				)
			})
		}
		refetch()
	}, [db])

	const storeData = async (book_id: string) => {
		await AsyncStorage.setItem('book-id', book_id)
	}

	useEffect(() => {
		refetchBook()
		storeData(params?.slug || '1')
	}, [])
	return (
		<YStack fullscreen px={20} py={20}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<XStack flex={1} gap='$3' flexWrap='wrap' self={'center'}>
					{lessons?.map(lesson => (
						<Button
							flex={1}
							flexBasis={140}
							key={lesson.id}
							my={5}
							onPress={() =>
								navigate('LessonPage', {
									slug: lesson.id.toString()
								})
							}
						>
							<Text>Урок {lesson.lesson_number}</Text>
						</Button>
					))}
				</XStack>
			</ScrollView>
		</YStack>
	)
}
