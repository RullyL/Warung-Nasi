"use client";

import Buttons from "@/app/Components/Button/Button";
// 
import { Button, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const pemakaian = [
    { value: "1. Klik Lihat Menu" },
    { value: "2. Pilih Menu Yang Mau Dibeli" },
    {
      value:
        "3. Cek Kembali Menu Yang sudah Di pesan di     bagian  “Menu Yang Anda Pilih”",
    },
    { value: "4. Jika Sudah Benar Klik Tombol Bayar" },
    {
      value:
        "5. Lalu Muncul Popup Menu Anda Dan Anda Tinggal Klik Tombol Beli-nya",
    },
    {
      value:
        "6. Lalu Anda Masuk ke dalam WA Dan Anda hanya Perlu Mengirim Pesannnya",
    },
    { value: "7. Selesai Pesanan Anda Akan Disiapkan" },
  ];

  return (
    <div>
      <div className="px-16 flex flex-col justify-center items-center h-[30vh]">
        <h1 className="text-[20px] text-center">
          Selamat Datang Di warung Nasi Mamah Lulu
        </h1>
        <Image src="/logo.png" width={246} height={100} alt="" />
      </div>
      <div className=" flex flex-col justify-center items-center h-[51vh]">
        <Link href='/menu'>
        <Buttons onClick={() => {}} button="Lihat Menu" />
        </Link>
        <Buttons onClick={showModal} button="Cara Pemakaian" />
      </div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Tutup
          </Button>,
        ]}
      >
        <div className="flex justify-center items-center">
          <Image src="/logo.png" width={150} height={50} alt="" />
        </div>
        <p className="text-[20px] my-4">Cara memesan disini...</p>
        {pemakaian.map((item, index) => (
          <h5 className="my-1" key={index}>{`${item.value}`}</h5>
        ))}
      </Modal>
    </div>
  );
}
