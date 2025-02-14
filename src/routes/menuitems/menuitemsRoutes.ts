import express, {Router} from "express"
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
import{
    createItem,
    listItems,
    getItemById,
    updateItem,
    deleteItem,
    changeItemStatus
}from "../../controllers/Item/itemsController";
import { apiConfig } from "../../config/endpoint ";
import upload from "../../lib/helpers/uploadMiddleware";

const router = express.Router();

router.get(`${apiConfig.menu.listItems}`,listItems);
router.get(`${apiConfig.menu.getItemById}`,getItemById)
router.post(`${apiConfig.menu.createItem}`,
    upload.fields([
    {name : "item_image",maxCount:1}
    ]),
    createItem
);
// router.put(`${apiConfig.menu.updateItem}`,updateItem);
router.put("/allmenuitems/:id", upload.fields([
    {name : "item_image",maxCount:1}
    ]),updateItem);
router.delete(`${apiConfig.menu.deleteItem}`,deleteItem);
router.patch(`${apiConfig.menu.changeItemStatus}`,changeItemStatus)

export default router;