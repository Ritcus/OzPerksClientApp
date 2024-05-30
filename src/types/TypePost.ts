export type Post ={
    id?: string;
    isDeleted?:string;
    title: string;
    body: string;
    isActive?:string;
    image?:string;
    createdAt?:Date;
    lastUpdatedAt?:Date;
    type:number;

}