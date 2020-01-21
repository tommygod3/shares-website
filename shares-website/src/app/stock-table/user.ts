import { Ownership } from './ownership';

export class User {
    username: string;
    password: string;
    wallet: number;
    stockOwned: Array<Ownership>;
}
