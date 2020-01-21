import { Ownership } from './ownership';

export class User {
    username: string;
    wallet: number;
    stockOwned: Array<Ownership>;
}
