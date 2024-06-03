import { Button } from "antd";
import { MouseEventHandler } from 'react';
import React from "react";

interface ButtonsProps {
  button: string;
  onClick:  MouseEventHandler<HTMLButtonElement>;
}

const Buttons: React.FC<ButtonsProps> = ({ button, onClick }) => {
  return (
    <div>
      <Button
      onClick={onClick}
        type="text"
        className="py-5 w-[272px] text-black bg-[#D1D8C5] flex justify-center items-center my-4 hover:bg-transparent"
      >
        {button}
      </Button>
    </div>
  );
};

export default Buttons;
