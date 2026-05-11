import { ICourse } from './ICourse';

export interface IUser{
    email: string;
    isActivated: boolean;
    id: string;
    role: 'student' | 'teacher';
    name: string;
    courses: ICourse[];
    /** URL or data URL; optional until loaded from API */
    avatar?: string | null;
    /** Необязательно; в основном для преподавателей */
    aboutMe?: string | null;
    certificates?: string | null;
    career?: string | null;
}
