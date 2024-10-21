import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";



function HomeAdmin (){
    const navigate = useNavigate();
    const handleCadastroProfessor = () => {
        navigate('/Components/Users/Admin/CadastroProfessor');
      };
    return(
        <>
        <Top1/>
       <button onClick={handleCadastroProfessor}>Cadastrar Professor</button>
        </>
    )
}
export default HomeAdmin;