import { authClient } from "../client/Axios"

export const registerAgent = async (
    email_id: string,
    input_password: string,
    mobile_number: string,
) => {
    try {
        const response = await authClient.post('/auth/register-agent', {
            email_id,
            input_password,
            mobile_number,
        })
        return response
    } catch (error) {
        console.error(`[registerAgent] [${JSON.stringify(error)}]`)
    }
}