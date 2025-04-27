export interface Book {
	id: number
	name: string
}

export interface Lesson {
	id: number
	lesson_number: number
	book_id: number
}

export interface Word {
	id: number
	japanese: string
	accent: string
	romaji: string
	russian: string
	kanji: string
	lesson_id: string
}
