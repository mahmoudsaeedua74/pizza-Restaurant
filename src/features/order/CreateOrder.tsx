import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { clearItem, getCarts, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helper";
import { createOrder } from "../../services/apiRestaurant";
import { AppDispatch, RootState, store } from "../../store";
import { fetchAddress } from "../user/useSlice";

// Define types for OrderFormData and FormErrors
interface MenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderFormData {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: MenuItem[]; // Cart must be an array of MenuItems
}

interface FormErrors {
  phone?: string;
}

// Validate the phone number format using a regular expression
const isValidPhone = (str: string): boolean =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const isSubmitting = navigation.state === "submitting";

  // Redux state
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.userSlice);

  const isLoadingAddress = addressStatus === "loading";
  const formErrors = useActionData() as FormErrors | null;
  const cartOrder = useSelector(getCarts);
  const cart = cartOrder; // Ensure this is a MenuItem[] array
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  function handleButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6 mt-20 container mx-auto">
      <h2 className="mb-8 text-xl font-semibold text-[#cc333f]">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {position && !position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={handleButton}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-[#cc333f] focus:outline-none focus:ring focus:ring-[#cc333f] focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order...."
              : `Order for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Correctly typing the action function
export async function action({
  request,
}: {
  request: Request;
}): Promise<Response | FormErrors> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<
    string,
    FormDataEntryValue
  >;

  // Now, we map the fields to fit the OrderFormData structure
  const order: any = {
    customer: data.customers as string,
    phone: data.phone as string,
    address: data.address as string,
    priority: data.priority === "true", // Converts priority from string to boolean
    cart: JSON.parse(data.cart as string), // Ensure cart is parsed into a MenuItem[]
  };

  const errors: FormErrors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  // Create new order if everything is okay
  const newOrder = await createOrder(order);
  // Clear the cart after order placement
  store.dispatch(clearItem());

  // Redirect to the order confirmation page
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
