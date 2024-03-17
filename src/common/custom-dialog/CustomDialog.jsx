import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useState} from "react";

const CustomDialog = ({handleConfirm, handleCancel}) => {

    const [open, setOpen] = useState(true);

    const handleCancelOnClick = () => {

        if (typeof handleCancel == 'function') {
            handleCancel(setOpen);
        } else {
            setOpen(false);
        }
    };

    const handleConfirmOnClick = () => {

        if (typeof handleConfirm === 'function') {
            handleConfirm(setOpen);
        } else {
            setOpen(false);
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCancelOnClick}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Confirm Deletion of Product!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmOnClick} variant="contained" sx={{
                        backgroundColor: "#3f51b5", "&:hover": {
                            backgroundColor: "#3f51b5"
                        }
                    }}>Ok</Button>
                    <Button onClick={handleCancelOnClick} variant={"outlined"} sx={{
                        color: "#3f51b5", borderColor: "#3f51b5", "&:hover": {
                            backgroundColor: "white"
                        }
                    }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CustomDialog;