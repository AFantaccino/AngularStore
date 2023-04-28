export interface IRetrieveUserResponse {
    kind:string;
    users: [{
        email:string,
        localId: string
    }]
}