"use client";

import React, { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useRouter();

  const loadImage = ({ file }: any) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const saveProduct = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("title", title);
    try {
      await axios.post("https://warung-nasi.vercel.app/api/product", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate.push("/admin/list");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
          <h1>Add Product</h1>
          <Form layout="vertical" onFinish={saveProduct}>
            <Form.Item
              label="Product Name"
              rules={[
                { required: true, message: "Please input the product name!" },
              ]}
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={loadImage}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            {preview && (
              <Form.Item label="Preview">
                <Image
                  width={400}
                  height={400}
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
