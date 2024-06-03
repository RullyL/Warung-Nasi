'use client'

import { Button, Card, Modal } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Item {
  title: string;
  harga: number;
  image: string;
  quantity?: number;
  totalHarga?: number;
}

const data: Item[] = [
  {
    title: "Ayam Serundeng",
    harga: 10000,
    image: "/img/ayam_serundeng.jpg",
  },
  {
    title: "Ayam Balado",
    harga: 12000,
    image: "/img/ayam_balado.jpg",
  },
  {
    title: "Ikan Mujair",
    harga: 15000,
    image: "/img/ikan_mujair.webp",
  },
  {
    title: "Babat",
    harga: 20000,
    image: "/img/babat.jpg",
  },
  {
    title: "Nasi Putih",
    harga: 5000,
    image: "/img/nasi_putih.jpg",
  },
  {
    title: "Sambal",
    harga: 2000,
    image: "/img/sambel.jpe",
  },
];

export default function Menu() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Item[]>([]);

  useEffect(() => {
    const newTotalCost = selectedItems.reduce(
      (sum, item) => sum + (item.totalHarga || 0),
      0
    );
    setTotalCost(newTotalCost);
  }, [selectedItems]);

  const addItem = (item: Item) => {
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

  const incrementItem = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity! += 1;
    updatedItems[index].totalHarga! += updatedItems[index].harga;
    setSelectedItems(updatedItems);
  };

  const decrementItem = (index: number) => {
    const updatedItems = [...selectedItems];
    if (updatedItems[index].quantity! > 1) {
      updatedItems[index].quantity! -= 1;
      updatedItems[index].totalHarga! -= updatedItems[index].harga;
    } else {
      updatedItems.splice(index, 1);
    }
    setSelectedItems(updatedItems);
  };

  const handlePayClick = () => {
    setIsModalVisible(true);
    setModalData(selectedItems);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleWhatsAppPayment = () => {
    const orderText = selectedItems
      .map(
        (item) => `${item.quantity}x ${item.title} (Rp.${item.totalHarga})`
      )
      .join("\n");
    const totalHarga = totalCost;
    const message = `Halo, saya ingin memesan dengan detail:\n${orderText}\n\nTotal Harga: Rp.${totalHarga}\nTerima kasih!`;
    const phone = "628986081372"; // Ganti dengan nomor WhatsApp tujuan
    const whatsappURI = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURI, "_blank");
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
            <Button onClick={handlePayClick}>Bayar</Button>
            <Button onClick={handleWhatsAppPayment}>Bayar via WhatsApp</Button>
            <p>Total: Rp.{totalCost}</p>
          </div>
          {selectedItems.map((item, index) => (
            <div
              className="w-[94%] bg-red-300 my-2 flex justify-between flex-row px-10 rounded-lg p-2"
              key={index}
            >
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
      <Modal
        title="Detail Pesanan"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Tutup
          </Button>,
        ]}
      >
        {modalData.map((item, index) => (
          <div key={index}>
            <p>{item.title}</p>
            <p>Jumlah: {item.quantity}</p>
            <p>Total Harga: Rp.{item.totalHarga}</p>
          </div>
        ))}
      </Modal>
    </div>
  );
}
