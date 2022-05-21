## My React Notes

### Startup entegration Client - Api
1. Add react router but in v6 some of features deprecated so use 
```
yarn add react-router-dom@5.2.0
```
2. Make Router configirations on App.js
3. Create .env file for reach assets folder everywhere
``` REACT_APP_ ``` is required for react applications, it's look like
```
REACT_APP_PUBLİC_FOLDER = http://localhost:3000/assets/
```
4. Update this path for which component uses 
5. For connect backend api add to package.json file
```
"proxy": "http://localhost:8080/api"
``` 
6. For fetching data from backend use axios library and add to package.json file
```
    yarn add axios
```
7. After that which component I want to fetch data in there use useState and useEffect
 
### Context for login 
1. Create context file with 3 files (AuthActions, AuthContext, AuthReducer)
    1. Auth Actions
        - 
    2. Auth Reducer
    3. Auth Actions
2. On index.js wrap the app component with AuthContextProvider
3. Create on src folder apiCalls.js 
4. On login.jsx useContext and finish login 