import express from 'express';
import { allFav, bookVisit, cancelBooking, createUser, getAllBookings, toFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';
const router = express.Router();
router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/cancelBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav/", allFav);
export { router as userRoute }
