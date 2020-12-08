import {Request, Response} from "express"
import * as jwt from "jsonwebtoken";
import { apiConfig } from "./api-config";

export const handleAuthorization = (req: Request, resp: Response, next) => {
    const token = extractToken(req);
    if (!token) {
        resp.setHeader("WWW-Authenticate", "Bearer token_type='JWT'")
        resp.status(401).json({message: "Você precisa se autenticar."})
    } else {
        jwt.verify(token, apiConfig.secret, (error, decoded)=>{
            if(decoded){
                next();
            }else{
                resp.status(403).json({message: "Não autorizado"})
            }
        })
    }

}

function extractToken(req: Request): string{
    let token = undefined;
    if(req.headers &&  req.headers.authorization){
        const part : string[] = req.headers.authorization.split(' ')
        if(part.length == 2 &&  part[0] === 'Bearer'){
            token = part[1]; 
        }
    }
    return token;
}