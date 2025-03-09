export const isStrongPassword = (value) => {
    if(value.length < 3 || value.length > 30){
        return {isValid:false, errorMessage:"password either too short of too long"}
    }
    return {isValid:true, errorMessage:''}
}