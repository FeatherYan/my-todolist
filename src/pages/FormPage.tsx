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
      message.error(error instanceof Error ? error.message : "提交失败");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div>
      <h1>用户信息表单</h1>

      <Form 
        form={form}
        layout="vertical" 
        onFinish={handleFinish}
        initialValues={{
          gender:"female",
          age: 18,
          education: "bachelor",
          skills: ["react"]
        }}
        >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            { min: 3, message: "至少3个字符" }
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "邮箱格式不正确" },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        
        <Form.Item
          label="手机号码"
          name="phone"
          rules={[
            {required: true, message: "请输入手机号"},
            {pattern: /^1\d{10}$/, message: "手机号格式不正确"}
          ]}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: "请选择性别" }]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
            <Radio value="other">其他</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[{ required: true, message: "请输入年龄" }]}
        >
          <InputNumber min={0} max={120} style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item
          label="最高学历"
          name="education"
          rules={[{ required: true, message: "请选择最高学历" }]}
        >
          <Select
            placeholder="请选择学历"
            options={[
              { value: "highschool", label: "高中" },
              { value: "college", label: "大专" },
              { value: "bachelor", label: "本科" },
              { value: "master", label: "硕士" },
              { value: "phd", label: "博士" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="技能"
          name="skills"
          rules={[{ required: true, message: "请选择至少一项技能" }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择技能"
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "typescript", label: "TypeScript" },
              { value: "nodejs", label: "Node.js" },
              { value: "python", label: "Python" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="预计工作日期"
          name="workDate"
          rules={[{ required: true, message: "请选择预计工作日期" }]}
        >
          <DatePicker.RangePicker style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item
          label="个人简介"
          name="intro"
          rules={[
            { required: true, message: "请输入个人简介" },
            { min: 10, message: "个人简介至少需要10个字符" },
            { max: 200, message: "个人简介最多可以输入200个字符" }
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="请输入个人简介"
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
                value ? Promise.resolve() : Promise.reject(new Error("请阅读并同意协议")),
            },
          ]}
        >
          <Checkbox>我已阅读并同意用户协议</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
);
}