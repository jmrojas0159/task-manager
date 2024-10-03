
export interface Skill {
  name: string;
}

export interface Person {
  fullName: string;
  age: number;
  skills: Skill[];
}

export interface Task {
  id: number;
  name: string;
  date: string;
  completed: boolean;
  people: Person[];
}
