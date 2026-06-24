export interface User {
	id?: string;
	name: string;
	email: string;
	password: string;
	points: number; // Inicialmente vai ser aqui, implementação futura será adicionar pontos por bolao
}

export interface UserInput {
	name: string;
	email: string;
	password: string;
	points: number; // Inicialmente vai ser aqui, implementação futura será adicionar pontos por bolao
}