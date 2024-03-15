import Card from "@mui/material/Card";
import {Grid, Step, StepLabel, Stepper} from "@mui/material";
import {useState} from "react";
import CardContent from "@mui/material/CardContent";
import Address from "./Address";
import ConfirmOrder from "./ConfirmOrder";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {changeOrderStep} from "../../common/store/actions/orderActions";

const Order = () => {

    const {activeStepNumber} = useSelector(
        state => state.order, shallowEqual
    );
    const dispatch = useDispatch();

    const steps = ["Items", "Select Address", "Confirm Order"];

    const setActiveStep = stepNumber => {
        dispatch(changeOrderStep(stepNumber));
    }

    return (
        <Grid justifyContent="center"
              alignItems="flex-start"
              container sx={{backgroundColor: "#f8f8f8"}}>
            <Grid item xs={9}>
                <Card
                    sx={{
                        marginTop: "3%",
                        boxShadow: "none",
                        backgroundColor: "#fff"
                    }}
                >
                    <CardContent>
                        <Stepper activeStep={activeStepNumber} sx={{
                            '& .MuiStepLabel-root .Mui-completed': {
                                color: "#3f51b5"
                            },
                            '& .MuiStepLabel-root .Mui-active': {
                                color: "#3f51b5"
                            }
                        }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel sx={{color: "inherit"}}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={9}>
            {activeStepNumber === 1 ?
                <Address setActiveStep={setActiveStep}/> :
                <ConfirmOrder setActiveStep={setActiveStep}/>}
            </Grid>
        </Grid>
    )
}

export default Order;