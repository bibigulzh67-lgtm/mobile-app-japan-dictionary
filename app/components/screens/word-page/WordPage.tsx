import { useTypedRoutes } from '@/hooks/useTypedRoutes'
import { Word } from '@/utils/database/database'
import { useSQLiteContext } from 'expo-sqlite/build/hooks'
import { useCallback, useEffect, useState } from 'react'
import {
	H2,
	H5,
	Separator,
	SizableText,
	Tabs,
	TabsContentProps,
	YStack
} from 'tamagui'

type VerticalTabsProps = {
	accent: string | undefined
	romaji: string | undefined
	russian: string | undefined
}

const VerticalTabs = (props: VerticalTabsProps) => {
	return (
		<Tabs
			defaultValue='tab1'
			flexDirection='row'
			orientation='vertical'
			width={'100%'}
			borderRadius='$4'
			borderWidth='$0.25'
			overflow='hidden'
			borderColor='$borderColor'
		>
			<Tabs.List
				disablePassBorderRadius='end'
				aria-label='Manage your account'
				separator={<Separator />}
			>
				<Tabs.Tab value='tab1'>
					<SizableText>Акцент</SizableText>
				</Tabs.Tab>
				<Tabs.Tab value='tab2'>
					<SizableText>Латиница</SizableText>
				</Tabs.Tab>
				<Tabs.Tab value='tab3'>
					<SizableText>Перевод</SizableText>
				</Tabs.Tab>
			</Tabs.List>
			<Separator vertical />
			<TabsContent value='tab1'>
				<H5 textAlign='center'>{props.accent}</H5>
			</TabsContent>
			<TabsContent value='tab2'>
				<H5 textAlign='center'>{props.romaji}</H5>
			</TabsContent>
			<TabsContent value='tab3'>
				<H5 textAlign='center'>{props.russian}</H5>
			</TabsContent>
		</Tabs>
	)
}

const TabsContent = (props: TabsContentProps) => {
	return (
		<Tabs.Content
			backgroundColor='$background'
			key='tab3'
			padding='$2'
			alignItems='center'
			justifyContent='center'
			flex={1}
			borderColor='$background'
			borderRadius='$2'
			borderTopLeftRadius={0}
			borderTopRightRadius={0}
			borderWidth='$2'
			{...props}
		>
			{props.children}
		</Tabs.Content>
	)
}

export const WordPage = () => {
	const db = useSQLiteContext()
	const [word, setWord] = useState<Word | null>()

	const { params } = useTypedRoutes()

	const refetchWord = useCallback(() => {
		async function refetch() {
			await db.withExclusiveTransactionAsync(async () => {
				setWord(
					await db.getFirstAsync<Word>(
						"SELECT * FROM 'words' WHERE id = ?",
						params!.slug
					)
				)
			})
		}
		refetch()
	}, [db])

	useEffect(() => {
		refetchWord()
	}, [])

	return (
		<YStack justify='center' px={20} py={20}>
			<H2 py={20}>{word?.japanese || 'error'}</H2>
			<VerticalTabs
				accent={word?.accent}
				romaji={word?.romaji}
				russian={word?.russian}
			/>
		</YStack>
	)
}
