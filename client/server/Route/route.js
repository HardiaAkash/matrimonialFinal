const express = require("express")
const router = express.Router()
const multer = require('multer');
const { authorizeRoles, isAuthJWT } = require("../Utils/jwt");
const { addAdmin, adminLogin, adminLogout } = require("../Controller/AdminAuth");
const { addUser, userLogin, deleteUser, updateUser, logoutUser, getUserByID, viewUser, forgotPwd, resetPassword, changeUserPwd, verifyUser, deleteUserReq, getDeleteUserRequests } = require("../Controller/UserAuth");
const { addForm, editFormById, changeStatusForm, uploadImage, viewForm, deleteFormById, getFormByUserID, changeMatchStatus, approvedForm } = require("../Controller/UserFormAuth");
const { addCounVideo, getAllCounsVideo } = require("../Controller/VideoAuth");
const { addUserOTP } = require("../Controller/OtpAuth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addAdmin").post(addAdmin)
router.route("/adminlogin").post(adminLogin)
router.route("/logoutAdmin").get(isAuthJWT, authorizeRoles("Admin"),adminLogout)

///////////////user/////////////
router.route("/adduser").post(addUser)
router.route("/generateOTP").post(addUserOTP)
router.route("/userlogin").post(userLogin)
router.route("/deleteUser/:id").delete(isAuthJWT,authorizeRoles("Admin"),deleteUser)
router.route("/updateUser").put(isAuthJWT,updateUser)
router.route("/logoutUser").get(isAuthJWT, logoutUser)
router.route("/getuser/:id").get(isAuthJWT,getUserByID)
router.route("/viewUser").get(isAuthJWT,authorizeRoles("Admin"),viewUser)
router.route("/forgotpassword").post(forgotPwd)
router.route("/resetpassword").post(resetPassword)
router.route("/changeUserPassword").post(isAuthJWT,changeUserPwd)
router.route("/verifyTokenUser/:token").get(verifyUser)
router.route("/deleteUserReq").post(isAuthJWT, deleteUserReq)
router.route("/getDeleteReq").get(isAuthJWT, authorizeRoles("Admin"),getDeleteUserRequests)

////////////////////////////form/////////
router.route("/uploadImage").post(isAuthJWT, upload.single('file'),uploadImage)
router.route("/addForm").post(isAuthJWT, addForm)
router.route("/deleteForm/:id").delete(isAuthJWT, authorizeRoles("Admin"),deleteFormById)
router.route("/editForm/:id").put(isAuthJWT, editFormById)
router.route("/changeStatus/:id").put(isAuthJWT, authorizeRoles("Admin"),changeStatusForm)
router.route("/viewForm").get(isAuthJWT,authorizeRoles("Admin"),viewForm)
router.route("/getFormByUser").post(isAuthJWT,getFormByUserID)
router.route("/counselVideo").post(isAuthJWT,authorizeRoles("Admin"),addCounVideo)
router.route("/getCounselVideo").get(isAuthJWT, getAllCounsVideo)
router.route("/isMatched/:id").post(isAuthJWT, authorizeRoles("Admin"),changeMatchStatus)
router.route("/approvedForm").get(isAuthJWT, authorizeRoles("Admin"), approvedForm)
module.exports = router;