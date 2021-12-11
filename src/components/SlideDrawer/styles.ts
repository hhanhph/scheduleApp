import styled from 'styled-components'
export const SlideDrawerWrapper = styled.div<{isOpen:boolean}>`
height:100%;
width:50%;
position:fixed;
top:0;
left:0;
background: white;
z-index: 10;
   box-shadow: 1px 0px 7px rgba(0,0,0,0.5); 
   transform:  ${({ isOpen}) =>
  isOpen ? `translateX(0%)`:`translateX(-100%)`};
   transition: transform 0.3s ease-out;
   padding: 2rem 1rem;
   display:flex;
   flex-direction: column;
   align-items: stretch;
justify-content: flex-start;

button{
    margin: 0.5rem 0
}
   `
