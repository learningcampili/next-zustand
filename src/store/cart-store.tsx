import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  type: string;
  discount?: number;
  isOnSale?: boolean;
  quantity: number;
  imageUrl?: string | null;
}

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  clearCart: () => void;
  getSummaryInformation: () => {
    subTotal: number;
    //tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce((subTotal, product) => {
          return product.quantity * product.price + subTotal;
        }, 0);
        //const tax = subTotal * 0.21;
        const total = subTotal;
        //const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          //tax,
          total,
          itemsInCart,
        };
      },

      addProductTocart: (product: CartProduct) => {
        const { cart } = get();

        if (product.isOnSale && product.discount) {
          product.price = product.price * (1 - product.discount / 100);
        }

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some((item) => item.id === product.id);

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "cart-store",
    }
  )
);
