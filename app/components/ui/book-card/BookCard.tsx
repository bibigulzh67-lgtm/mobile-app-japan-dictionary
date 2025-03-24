import { CardProps, Card, Image } from 'tamagui'

type BookCardProps = {
	bookId: string
	name: string
	imageUrl: string
} & CardProps

export function BookCard(props: BookCardProps) {
	return (
		<Card width={120} height={180} bordered {...props}>
			<Card.Background>
				<Image
					source={{
						uri: props.imageUrl,
						width: 120,
						height: 180
					}}
				/>
			</Card.Background>
		</Card>
	)
}
