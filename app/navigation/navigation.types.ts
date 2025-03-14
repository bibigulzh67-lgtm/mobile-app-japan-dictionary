import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Home: undefined
	Lessons: undefined
	BookPage: {
		slug: string
	}
	LessonPage: {
		slug: string
	}
	WordPage: {
		slug: string
	}
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	title?: string
}
