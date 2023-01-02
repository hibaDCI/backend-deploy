## What are cookies?

​

- Saving data in browser
- Frontend technology, not available to the backend
- Has a bad reputation, because of tracking; - When you see behaviour where adverts seem to know where you've been it's likely due to 3rd party ad tracking cookies.
  ​ - So as a simplified example if you go to site A which uses an ad network, that ad network can record that you were on that site by placing a tracking cookie on your PC.
  ​ - Then when you go to Site B which uses the same ad network, the ad network reads the cookie that was set when you were on Site A (which it can do 'cause it's loading content from its domains in both cases so it doesn't break same origin) and can then offer you adverts based on your browsing habits.
  ​
  ​

## Special type of cookie, called httpOnly

​

- can use it to store our authorization credentials (jwt token)
- you can only access this from the backend! ����
- why do we use it? Security
- you can only access this from the backend
- frontend (javascript) can not read this token! because;
  - client could be compromised
  - could be a virus, malware
  - i.e., website could be hacked, extra added JS added - this JS could be programmed to read the JWT and pass it to somebody else

## What are other ways of storing data in the browser?

​

- localStorage / sessionStorage
  ​

## What changes do I need to make to this backend

​

1. Send the token as a httpOnly cookie
2. Modify my backend to read the cookie as a httpOnly cookie
   - add some cookie middleware
   - modify my passport config to read the cookie
3. We need to change frontend
