import { ShortEmployee } from "../types/MasuraoTypes";

export const useEmployee = async (userToken: string) => {
    return await fetch(process.env.EXPO_PUBLIC_API_URL + "/employees/me", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Group-Authorization":
                process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION || "",
            Authorization: "Bearer " + userToken,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error);
            return null;
        });
};

export const useEmployees = async (userToken: string) => {
    return await fetch(process.env.EXPO_PUBLIC_API_URL + "/employees", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Group-Authorization":
                process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION || "",
            Authorization: "Bearer " + userToken,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
};

export const useRandomEmployees = async (
    userToken: string,
    randomNumber: number
) => {
    return await fetch(process.env.EXPO_PUBLIC_API_URL + "/employees", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Group-Authorization":
                process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION || "",
            Authorization: "Bearer " + userToken,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const randomEmployees: ShortEmployee[] = [];
            if (data.detail) return [];
            for (let i = 0; i < randomNumber; i++) {
                const randomEmployee =
                    data[Math.floor(Math.random() * data.length)];
                randomEmployees.push(randomEmployee);
            }
            return randomEmployees;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
};

export const useEmployeeImage = async (userToken: string, id: number) => {
    return await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/employees/" + id + "/image",
        {
            method: "GET",
            headers: {
                Accept: "image/png",
                "X-Group-Authorization":
                    process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION || "",
                Authorization: "Bearer " + userToken,
            },
        }
    )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
};

export const useEmployeeID = async (userToken: string, id: number) => {
    return await fetch(process.env.EXPO_PUBLIC_API_URL + "/employees/" + id, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Group-Authorization":
                process.env.EXPO_PUBLIC_API_GROUP_AUTHORIZATION || "",
            Authorization: "Bearer " + userToken,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
};
