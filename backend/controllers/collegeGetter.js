const College = require("../models/colleges");

exports.getColleges = async (req,res) =>{
    try{
        const allColleges = await College.find();

        if(!allColleges || allColleges.length === 0){
            return res.status(404).json({
                message: "no colleges found",
                success: false
            });
        }
        
        const collegeNames = allColleges.map(college => college.collegeName);
        console.log(collegeNames);
        // If colleges exist, return them
        return res.status(200).json({
            message: "colleges fetched successfully",
            success: true,
            data: collegeNames
        });
    }catch(error){
        console.error("Error fetching colleges: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
}