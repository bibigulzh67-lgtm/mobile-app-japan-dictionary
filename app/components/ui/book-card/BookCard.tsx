import { CardProps, Card, Image } from 'tamagui'

type BookCardProps = {
	bookId: string
	name: string
	imageUrl: string
} & CardProps

export function BookCard(props: BookCardProps) {
	return (
		<Card size='$2' width={170} height={250} bordered {...props}>
			<Card.Background>
				<Image
					source={{
						uri: props.imageUrl,
						width: 180,
						height: 250
					}}
				/>
			</Card.Background>
		</Card>
	)
}
