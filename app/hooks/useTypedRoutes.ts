import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { RouteProp, useRoute } from '@react-navigation/native'

export const useTypedRoutes = <N extends keyof TypeRootStackParamList>() =>
	useRoute<RouteProp<TypeRootStackParamList, N>>()
