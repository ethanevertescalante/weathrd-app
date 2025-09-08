type WeatherAPI =
    | { success: true; response: string }
    | { success: false; error: string };

const sanitizeInput = (input: string): WeatherAPI => {
    if (!input) {
        return { success: false, error: "Please enter a valid input!" };
    }

    return { success: true, response: input };
};

const submitLocation = (location: string): WeatherAPI => {
    return sanitizeInput(location);
};

export default submitLocation;