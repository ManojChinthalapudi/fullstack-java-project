import express from 'express';
import { createResidency, getAllResedencies, getResidency } from '../controllers/resdCntrl.js';
import { createAdminResidency, getAdminResidency, getAllAdminResedencies } from '../controllers/adminResdCntrl.js';
import { createAcceptResidency, getAllAcceptResedencies, getAcceptResidency } from '../controllers/acceptResdCntrl.js';
import { createRejectResidency,getAllRejectResedencies,getRejectResidency } from '../controllers/rejectResdCntrl.js';
const router = express.Router();
router.post("/create", createResidency);
router.post("/adminCreate", createAdminResidency);

router.get("/allresd", getAllResedencies);

router.get("/allAdminresd", getAllAdminResedencies);
router.post("/acceptCreate", createAcceptResidency);
router.get("/allAcceptresd", getAllAcceptResedencies);
router.get("/acceptResidency/:id", getAcceptResidency);
router.post("/rejectCreate", createRejectResidency);
router.get("/allRejectresd", getAllRejectResedencies);
router.get("/rejectResidency/:id", getRejectResidency);
router.get("/:id",getResidency);
router.get("/adminResidency/:id",getAdminResidency);
export {router as residencyRoute}