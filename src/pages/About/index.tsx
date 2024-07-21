import { RegularText, TitleText } from "../../components/Typography"
import { AboutContainer, AboutText } from "./styles"
import aboutImg from "../../assets/about-img.jpg"

const AboutPage = () => {
  return (
    <AboutContainer className="container" id="about">
        <AboutText>
            <TitleText size="l" color="subtitle">
                Sobre Nós
            </TitleText>
            <RegularText size="l" color="subtitle">Aqui, a tradição encontra a inovação, e nossos mestres pizzaiolos combinam técnicas 
            clássicas com ingredientes contemporâneos para encontrarem a melhor combinação de sabores. </RegularText>
            <RegularText size="l" color="subtitle">Desde a massa, feita em fermentação natural e  delicadamente amassada à mão, até o molho de tomate preparado 
                com tomates suculentos, cada detalhe é cuidadosamente planejado para levar até você o sabor autêntico e irresistível da pizza artesanal.
            </RegularText>
            
        </AboutText>
        <img 
        src={aboutImg} 
        alt="Foto de um pizzaiolo colocando uma pizza no forno. O pizzaiolo veste um avental branco e uma camiseta preta. 
        Ele segura uma pá com uma pizza fresca, pronta para assar." />
    </AboutContainer>
  )
}

export default AboutPage