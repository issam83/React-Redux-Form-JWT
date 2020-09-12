var express = require("express");
var router = express.Router();
const AuthentificationController = require("../controllers/authentification");

// router.get("/", auth, AuthentificationController.auth);
// router.post("/register", AuthentificationController.register);
router.post("/signin", AuthentificationController.signIn);

// require("../services/passport");
// const passport = require("passport");

// const requireToken = passport.authenticate("jwt", { session: false });
// const requireValidCredentials = passport.authenticate("local", {
//   session: false
// });

// router.post("/signup", AuthentificationController.signup);
// router.get("/specialRessources", requireToken, function(req, res) {
//   res.send({ data: "Ceci est du contenu securisé " });
// });
// router.post(
//   "/signin",
//   requireValidCredentials,
//   AuthentificationController.signin
// );

module.exports = router;
