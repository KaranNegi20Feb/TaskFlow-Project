const express=require('express');
const router=express.Router();
const generaltaskRoute=require("./task");
const backlogtaskRoute=require("./task2");
const inprogresstaskRoute=require("./task3");
const pausedRoute=require("./task4");
const readyRoute=require("./task5");

const users=require("./user")
router.use("/generaltasks",generaltaskRoute);
router.use("/backlogtasks",backlogtaskRoute);
router.use("/inprogresstasks",inprogresstaskRoute);
router.use("/pausedtasks",pausedRoute);
router.use("/readytasks",readyRoute);

router.use("/users",users);
module.exports=router;