import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";



function HomeAdmin (){
    const navigate = useNavigate();
    return(
        <>
        <Top1/>
        <h1>teste</h1>
        </>
    )
}
export default HomeAdmin;