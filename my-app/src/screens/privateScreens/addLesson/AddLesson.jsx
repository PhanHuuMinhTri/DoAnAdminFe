import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Select,
  Spin,
  Upload,
  message,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { domainAPI } from "../../../configs/dev";
import { uploadVideoLesson } from "../../../configs/firebase/firebase";
import TitleComponent from "../../../components/title/Title";
import { UploadOutlined } from "@ant-design/icons";
import { TYPE_LESSON } from "../../../constants/common";
import { RowStyled } from "./styled";

const { Text } = Typography;

const AddLesson = () => {
  const { id, type } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [listLesson, setListLesson] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const [initValue, setInitValue] = useState({});

  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [form, initValue]);

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const videoUrl = await uploadVideoLesson(file);
      setLoading(false);

      return videoUrl;
    } catch (error) {
      console.error("Lỗi tải lên:", error);
      setLoading(false);
      message.error("error when update!");
    }
  };

  const getListLesson = async () => {
    const res = await axios.get(`${domainAPI}/lesson/course/${id}`);
    setListLesson(res.data);
  };

  const getLessonInfo = async () => {
    const res = await axios.get(`${domainAPI}/lesson/${type}`);
    setInitValue({ type: res.data.type });
    setDataEdit(res.data);
  };

  useEffect(() => {
    getListLesson();

    if (type) {
      getLessonInfo();
    }
  }, []);

  const onFinish = async (value) => {
    try {
      let url;
      if (value?.videoUrl) {
        url = await handleUpload(value.videoUrl[0]?.originFileObj);
      } else {
        url = dataEdit.videoUrl;
      }

      const data = {
        ...value,
        videoUrl: url,
        idCourse: id,
        indexLesson: listLesson.length + 1,
      };

      if (type) {
        const dataEditLesson = {
          ...data,
          idLesson: type,
          indexLesson: dataEdit.indexLesson,
        };
        await axios.post(`${domainAPI}/lesson/edit`, dataEditLesson);
        message.success("Edit lesson success");
      } else {
        await axios.post(`${domainAPI}/lesson/add`, data);
        message.success("Add lesson success");
      }

      setLoading(false);
      navigate(`/course/${id}/lesson`);
    } catch (error) {
      message.error("Add lesson fail");
      setLoading(false);
    }
  };

  const options = [
    { label: "Grammar", value: TYPE_LESSON.GRAMMAR },
    { label: "Kanji", value: TYPE_LESSON.KANJI },
    { label: "Vocabulary", value: TYPE_LESSON.VOCABULARY },
  ];

  return (
    <RowStyled>
      <TitleComponent text={type ? "Edit Lesson" : "Add Lesson"} />
      <Col span={24}>
        <Spin spinning={loading}>
          <Form
            layout="vertical"
            name="control-hooks"
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: "100%" }}
          >
            <Form.Item
              label="Type lesson"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại bài học",
                },
              ]}
            >
              <Select options={options} />
            </Form.Item>

            {type && (
              <Text>
                Link video: <a href={dataEdit?.videoUrl}>See video</a>
              </Text>
            )}

            <Form.Item
              name="videoUrl"
              label="Video"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }

                return e && e.fileList;
              }}
              rules={[
                {
                  required: type ? false : true,
                  message: "Vui lòng chọn video để tải lên!",
                },
              ]}
            >
              <Upload.Dragger name="files" beforeUpload={() => false}>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  {type
                    ? "Thay đổi video khác"
                    : "Nhấp hoặc kéo thả video vào đây để tải lên "}
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {type ? "Edit lesson" : "Add lesson"}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </RowStyled>
  );
};

export default AddLesson;
