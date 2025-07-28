import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from 'cloudinary';
import Room from "../models/Room.js";

//API to create a new room for a hotel
export const createRoom = async (req, res)=>{
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if(!hotel){
            return res.json({success: false, message: "No hotel found"});
        }
        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        //wait for images upload to complete
        const images = await Promise.all(uploadImages);

        //push data to mongo db
        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        })

        res.json({success: true, message: "Room created successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//API to get all rooms
export const getRooms = async(req, res)=>{
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: 'hotel',
            populate:{
                path: 'owner',
                select: 'image'
            }
        }).sort({createdAt: -1})

        res.json({success: true, rooms})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//API to get all rooms of a specific hotel
export const getOwnerRooms = async(req, res)=>{
    try {
        const hotelData = await Hotel.findOne({owner: req.auth.userId});
        const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");

        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//API to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.json({success: true, message: "Room Availability updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}