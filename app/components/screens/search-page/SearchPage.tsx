import { Text, ScrollView, Pressable } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite/build/hooks'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Word } from '@/utils/database/database'
import { YStack, XStack, Separator, Button, Input } from 'tamagui'

export const SearchPage = () => {
	const db = useSQLiteContext()
	const [words, setWords] = useState<Word[]>()
	const [searchInput, setSearchInput] = useState<string>('')
	const { navigate } = useTypedNavigation()
	const scrollViewRef = useRef<ScrollView>(null)

	async function refetch(query: string) {
		const searchQuery = `%${query}%`
		await db.withExclusiveTransactionAsync(async () => {
			setWords(
				await db.getAllAsync<Word>(
					"SELECT * FROM 'words' WHERE russian LIKE ? OR japanese LIKE ? LIMIT 100",
					searchQuery
				)
			)
		})
	}

	useEffect(() => {
		refetch('')
	}, [])

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			refetch(searchInput)
			scrollViewRef.current?.scrollTo({ y: 0, animated: false })
		}, 500)

		return () => clearTimeout(delayDebounce)
	}, [searchInput])

	return (
		<YStack fullscreen px={20} py={20}>
			<XStack mb={'$5'}>
				<Input
					flex={1}
					size={'$4'}
					placeholder={'Введите слово..'}
					value={searchInput}
					onChangeText={value => setSearchInput(value)}
				/>
			</XStack>
			<ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
				<YStack gap='$3' flexWrap='wrap'>
					{words?.map(word => {
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
									<XStack width={'100%'} flex={1} justify={'space-between'}>
										<Text>{word.japanese}</Text>
										<Text
											numberOfLines={1}
											ellipsizeMode='tail'
											style={{
												width: 150,
												textAlign: 'right'
											}}
										>
											{word.russian}
										</Text>
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
