"use client";

import { useCounterStore } from "@/store/counter-store";
import React from "react";
import Button from "../button/Button";

const Botonera = () => {
  // trae las fuciones de incremento, decremento y reseteo de la store
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex  gap-5">
      <Button
        onClick={increment}
        type="button"
        variant="success"
        size="full"
        className="w-full"
        title="+"
      />
      <Button
        onClick={decrement}
        type="button"
        variant="danger"
        size="full"
        className="w-full"
        title="-"
      />

      <Button
        onClick={reset}
        type="button"
        variant="primary"
        size="full"
        className="w-full"
        title="0"
      />
    </div>
  );
};

export default Botonera;
