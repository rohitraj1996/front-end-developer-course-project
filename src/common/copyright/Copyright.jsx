import {Link, Typography} from "@mui/material";

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.upgrad.com/" sx={{color: "#3f51b5"}}>
                UpGrad
            </Link>{' '}
            2021
            {'.'}
        </Typography>
    );
}

export default Copyright;