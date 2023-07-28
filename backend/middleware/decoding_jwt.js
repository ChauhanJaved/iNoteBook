// Import the 'jsonwebtoken' library, which is used to decode JSON Web Tokens (JWTs)
import jwt from "jsonwebtoken";

// This function is middleware for Express.js that decodes JWTs. 
// Middleware is code that runs between receiving the request and sending the response and can operate on the request and response objects.
const decoding_jwt = (req, res, next) => {
    console.log(req.header("auth-token"));
    // The 'req' object represents the HTTP request. The 'header' method is used to get the value of a header in the request.
    // In this case, we are getting the value of the 'auth-token' header, which should contain the JWT.
    const token = req.header("auth-token");

    // If no token was provided, return an error response with status code 401 (Unauthorized).
    if (!token) return res.status(401).send({error: "Access Denied"});

    try {
        // The 'verify' method decodes the JWT. It throws an error if the token is not valid or if the secret key is not correct.
        // 'process.env.JWT_SECRET' is the secret key used to encode the JWT, and should be stored securely as an environment variable.
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // If the token was successfully decoded, the payload of the token is attached to the 'req' object.
        // This payload typically contains user information, and can be accessed in subsequent middleware and route handlers.
        console.log("playload: "  + verified);
        req.data  =  verified ;

        // The 'next' function is called to pass control to the next middleware function.
        // If 'next' is not called, the request-response cycle will hang indefinitely unless the response has been sent.
        next();
    } catch (error) {
        // If an error occurred while decoding the JWT (for example, the token is not valid or the secret key is not correct), 
        // an error response with status code 400 (Bad Request) is sent.
        res.status(400).send("Invalid Token");
    }
};

// Export the middleware function for use in other modules
export default decoding_jwt;
