const express = require("express")
const router = express.Router()
const multer = require('multer');
const { authorizeRoles, isAuthJWT } = require("../Utils/jwt");
const { addAdmin, adminLogin } = require("../Controller/AdminAuth");
const { addUser, userLogin, deleteUser, updateUser, logoutUser, getUserByID, viewUser, forgotPwd, resetPassword, changeUserPwd, verifyUser } = require("../Controller/UserAuth");
const { addForm, editFormById, changeStatusForm, uploadImage, viewForm, deleteFormById, getFormByUserID } = require("../Controller/UserFormAuth");
const { addCounVideo, getAllCounsVideo } = require("../Controller/VideoAuth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addAdmin").post(addAdmin)
router.route("/adminlogin").post(adminLogin)
///////////////user/////////////
router.route("/adduser").post(addUser)
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


module.exports = router;