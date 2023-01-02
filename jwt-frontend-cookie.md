---
title: JWT Tokens in the frontend
theme: "white"
---

## What are HTTP Cookies..?

As you all know, HTTP is a stateless protocol which means that the client-server connection is lost once the transaction ends between them. So, HTTP server does not save details about each client. Hence, server can not decide whether a request came from a client who has requested before or from a new one.

Cookie is used as a stolution for this problem. It is a small piece of data sent from server and stored on client’s computer by the web browser when a client sends a request to a particular server. It is reliable mechanism to remember stateful information since HTTP is stateless.

HTTP cookie is a combination of following components.

Name
Value
Attributes- Domain, Path, Expires, Max-Age, HttpOnly, Secure

# JWT Tokens in the frontend

---

There are many ways to store JWT tokens in the frontend

Here are 2 of the most common:

1. JWT as httpOnly cookie 🍪
2. JWT in localstorage / sessionStorage 🏪

---

## Storing JWT in a httpOnly cookie 🍪

---

**Storing JWT in a httpOnly cookie 🍪**

1. Server sends the JWT token back to the client
2. Client (browser) automatically handles the cookie, and sends it with each subsequent request

---

**Storing JWT in a httpOnly cookie 🍪**

Responsibilities

Server:

Generate and send JWT token as httpOnly cookie

Client:

None

---

How to send a httpOnly cookie with Express.js:

```javascript
response
  .cookie("jwt", jwtToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })
  .send({
    success: true,
    message: "Login successful",
  });
```

---

httpOnly cookies 🍪 are more secure

They are handled by the browser

They can not be accessed from the frontend code (JavaScript)

---

## JWT in localStorage / sessionStorage 🏪

---

**Storing JWT in localStorage / sessionStorage 🏪**

1. Server sends the JWT token back to the client
2. Client must handle the response from the server and save it (to localStorage)
3. Client must handle sending the JWT token back with every authorization request

---

**Storing JWT in localStorage / sessionStorage 🏪**

Responsibilities

Server:

Generate and send JWT token

Client:

Storing and send JWT token

##

(jsonwebtoken) (jsonwebtoken)

Generating the token - Verifying the token

(jsonwebtoken) (passport.js + passport-jwt)

Generating the token - Verifying the token

Patterns
Patterns in programming represent a well established structure for solving a problem

useEffect() - good example of pub-sub pattern

Anti-Patterns
Well recognised pattern which represents a bad or inefficient solution to a problem

Handling the jsonwebtoken
(1)

Server can send the token as part of the response
Client sends token through the Authorization header
(2)

Server can send the token as part of the http-cookie
Client will send the token as part of the http-cookie
cookie / http-cookie
The browser has complete control over cookies (browser can read, delete)

The server has complete control over the http-cookie (only the server can read / delete)

Switching to http-cookie auth
(sending the cookie)

Use response.cookie()

(reading the cookie)

Install cookie-parser
Read cookie from jwt.cookies["name of cookie"]
