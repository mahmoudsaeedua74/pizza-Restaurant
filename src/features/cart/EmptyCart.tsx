import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className='py-3 px-3 mt-20'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <p className='font-semibold m-5'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
