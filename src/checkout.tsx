import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const products = [
    {
        "id": 0,
        "name": "Wireless Earbuds",
        "price": 10
    },
    {
        "id": 1,
        "name": "Gaming Mouse",
        "price": 22
    },
    {
        "id": 2,
        "name": "Action Camera",
        "price": 55
    }
]

export default function CheckboxList() {
    const [checked, setChecked] = React.useState([0]);
    const [priceSum, setPriceSum] = React.useState(0)
    const [isValid, setIsValid] = React.useState(false)
    const [number, setNumber] = React.useState("")
    const [cvv, setCVV] = React.useState("")
    const [date, setDate] = React.useState("")

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const isValidPayment = () => {
        const now = new Date()
        const twoDaysLater = new Date(now)
        twoDaysLater.setDate(now.getDate() + 2)
        const threeYearsLater = new Date(twoDaysLater)
        threeYearsLater.setFullYear(twoDaysLater.getFullYear() + 3);

        const isValidDate = formatDate(new Date(date)) === formatDate(threeYearsLater)
        const isValidNumber = number.length === 10
        const isValidCvv = cvv.length === 3

        if (isValidDate && isValidNumber && isValidCvv) {
            alert('Success')
        }
    }

    const canFinish = () => {

        if (number !== "" && cvv !== "" && date !== "" && checked.length > 0) {
            setIsValid(true)
            return
        }
        setIsValid(false)
    }

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked)

        const selectedProducts = products.filter(product => newChecked.includes(product.id))
        const currentPrice = selectedProducts.reduce((accum, item) => accum + item.price, 0)
        setPriceSum(currentPrice)
    }

    React.useEffect(() => {
        canFinish()
    }, [priceSum, number, cvv, date])

    return (
        <Paper elevation={3} sx={{ width: "600px" }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {products.map(({ id, name, price }) => {
                    const labelId = `checkbox-list-label-${id}`;

                    return (
                        <ListItem
                            key={id}
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(id)} >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText sx={{ color: 'black' }} id={labelId} primary={name} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <ListItemText sx={{ color: 'black' }} id={labelId} primary={USDollar.format(price)} />
                                </div>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
            <Typography variant="h5" component="h6" sx={{ paddingTop: '10px' }}>
                Payment
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <TextField id="outlined-cardNumber" label="Card number" variant="outlined" sx={{ margin: "2px" }} value={number} onChange={(val) => setNumber(val.target.value)} />
                <TextField id="outlined-cvv" label="cvv" variant="outlined" sx={{ margin: "2px" }} value={cvv} onChange={(val) => setCVV(val.target.value)} />
                <TextField id="outlined-date" type="date" sx={{ margin: "2px" }} value={date} onChange={(val) => setDate(val.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <Typography variant="h5" component="h6">
                    Total: {USDollar.format(priceSum)}
                </Typography>
                <Button variant="contained" disabled={!isValid} onClick={() => isValidPayment()}>Finish</Button>
            </Box>
        </Paper >
    );
}