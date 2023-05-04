export interface IRetrieveUserResponse {
    kind:string;
    users: [{
        displayName: string,
        email:string,
        localId: string
    }]
}