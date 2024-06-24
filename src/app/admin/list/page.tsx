'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal } from "antd";
import Link from "next/link";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { confirm } = Modal;

interface Product {
  id: number;
  name: string;
  url: string;
  // Jika ada properti lain, tambahkan di sini
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:5000/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const showDeleteConfirm = (productId: number) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProduct(productId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Row gutter={16}>
        {products.map((product) => (
          <Col span={8} key={product.id}>
            <Card
              title={product.name} // TypeScript sekarang mengetahui 'name' ada di 'product'
              cover={
                <Image
                  alt={product.name}
                  src={product.url}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              actions={[
                <Link key="edit" href={`/edit/${product.id}`} passHref>
                  <Button type="link" icon={<EditOutlined />} />
                </Link>,
                // eslint-disable-next-line react/jsx-key
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => showDeleteConfirm(product.id)}
                />,
              ]}
            >
              <Card.Meta description={`ID: ${product.id}`} />
            </Card>
          </Col>
        ))}
      </Row>
      <Link href="/admin/add" passHref>
        <Button type="primary" style={{ marginTop: 20 }}>
          Add New Product
        </Button>
      </Link>
    </div>
  );
};

export default ProductList;
