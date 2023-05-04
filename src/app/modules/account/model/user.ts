export class User {
    constructor(
        public name: string,
        public email: string,
        private _localId: string,
    ) { }
    
}

