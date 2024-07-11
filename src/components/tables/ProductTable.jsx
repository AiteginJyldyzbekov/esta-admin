import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref } from "firebase/storage";
import { deleteObject } from "firebase/storage";

const ProductTable = ({ tid, title, images, desc, price, ...props }) => {
    const onDelete = async (e) => {
        e.stopPropagation();
        const res = window?.confirm("Вы действительно хотите удалить продукт " + title + '?')
        if (res) {
            await deleteDoc(doc(db, "products", tid)).then(() => {
                if (images && images.length > 0) {
                    for (const image of images) {
                        deleteObject(ref(storage, image.url))
                    }
                }
            })
            window?.location?.reload()
        }
    };
    return (
        <TableCellContainer path={`/product/${tid}`}>
            <TableCell component="th" scope="row">
                {title}
            </TableCell>

            <TableCell scope="row">{desc}</TableCell>
            <TableCell scope="row">{price}</TableCell>
            <TableCell scope="row">{<img width={"60px"} src={images[0]?.url ? images[0].url : ""} />}</TableCell>
            <TableCell scope="row">
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableCellContainer>
    );
};
export default ProductTable;
