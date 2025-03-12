import { CardProps, Card, XStack, Button, Image, H4 } from 'tamagui'

type BookCardProps = {
	bookId: string
	name: string
	imageUrl: string
} & CardProps

export function BookCard(props: BookCardProps) {
	return (
		<Card size='$2' width={170} height={250} bordered {...props}>
			<Card.Header padded>
				<H4 py={10} lineHeight={'$1'} fontSize={'$1'}>
					{props.name}
				</H4>
			</Card.Header>
			<Card.Footer padded>
				<XStack flex={1} />
				<Button theme={'accent'}>Open</Button>
			</Card.Footer>
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
