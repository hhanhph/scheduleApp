import styled from 'styled-components'

export const SubscribeWrapper = styled.div`
padding-right:2rem;
position: fixed;
bottom: 1.5rem;
`

export const SubscribeBtn = styled.button`
background: none;
border: none;
width: 4rem;
height: 3rem;

svg{
    display: inline-block;
  border-radius: 50%;
  border: 2px red solid;
  padding: 5px 10px;
}

&:hover{
    cursor: pointer;
}
`