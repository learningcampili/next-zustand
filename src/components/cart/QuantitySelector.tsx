import React from "react";
import Button from "../button/Button";

interface Props {
  quantity: number;

  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex items-center h-10 border-1 border-gray-300  rounded-md">
      <Button
        variant="transparent"
        size="md"
        onClick={() => onValueChanged(-1)}
        className="text-2xl"
        title="disminuir"
      >
        -
      </Button>
      <span className="px-4">{quantity}</span>
      <Button
        variant="transparent"
        size="md"
        onClick={() => onValueChanged(+1)}
        className="text-2xl"
      >
        +
      </Button>
    </div>
  );
};
