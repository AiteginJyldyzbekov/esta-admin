import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const NewsTable = ({ tid, question, ans, ...props }) => {
    const onDelete = async (e) => {
        e.stopPropagation();
        const res = window?.confirm("Вы действительно хотите удалить вопрос " + question + '?')
        if (res) {
            await deleteDoc(doc(db, "news", tid)).then(() => {
                window?.location?.reload()
            })
        }
    };
    return (
        <TableCellContainer path={`/news/${tid}`}>
        <TableCell component="th" scope="row">
            {question}
        </TableCell>

        <TableCell scope="row">{ans}</TableCell>
        <TableCell scope="row"></TableCell>
        <TableCell scope="row">
            <IconButton onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </TableCell>
    </TableCellContainer>
    );
};
export default NewsTable;
