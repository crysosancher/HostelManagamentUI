'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Custom hook to fetch user data from a specified endpoint
const useFetchUserData = (endpoint,method) => {
    const router = useRouter(); // Get the router object to programmatically navigate
    
    // State to hold user data and any potential error messages
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
         const token = localStorage.getItem("UserAccessToken") || sessionStorage.getItem("UserAccessToken");
        // If either token or ID is missing, redirect to the signin page for the respective route
        if (!token) {
            router.push(`/signin`);
            return;
        }

        // Function to fetch user data from the API
        const fetchUserData = async () => {
            try {
                // Make a POST request to the API with the token and ID in the headers and body
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
                    method: method, // Use POST method to send data to the server
                    headers: {
                        "Content-Type": "application/json", // Set the request content type to JSON
                        "authorization": token, // Include the access token in the request headers
                    },
                });

                console.log(response)

                // Handle different response statuses
                if (!response.ok) {
                    if (response.status === 401) {
                        // If the response status is 401 (Unauthorized), remove tokens from storage and redirect to signin
                        localStorage.removeItem(`UserAccessToken`);
                        sessionStorage.removeItem(`UserAccessToken`);
                        // localStorage.removeItem(`${apiPath}Id`);
                        // sessionStorage.removeItem(`${apiPath}Id`);
                        router.push(`/signin`);
                    } else {
                        // If there is any other error, parse and set the error message
                        const errorResponse = await response.json();
                        setError(errorResponse.message || "Failed to fetch user data");
                    }
                    return;
                }

                // If the response is successful, parse the response data and update the state with the user data
                const responseData = await response.json();
                setUserData(responseData);
            } catch (err) {
                // If there is an error during the fetch operation, log it and set a general error message
                console.error("Error fetching user data:", err);
                setError("An unexpected error occurred.");
            }
        };

        // Call the fetchUserData function to make the API request
        fetchUserData();
    }, [endpoint, router]); // The useEffect hook will run when any of these dependencies change

    // Return the userData and error state, so they can be used by the components that use this hook
    return { userData, error };
};

export default useFetchUserData;
