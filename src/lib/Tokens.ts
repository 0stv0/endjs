import * as jwt from 'jsonwebtoken';

const genToken = (user: string, expiresIn: number, secret: string): string => jwt.sign({sub: user}, secret, {expiresIn: expiresIn});
const checkToken = (user: string, token: string, secret: string): boolean =>
{
    try
    {
        let payload: jwt.JwtPayload = jwt.verify(token, secret) as jwt.JwtPayload;
        return payload.sub === user;
    }
    catch (e) { return false; }
};

export { genToken, checkToken };