import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  message
} from "antd";
import { submitUserForm, type UserFormData } from "../services/fakeUserApi";
import { useState } from "react";

export default function FormPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: UserFormData) => {
    try {
      setLoading(true);
      const res = await submitUserForm(values);
      message.success(res.message);
      form.resetFields();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <p className="todo-eyebrow">Information Collection</p>
        <h1>User Form</h1>
        <p className="todo-page-copy">
          A lightweight form demo styled to match the Todo workspace.
        </p>
      </div>

      <div className="form-shell">
        <Form
          className="project-form"
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            gender: "female",
            age: 18,
            education: "bachelor",
            skills: ["react"]
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter a username" },
              { min: 3, message: "At least 3 characters" }
            ]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter an email address" },
              { type: "email", message: "Invalid email format" }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter a phone number" },
              { pattern: /^1\d{10}$/, message: "Phone number format is invalid" }
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please choose a gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter age" }]}
          >
            <InputNumber min={0} max={120} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Education"
            name="education"
            rules={[{ required: true, message: "Please choose education" }]}
          >
            <Select
              placeholder="Select education"
              options={[
                { value: "highschool", label: "High School" },
                { value: "college", label: "College" },
                { value: "bachelor", label: "Bachelor" },
                { value: "master", label: "Master" },
                { value: "phd", label: "PhD" }
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Skills"
            name="skills"
            rules={[{ required: true, message: "Please choose at least one skill" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select skills"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "typescript", label: "TypeScript" },
                { value: "nodejs", label: "Node.js" },
                { value: "python", label: "Python" }
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Available Dates"
            name="workDate"
            rules={[{ required: true, message: "Please choose a date range" }]}
          >
            <DatePicker.RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Introduction"
            name="intro"
            rules={[
              { required: true, message: "Please enter a short introduction" },
              { min: 10, message: "At least 10 characters" },
              { max: 200, message: "Up to 200 characters" }
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Tell us a little about yourself"
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept the agreement"))
              }
            ]}
          >
            <Checkbox>I have read and agree to the user agreement</Checkbox>
          </Form.Item>

          <Form.Item className="project-form-actions">
            <Button className="project-form-submit" type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button className="project-form-reset" htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
