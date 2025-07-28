import transporter from '../configs/nodemailer.js';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import stripe from 'stripe';

//Function to check room availability
const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: new Date(checkOutDate)},
            checkOutDate: {$gte: new Date(checkInDate)}
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}


//API to check room availability (POST /api/bookings/check-availability)
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {checkInDate, checkOutDate, room} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success: true, isAvailable});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//API to create a new booking (POST /api/bookings/book)
export const createBooking = async (req, res) => {
    try {
        const {room, checkInDate,checkOutDate, guests} = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        if (!isAvailable) {
            return res.json({success: false, message: "Room is not availables"});
        }

        //get total price from room details
        const roomData = await Room.findById(room).populate('hotel');
        let totalPrice = roomData.pricePerNight;

        //calculate total price based on number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        //create booking
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Booking Confirmation",
            html: `
                <h2>Here are your booking details</h2>
                <p>Dear ${req.user.username},</p>
                <p>Thank you for booking with us! Here are your booking details:</p>
                <ul>
                    <li><strong>Booking_ID: </strong> ${booking._id}</li>
                    <li><strong>Hotel Name: </strong> ${roomData.hotel.name}</li>
                    <li><strong>Date: </strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Guests: </strong> ${booking.guests}</li>
                    <li><strong>Total Price: </strong> $ ${booking.totalPrice}</li>
                </ul>
                <p>We look forward to welcoming you!</p>
                <p>If you need to cancel or modify your booking, reply to this email or mail to us via dbundi758@gmail.com.</p>
            `
        }

        await transporter.sendMail(mailOptions)

        res.json({success: true, message: "Booking created successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to create booking"});
    }
}


//API to get all bookings for a user (GET /api/bookings/user)
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate('room hotel').sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Failed to fetch bookings"});
    }
}


//function to fetch bookings data for admin dashboard
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if (!hotel){
            return res.json({success: false, message: "Hotel not found"});
        }

        const bookings = await Booking.find({hotel: hotel._id}).populate('room hotel user').sort({createdAt: -1});

        //TotalBookings
        const totalBookings = bookings.length;

        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}});
    } catch (error) {
        res.json({success: false, message: "Failed to fetch hotel bookings"});
    }
}

export const stripePayment = async (req, res) => {
    try {
        const {bookingId} = req.body;

        const booking = await Booking.findById(bookingId);
        const roomData = await Room.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;
        const {origin} = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const line_items = [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: roomData.hotel.name,
                        description: `Booking for ${roomData.name}`,
                    },
                    unit_amount: totalPrice * 100, // Convert to cents
                },
                quantity: 1,
            }
        ]

        //stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId,
            }
        })

        res.json({success: true, url: session.url});
    } catch (error) {
        res.json({success: false, message: "Payment Failed!"});
    }
}