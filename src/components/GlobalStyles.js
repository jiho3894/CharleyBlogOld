import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};

    body{
        width: 100%;
        height: 100vh;
        font-size: 20px;
        background-color: yellow;
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

export default GlobalStyles;