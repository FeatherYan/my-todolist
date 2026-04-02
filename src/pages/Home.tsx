import { Tabs } from "antd";
import Todo from "./Todo";
import FormPage from "./FormPage";

export default function Home() {
  const items = [
    {
      key: "todo",
      label: "Todo",
      children: <Todo />
    },
    {
      key: "form",
      label: "Form",
      children: <FormPage />
    }
  ];

  return (
    <div className="home-page">
      <div className="home-page-header">
        <p className="todo-eyebrow">Frontend Practice Workspace</p>
        <h1>Project Playground</h1>
        <p className="todo-page-copy">
          Explore the Todo module and form demo with one consistent interface.
        </p>
      </div>
      <div className="home-tabs-shell">
        <Tabs className="home-tabs" defaultActiveKey="todo" items={items} />
      </div>
    </div>
  );
}
