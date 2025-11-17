import styled from 'styled-components';
 
 export const ClickButton = styled.div`
     background: powderblue;
     padding:10px;
     margin-left: auto;
     margin-right:auto;
     cursor: pointer;
     width:90px;
     text-align:center;    
 `
 
 const PopupCard = styled.div`
     width: 300px;
     position: absolute;
     left: 50%
     top: 50%
     margin-left: -150px;
     background-color: white;
     padding: 40px;
     transform: translateY(-50%);
 `
 
 const Overlay = styled.div`
     position: fixed;
     top:0;
     left: 0;
     z-index: 999;
     widht: 100vw;
     height: 100vh;
     background-color: black;
     background-color: rgba(0, 0, 0, 0.75)
 `
 
 type Popup = {
     togglePopup: (event: React.MouseEvent<HTMLElement>) => void;
 }
 
 export const Popup = ({togglePopup} : Popup) => (
     <Overlay>
         <PopupCard>
             <ClickButton onClick={togglePopup}>Close</ClickButton>
         </PopupCard>
     </Overlay>
 )