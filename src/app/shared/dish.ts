import { Comment } from './comment';
export class Dish {
    id: number;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    description: string;
    comments: Comment[];
    featured: boolean;
}
