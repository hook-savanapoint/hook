declare namespace Express {
    interface Request {
        creator: 
        | {
            uid: string
           }

        | Document<any, any, any>;


        key: 
        | {
          creator: string,
          key: string,
          flag: string 
        }

        | Document<any, any, any>;
        
        
        collection: 
    | { id: string,
        creator: string,
        name: string
    }

    | Document<any, any, any>
    }

    
}
