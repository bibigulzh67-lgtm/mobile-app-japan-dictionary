import { Home } from '@/components/screens/home/Home'
import { Lessons } from '@/components/screens/lessons/Lessons'
import { IRoute } from './navigation.types'
import { BookPage } from '@/components/screens/book-page/BookPage'
import { LessonPage } from '@/components/screens/lesson-page/LessonPage'
import { WordPage } from '@/components/screens/word-page/WordPage'

export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home,
		title: 'Главная'
	},
	{
		name: 'Lessons',
		component: Lessons,
		title: 'Все занятия'
	},
	{
		name: 'BookPage',
		component: BookPage,
		title: 'Занятия'
	},
	{
		name: 'LessonPage',
		component: LessonPage,
		title: 'Занятие'
	},
	{
		name: 'WordPage',
		component: WordPage,
		title: ''
	}
]
