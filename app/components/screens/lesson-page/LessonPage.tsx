import { Text, ScrollView, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite/build/hooks'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoutes } from '@/hooks/useTypedRoutes'
import { Word } from '@/utils/database/database'
import { YStack, XStack, Separator } from 'tamagui'

export const LessonPage = () => {
	const db = useSQLiteContext()
	const [words, setWords] = useState<Word[]>()
	const { navigate } = useTypedNavigation()

	const { params } = useTypedRoutes()

	const refetchWords = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setWords(
					await db.getAllAsync<Word>(
						"SELECT * FROM 'words' WHERE lesson_id = ?",
						params!.slug
					)
				)
			})
		}
		refetch()
	}, [db])

	useEffect(() => {
		refetchWords()
	}, [])

	return (
		<YStack fullscreen px={20} py={20}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<YStack gap='$3' flexWrap='wrap'>
					{words?.map(word => {
						const regex = /\p{P}/gu
						const replacedWord = word.russian
							.replace(regex, '')
							.trimStart()
						const cutWord = replacedWord.split(' ')[0]
						return (
							<Pressable
								key={word.id}
								onPress={() =>
									navigate('WordPage', {
										slug: word.id.toString()
									})
								}
							>
								<YStack maxW={'100%'}>
									<XStack
										width={'100%'}
										flex={1}
										justify={'space-between'}
									>
										<Text>{word.japanese}</Text>
										<Text>{cutWord}</Text>
									</XStack>
									<Separator my={20} />
								</YStack>
							</Pressable>
						)
					})}
				</YStack>
			</ScrollView>
		</YStack>
	)
}
