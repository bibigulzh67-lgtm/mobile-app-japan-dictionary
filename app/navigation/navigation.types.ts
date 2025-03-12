import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Home: undefined
	Lessons: undefined
	BookPage: {
		slug: string
	}
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}
