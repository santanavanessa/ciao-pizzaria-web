import styled from "styled-components";
import heroBackgroundImg from "../../../../src/assets/hero-gradient.svg";
import { TitleText } from "../../../../src/components/Typography";
import { rgba } from "polished";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  width: 100%;
  height: 34rem;
  background: ${({ theme }) => `url(${heroBackgroundImg}) no-repeat center,
      linear-gradient(
        0deg,
        ${theme.colors["base-white"]} 0%,
        ${rgba(theme.colors["base-background"], 0.2)} 50%,
        ${theme.colors["base-background"]} 100%
      )`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;

  > div {
    flex: 1;
  }

  img {
    flex: 1;
    border-radius: 6px;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(300px, auto);
    column-gap: 3rem;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 26rem;
      flex-direction: column-reverse;
      > img {
        max-width: 100%;
      }
    }
  }

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }

  @media (max-width: 660px) {
    margin-top: 5rem;
  }
`;

export const HeroTitle = styled(TitleText)`
  margin-bottom: 1rem;
`;

export const BenefitsContainer = styled.div`
  width: 100%;
  display: grid;
  padding: 0 1.2rem 0 0;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    margin-bottom: 2rem;
    padding:  0;
  }
`;
