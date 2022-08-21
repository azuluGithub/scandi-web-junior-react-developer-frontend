export const convertCurrency = (prices, currentLabel='USD') => {
    let resAmount = 0;

    for (let price of prices) {
        const { amount, currency : { label } } = price;
        if (label === currentLabel) {
            resAmount = amount;
        }
    } 

    return resAmount;
}