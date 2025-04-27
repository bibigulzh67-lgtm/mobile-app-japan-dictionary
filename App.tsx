import { Navigation } from '@/navigation/Navigation'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from 'tamagui.config'
import { SQLiteProvider } from 'expo-sqlite'
import { Suspense } from 'react'
import { ActivityIndicator } from 'react-native'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<TamaguiProvider config={tamaguiConfig}>
					<Suspense fallback={<ActivityIndicator size='large' />}>
						<SQLiteProvider
							databaseName='vocabulary1.db'
							assetSource={{
								assetId: require('./app/assets/database/vocabulary.db')
							}}
						>
							<Navigation />
						</SQLiteProvider>
					</Suspense>
				</TamaguiProvider>
			</SafeAreaProvider>
			<StatusBar style='light' />
		</>
	)
}
