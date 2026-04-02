import { Tabs } from "antd";
import Todo from "./Todo";
import FormPage from "./FormPage";

export default function Home() {
  const items = [
    {
      key: "todo",
      label: "Todo",
      children: <Todo />,
    },
    {
      key: "form",
      label: "Form",
      children: <FormPage />,
    },
  ];

  return (
    <div>
      <h1>前端项目学习面板</h1>
      <Tabs defaultActiveKey="todo" items={items} />
    </div>
  );
}