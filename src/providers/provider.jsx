import CartProvider from "./cart/cart.container";
import UserProvider from "./user/user.provider";


const Provider = ({children}) => (
    <CartProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </CartProvider>
);

export default Provider;