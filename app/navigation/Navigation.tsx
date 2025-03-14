import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from './navigation.types'
import { routes } from './routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

export const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{routes.map(route => (
					<Stack.Screen
						key={route.name}
						options={{
							title: route.title
						}}
						{...route}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
