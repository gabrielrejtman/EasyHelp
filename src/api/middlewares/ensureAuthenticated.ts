import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";


export const ensureAuthenticated = async (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return reply.status(401).send({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ");

    try {
        jwt.verify(token, "ffdea0c3bed13906e0d6e9a59a4a6909");
        return next();
    }
    catch(err) {
        return reply.status(401).send({
            message: "Token is missing"
        })
    }
}