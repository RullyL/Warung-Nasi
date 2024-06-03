"use client";

import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    title: "Ayam Serundeng",
    harga: 10000,
    image: "/ayam.jpg",
  },
  {
    title: "Ayam Goreng",
    harga: 12000,
    image: "/ayam-goreng.jpg",
  },
  {
    title: "Nasi Goreng",
    harga: 15000,
    image: "/nasi-goreng.jpg",
  },
  {
    title: "Sate Ayam",
    harga: 20000,
    image: "/sate-ayam.jpg",
  },
  {
    title: "Sate Ayam",
    harga: 20000,
    image: "/sate-ayam.jpg",
  },
  {
    title: "Sate Ayam",
    harga: 20000,
    image: "/sate-ayam.jpg",
  },
];

export default function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const newTotalCost = selectedItems.reduce(
      (sum, item) => sum + item.totalHarga,
      0
    );
    setTotalCost(newTotalCost);
  }, [selectedItems]);

  const addItem = (item) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.title === item.title
    );
    if (existingItemIndex !== -1) {
      incrementItem(existingItemIndex);
    } else {
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, totalHarga: item.harga },
      ]);
    }
  };

  const incrementItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity += 1;
    updatedItems[index].totalHarga += updatedItems[index].harga;
    setSelectedItems(updatedItems);
  };

  const decrementItem = (index) => {
    const updatedItems = [...selectedItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      updatedItems[index].totalHarga -= updatedItems[index].harga;
    } else {
      updatedItems.splice(index, 1);
    }
    setSelectedItems(updatedItems);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <Image src={"/logo.png"} width={102} height={42} alt="Logo" />
        <p>Menu</p>
      </div>
      <br />
      <div className="flex flex-wrap gap-1 justify-center">
        {data.map((item, index) => (
          <Card
            className="w-[120px] text-[9px]"
            key={index}
            hoverable
            onClick={() => addItem(item)}
            cover={
              <Image
                className="h-[90px] w-[60px]"
                alt={item.title}
                src={item.image}
                width={50}
                height={30}
              />
            }
          >
            <p>{item.title}</p>
            <p>Rp.{item.harga}</p>
          </Card>
        ))}
      </div>
      <br />
      <div className="bg-red-100 rounded-lg my-2">
        <div className="w-full h-full flex flex-col items-center">
          <p>Menu Yang Anda Pilih</p>
          <div className="flex justify-center items-center gap-3 my-3">
            <Button>Bayar</Button>
            <p>Total: Rp.{totalCost}</p>
          </div>
          {selectedItems.map((item, index) => (
            <div className="w-[94%] bg-red-300 my-2 flex justify-between flex-row px-10 rounded-lg p-2" key={index}>
              <div>
                <p>{item.title}</p>
                <p>Rp.{item.totalHarga}</p>
              </div>
              <div className="flex justify-center gap-2 items-center">
                <Button onClick={() => incrementItem(index)}>+</Button>
                <Button onClick={() => decrementItem(index)}>-</Button>
                <div className="bg-red-200 rounded-full w-10 h-9 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
