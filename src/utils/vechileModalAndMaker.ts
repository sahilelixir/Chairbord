import { client } from "../client/Axios"

const getVehicleMakerList = async (sessionId: string) => {
    try {
        const response = await client.post('/bajaj/vehicleMakerList', {
            sessionId: sessionId
        })
        return response.data
    } catch (error) {
        console.log(error, 'error')
    }
}

const getVehicleModelList = async (sessionId: string, vehicleMake: string) => {
    console.log('vehicleMake', vehicleMake)
    try {
        const response = await client.post('/bajaj/vehicleModelList', {
            sessionId: sessionId,
            vehicleMake: vehicleMake
        })
        return response.data
    } catch (error) {
        console.log(error, 'error')
    }
}

export { getVehicleMakerList, getVehicleModelList }