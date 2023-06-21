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
import { uploadImageCourse } from "../../../configs/firebase/firebase";
import TitleComponent from "../../../components/title/Title";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";

import { RowStyled } from "./styled";
const AddLesson = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState([]);

  const [initValue, setInitValue] = useState({});

  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [form, initValue]);

  const getCourseInfo = async () => {
    const res = await axios.get(`${domainAPI}/course/${type}`);
    setInitValue(res.data);
    form.setFieldValue(res.data);
  };

  const [fileImage, setFileImage] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const photoURL = await uploadImageCourse(file);
      return photoURL;
    } catch (error) {
      console.error("Lỗi tải lên:", error);
      setLoading(false);
      message.error("error when update!");
    }
  };

  const getListTeacher = async () => {
    const res = await axios.get(`${domainAPI}/teacher`);
    setTeacher(res.data);
  };

  const options = teacher.map((item) => ({
    label: item?.name,
    value: item?.idTeacher,
  }));

  useEffect(() => {
    getListTeacher();

    if (type) {
      getCourseInfo();
    }
  }, []);

  const onFinish = async (value) => {
    try {
      const url = fileImage
        ? await handleUpload(fileImage)
        : initValue.imageCourse;

      const data = {
        ...value,
        imageCourse: url,
        idCourse: initValue?.idCourse,
      };

      if (type) {
        await axios.post(`${domainAPI}/course/edit`, data);
        message.success("Edit course success");
      } else {
        await axios.post(`${domainAPI}/course/add`, data);
        message.success("Add course success");
      }

      navigate("/course");
      setLoading(false);
    } catch (error) {
      message.error("Add course fail");
      setLoading(false);
    }
  };

  return (
    <RowStyled>
      <TitleComponent text={"Add Course"} />
      <Col span={24}>
        <Form
          layout="vertical"
          name="control-hooks"
          form={form}
          onFinish={onFinish}
          initialValues={initValue}
          style={{ maxWidth: "100%" }}
        >
          <Form.Item
            name="nameCourse"
            label="Name course"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberLession"
            label="Numbers of lesson"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberTest"
            label="Numbers of test"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Image">
            <div className="field-avatar">
              <Spin spinning={loading}>
                <Image
                  className="avatar"
                  shape="square"
                  src={
                    type
                      ? fileImage
                        ? URL?.createObjectURL(fileImage)
                        : initValue?.imageCourse
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
          <Form.Item
            name="idTeacher"
            label="Teacher"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select teacher" allowClear options={options} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {type ? "Edit Course" : "Add Course"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </RowStyled>
  );
};

export default AddLesson;
