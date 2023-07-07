import React, { useEffect, useState } from "react";
import { Col } from "antd";
import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Image,
  Upload,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import DefaultAvatar from "../../../assets/default-image.jpg";
import axios from "axios";
import { domainAPI } from "../../../configs/dev";
import { uploadImageTeacher } from "../../../configs/firebase/firebase";
import TitleComponent from "../../../components/title/Title";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";

import { RowStyled } from "./styled";
const AddTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [initValue, setInitValue] = useState({});

  console.log("init", initValue);

  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [form, initValue]);

  const getTeacherInfo = async () => {
    const res = await axios.get(`${domainAPI}/teacher/${id}`);
    setInitValue(res.data[0]);
    form.setFieldValue(res.data[0]);
  };

  const [fileImage, setFileImage] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const photoURL = await uploadImageTeacher(file);
      return photoURL;
    } catch (error) {
      console.error("Lỗi tải lên:", error);
      setLoading(false);
      message.error("error when update!");
    }
  };

  useEffect(() => {
    if (id) {
      getTeacherInfo();
    }
  }, [id]);

  const onFinish = async (value) => {
    try {
      const url = fileImage
        ? await handleUpload(fileImage)
        : initValue?.imageCourse;

      const data = {
        ...value,
        avatar: url,
        idTeacher: initValue?.idTeacher,
      };

      if (id) {
        await axios.post(`${domainAPI}/teacher/edit`, data);
        message.success("Edit teacher success");
      } else {
        await axios.post(`${domainAPI}/teacher/add`, data);
        message.success("Add teacher success");
      }

      navigate("/teacher");
      setLoading(false);
    } catch (error) {
      message.error("Add teacher fail");
      setLoading(false);
    }
  };

  return (
    <RowStyled>
      <TitleComponent text={id ? "Edit Teacher" : "Add Teacher"} />
      <Col span={24}>
        <Form
          layout="vertical"
          name="control-hooks"
          form={form}
          onFinish={onFinish}
          initialValues={initValue}
          style={{ maxWidth: "100%" }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="descriptionTeacher"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Avatar">
            <div className="field-avatar">
              <Spin spinning={loading}>
                <Image
                  className="avatar"
                  shape="square"
                  src={
                    id
                      ? fileImage
                        ? URL?.createObjectURL(fileImage)
                        : initValue?.avatar
                      : fileImage
                      ? URL?.createObjectURL(fileImage)
                      : DefaultAvatar
                  }
                  size={200}
                  icon={<UserOutlined />}
                />
              </Spin>

              <Upload
                listType="picture-circle"
                className="upload"
                showUploadList={false}
                onPreview={() => false}
                accept="image/png, image/jpeg"
                beforeUpload={() => false}
                onChange={({ file }) => {
                  if (file) {
                    setFileImage(file);
                  }
                }}
              >
                <CameraOutlined />
              </Upload>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {id ? "Edit Teacher" : "Add Teacher"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </RowStyled>
  );
};

export default AddTeacher;
