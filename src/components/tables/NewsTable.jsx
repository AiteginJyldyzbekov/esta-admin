import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref } from "firebase/storage";
import dayjs from "dayjs";
import { deleteObject } from "firebase/storage";

const NewsTable = ({ tid, title, date, images, desc1, desc2, price, ...props }) => {
    const onDelete = async (e) => {
        e.stopPropagation();
        const res = window?.confirm("Вы действительно хотите удалить новость " + title + '?');
        if (res) {
            await deleteDoc(doc(db, "news", tid)).then(() => {
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
        <TableCellContainer path={`/news/${tid}`}>
            <TableCell component="th" scope="row">
                {title}
            </TableCell>

            <TableCell scope="row">{desc1}</TableCell>
            <TableCell scope="row">{desc2}</TableCell>
            <TableCell scope="row">{<img width={"60px"} src={images[0]?.url ? images[0].url : ""} />}</TableCell>
            <TableCell scope="row">
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableCellContainer>
    );
};
export default NewsTable;
