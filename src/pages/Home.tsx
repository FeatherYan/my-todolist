import { useNavigate } from "react-router-dom"
export default function Home() {
    const navigate = useNavigate();
    console.log("Home rendered");
    return (
        <div>Home Page
            <button onClick={() => navigate("/todo")}>Go to Todo</button>
            <button onClick={() => navigate("/form")}>Go to Form</button>
        </div>
    )
}