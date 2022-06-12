export const Login_Start = (userCredentials) => ({
    type : "LOGIN_START"
})
export const Login_Success = (user) => ({
    type : "LOGIN_SUCCESS",
    payload : user
})
export const Login_Failure = (error) => ({
    type : "LOGIN_FAILURE",
    payload : error
})
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
})
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId
})