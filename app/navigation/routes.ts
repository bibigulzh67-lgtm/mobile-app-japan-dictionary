import { Home } from '@/components/screens/home/Home'
import { Lessons } from '@/components/screens/lessons/Lessons'
import { IRoute } from './navigation.types'
import { BookPage } from '@/components/screens/book-page/BookPage'

export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Lessons',
		component: Lessons
	},
	{
		name: 'BookPage',
		component: BookPage
	}
]
