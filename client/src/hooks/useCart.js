export const calculateTotalPrice = (cartItems) => {
    console.log(cartItems);
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}