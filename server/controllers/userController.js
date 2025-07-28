


export const getUserData = async (req, res)=>{
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success: true, role, recentSearchedCities})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const storeRecentSearchedCities = async (req, res)=>{
    try {
        const {recentSearchedCity} = req.body;
        const user = await req.user;

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity);
        }

        res.json({success: true, message: "City Added"})
    } catch (error) {
        res.json({success: false, message: error.message})
        console.error(message.error);
    }
}